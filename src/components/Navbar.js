'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, User, Settings, LogOut, Briefcase, Users, Hammer, Bell, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

import LogoutButton from './logoutBtn'
import MessageNotifications from './notifications/messageNotifications'

export default function Navbar() {
  const { user, loading, userRole } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: 'Jobs', href: '/', icon: Briefcase },
    { name: 'Workers', href: '/', icon: Users },
  ]

  const handleDashboardRedirect = (e) => {
    e.preventDefault()
    if (userRole === 'client') {
      router.push('/dashboard/client')
    } else if (userRole === 'worker') {
      router.push('/dashboard/worker')
    }
    setIsOpen(false)
  }

  const renderNavItems = (isMobile = false) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-6'}`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center text-gray-300 hover:text-white transition-colors duration-200 ${
            isMobile ? 'py-2' : ''
          }`}
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      ))}
    </div>
  )

  const renderAuthItems = (isMobile = false) => {
    if (loading) {
      return <div className="animate-pulse bg-gray-700 h-10 w-24 rounded"></div>
    }

    if (!user) {
      return (
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <Link
            href="/register/worker"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )
    }

    const authItems = userRole
      ? [
          { name: 'Dashboard', icon: User, onClick: handleDashboardRedirect },
          { name: 'Settings', icon: Settings, onClick: () => { router.push('/settings'); setIsOpen(false) } },
          { name: 'Notifications', icon: Bell, onClick: () => { router.push('/notifications'); setIsOpen(false) } },
          { name: 'Messages', component: <MessageNotifications />, href: '/messages' },
          { name: 'Logout', component: <LogoutButton /> },
        ]
      : []

    return (
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4 items-center'}`}>
        {authItems.map((item, index) => (
          <div key={index} className="relative group">
            {item.component ? (
              item.name === 'Logout' ? (
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  <span className="ml-2 text-sm font-medium">{item.component}</span>
                </div>
              ) : (
                <Link
                  href={item.href || "/notifications"}
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.component}
                  <span className="ml-2 text-sm font-medium">{item.name}</span>
                </Link>
              )
            ) : (
              <button 
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-200" 
                onClick={item.onClick}
              >
                <item.icon className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">{item.name}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <nav className="bg-gray-900 fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Hammer className="h-8 w-8 text-indigo-500" />
              </Link>
              <div className="hidden md:block ml-10">
                {renderNavItems()}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200"
                >
                  <Search className="h-5 w-5" />
                </button>
                {renderAuthItems()}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 py-4"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-64 bg-gray-900 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-4 pt-16">
                <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors duration-200 mb-8 block">
                  Job Board
                </Link>
                <div className="flex-grow">
                  {renderNavItems(true)}
                </div>
                <div className="mt-auto">
                  {renderAuthItems(true)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}