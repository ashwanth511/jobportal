'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import JobList from '@/components/jobList/jobList'
import EditJobModal from '@/components/jobModal/jobModal'
import { FaPlus, FaChartBar, FaUser, FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function ClientDashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingJob, setEditingJob] = useState(null)
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, completedJobs: 0 })
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchClientData()
    }
  }, [user, router])

  const fetchClientData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          applicants:job_applications(
            id,
            status,
            worker:profiles(id, name)
          )
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data)
      updateStats(data)
    } catch (error) {
      console.error('Error fetching client data:', error)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const updateStats = (jobsData) => {
    const totalJobs = jobsData.length
    const activeJobs = jobsData.filter(job => job.status === 'in-progress').length
    const completedJobs = jobsData.filter(job => job.status === 'completed').length
    setStats({ totalJobs, activeJobs, completedJobs })
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
  }

  const handleUpdateJob = async (updatedJob) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: updatedJob.title,
          description: updatedJob.description,
          budget: updatedJob.budget
        })
        .eq('id', updatedJob.id)

      if (error) throw error

      setJobs(jobs.map(job => job.id === updatedJob.id ? { ...job, ...updatedJob } : job))
      setEditingJob(null)
      fetchClientData() // Refresh data to update stats
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)

      if (error) throw error

      setJobs(jobs.filter(job => job.id !== jobId))
      fetchClientData() // Refresh data to update stats
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  const handleAcceptWorker = async (jobId, workerId) => {
    try {
      await supabase
        .from('jobs')
        .update({ status: 'in-progress' })
        .eq('id', jobId)

      await supabase
        .from('job_applications')
        .update({ status: 'accepted' })
        .eq('job_id', jobId)
        .eq('worker_id', workerId)

      fetchClientData() // Refresh data to update job statuses and stats
    } catch (error) {
      console.error('Error accepting worker:', error)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
            <p className="text-gray-600">Manage your projects and workers</p>
          </div>
          <Link 
            href="/new-job"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <FaPlus className="mr-2" /> New Job
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FaChartBar className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Total Jobs</h2>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FaUser className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Active Jobs</h2>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.activeJobs}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FaCheckCircle className="text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Completed Jobs</h2>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.completedJobs}</p>
          </div>
        </div>

        <JobList 
          jobs={jobs} 
          onEditJob={handleEditJob} 
          onDeleteJob={handleDeleteJob}
          onAcceptWorker={handleAcceptWorker}
        />
        {editingJob && (
          <EditJobModal 
            job={editingJob} 
            onClose={() => setEditingJob(null)} 
            onUpdate={handleUpdateJob} 
          />
        )}
      </div>
    </div>
  )
}