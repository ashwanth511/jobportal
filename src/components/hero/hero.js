
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react'
import HeroForm from './heroForm'

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
            <span className="text-xl font-bold">Job Portal in usa</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="#" className="hover:text-teal-500">Home Allow </Link>
            <Link href="#" className="hover:text-teal-500">Worker</Link>
            <Link href="#" className="hover:text-teal-500">About Us</Link>
            <Link href="#" className="hover:text-teal-500">Contact Us</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-teal-500">Login</Link>
            <Link href="#" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job Today!</h1>
          <p className="mb-8">Connecting Talent with Opportunity: Your Gateway to Career Success</p>
          <div className="max-w-3xl mx-auto flex">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-grow px-4 py-3 rounded-l-md text-gray-900"
            />
            <button className="bg-teal-500 text-white px-6 py-3 rounded-r-md hover:bg-teal-600">
              Search Jobs
            </button>
          </div>
          <div className="flex justify-center items-center space-x-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">25,000</div>
              <div className="text-sm">Live Job</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15,000</div>
              <div className="text-sm">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">8,000</div>
              <div className="text-sm">New Jobs</div>
            </div>
          </div>
        </div>
      </section>
<HeroForm/>
      {/* Company Logos */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8">
            {['Spotify', 'Slack', 'Adobe', 'Asana', 'Linear'].map((company) => (
              <div key={company} className="text-gray-500 font-semibold">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Jobs Available</h2>
          <div className="space-y-6">
            {[
              { title: 'Forward Security Director', company: 'Revel Systems', location: 'San Francisco', type: 'Full Time', salary: '$80k - $120k' },
              { title: 'Regional Creative Facilitator', company: 'Revel Systems', location: 'New York', type: 'Part Time', salary: '$60k - $90k' },
              { title: 'Internal Integration Planner', company: 'Revel Systems', location: 'Chicago', type: 'Contract', salary: '$70k - $100k' },
              { title: 'District Intranet Director', company: 'Revel Systems', location: 'Los Angeles', type: 'Remote', salary: '$90k - $130k' },
              { title: 'Corporate Tactics Facilitator', company: 'Revel Systems', location: 'Seattle', type: 'Full Time', salary: '$75k - $110k' },
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="#" className="text-teal-500 font-semibold hover:underline">
              View all jobs <ChevronRight className="inline w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Agriculture', jobs: '120 Jobs' },
              { name: 'Metal Production', jobs: '230 Jobs' },
              { name: 'Commerce', jobs: '350 Jobs' },
              { name: 'Construction', jobs: '80 Jobs' },
              { name: 'Hotels & Tourism', jobs: '150 Jobs' },
              { name: 'Education', jobs: '90 Jobs' },
              { name: 'Financial Services', jobs: '280 Jobs' },
              { name: 'Transport', jobs: '110 Jobs' },
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.jobs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Life Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Team working together"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">Good Life Begins With A Good Company</h2>
              <p className="text-gray-600 mb-6">
                Discover opportunities that align with your passions and values. Our platform connects you with companies that prioritize employee well-being and professional growth.
              </p>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600">
                Search Jobs
              </button>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">120k+</div>
                  <div className="text-sm text-gray-500">Clients worldwide</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">20k+</div>
                  <div className="text-sm text-gray-500">Active resumes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">15k+</div>
                  <div className="text-sm text-gray-500">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create A Better Future Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Create A Better Future For Yourself</h2>
              <p className="mb-6">
                Take control of your career path and unlock new opportunities. Our platform empowers you to showcase your skills and connect with employers who value your potential.
              </p>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Diverse professionals"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials from Our Customers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Lee', role: 'Software Engineer', content: 'Amazing services, found my dream job within weeks!' },
              { name: 'John Smith', role: 'Marketing Manager', content: 'Everything simple and straightforward. Highly recommended!' },
              { name: 'Emily Chen', role: 'UX Designer', content: 'Awesome, thank you for making job hunting so easy!' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News and Blog */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">News and Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Revolutionizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement in 2024', image: '/placeholder.svg?height=200&width=400', tag: 'Career' },
              { title: 'How To Avoid The Top Six Most Common Job Interview Mistakes', image: '/placeholder.svg?height=200&width=400', tag: 'Tips' },
            ].map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-teal-500 text-sm font-semibold mb-2">{post.tag}</div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <Link href="#" className="text-teal-500 hover:underline">
                    Read More <ChevronRight className="inline w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                <span className="text-xl font-bold">Job Portal</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity. Your gateway to career success.
              </p>
            </div>
            <div>
              <h3 className="text-lg  font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Our Services</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Affiliate Program</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Technology</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Finance</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Healthcare</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Education</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest job updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-900"
                />
                <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Job Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}