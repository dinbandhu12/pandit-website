import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Tag, ArrowLeft, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/posts/${id}`)
      setPost(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching post:', err)
      setError('Post not found or failed to load.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy')
    } catch {
      return 'Unknown date'
    }
  }

  const renderTags = (tags) => {
    if (!tags) return null
    
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    return (
      <div className="flex items-center space-x-2 mb-6">
        <Tag className="h-5 w-5 text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderLinks = (links) => {
    if (!links) return null
    
    const linkList = links.split(',').map(link => link.trim()).filter(link => link)
    
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Links</h3>
        <div className="space-y-2">
          {linkList.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">{link}</span>
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Post not found'}</div>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-4">
              {post.subtitle}
            </p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {post.updated_at !== post.created_at && (
              <span className="text-xs">(Updated {formatDate(post.updated_at)})</span>
            )}
          </div>
          
          {renderTags(post.tags)}
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {renderLinks(post.links)}
      </article>
    </div>
  )
}

export default BlogPost 