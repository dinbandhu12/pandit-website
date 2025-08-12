import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react'
import { format } from 'date-fns'
import LoadingSpinner from '../components/LoadingSpinner'
import Navigation from '../components/Navigation'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/posts`)
      setPosts(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load blog posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const getUniqueTags = () => {
    const allTags = posts
      .map(post => post.tags)
      .filter(tags => tags)
      .flatMap(tags => tags.split(',').map(tag => tag.trim()))
    
    return [...new Set(allTags)].filter(tag => tag)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.subtitle && post.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTag = !selectedTag || 
                      (post.tags && post.tags.toLowerCase().includes(selectedTag.toLowerCase()))
    
    return matchesSearch && matchesTag
  })

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return 'Unknown date'
    }
  }

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const renderTags = (tags) => {
    if (!tags) return null
    
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    return (
      <div className="flex flex-wrap gap-2">
        {tagList.slice(0, 3).map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gradient-to-r from-saffron/20 to-sacred-red/20 text-saffron rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
        {tagList.length > 3 && (
          <span className="text-gray-500 text-xs">+{tagList.length - 3} more</span>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <LoadingSpinner />
      </div>
    )
  }

  const uniqueTags = getUniqueTags()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-saffron/5 to-sacred-red/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-saffron to-sacred-red bg-clip-text text-transparent">
                Our Blog
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover insights, stories, and knowledge about Vedic ceremonies, traditions, and spiritual practices
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
                >
                  <option value="">All Tags</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <button 
                onClick={fetchPosts}
                className="px-4 py-2 bg-gradient-to-r from-saffron to-sacred-red text-white rounded-lg hover:opacity-90"
              >
                Try Again
              </button>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                {posts.length === 0 ? 'No blog posts yet.' : 'No posts match your search criteria.'}
              </div>
              {searchTerm || selectedTag ? (
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTag('')
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-gray-600 text-sm mb-3">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <div className="text-gray-600 text-sm leading-relaxed mb-4">
                      {truncateText(post.content.replace(/<[^>]*>/g, ''), 120)}
                    </div>
                    
                    {renderTags(post.tags)}
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link 
                        to={`/post/${post.id}`}
                        className="inline-flex items-center text-saffron hover:text-sacred-red font-semibold transition-colors"
                      >
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (searchTerm || selectedTag) && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('')
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog



