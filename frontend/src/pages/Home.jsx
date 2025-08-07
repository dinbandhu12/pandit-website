import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/posts')
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

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchPosts}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  const uniqueTags = getUniqueTags()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Posts</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our blog. Discover insights, tutorials, and stories from our community.
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="input"
            >
              <option value="">All Tags</option>
              {uniqueTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

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
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
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
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Home 