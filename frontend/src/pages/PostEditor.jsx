import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'

const PostEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  
  const [post, setPost] = useState({
    title: '',
    subtitle: '',
    content: '',
    tags: '',
    links: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)
  const [error, setError] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (isEditing) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      setFetching(true)
      const response = await axios.get(`/api/posts/${id}`)
      setPost(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching post:', err)
      setError('Failed to load post. Please try again.')
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (field, value) => {
    setPost(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!post.title.trim() || !post.content.trim()) {
      setError('Title and content are required.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (isEditing) {
        await axios.put(`/api/posts/${id}`, post)
      } else {
        await axios.post('/api/posts', post)
      }

      navigate('/blog-posts-admin')
    } catch (err) {
      console.error('Error saving post:', err)
      setError('Failed to save post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  }

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'blockquote', 'code-block'
  ]

  if (fetching) {
    return <LoadingSpinner />
  }

  if (error && isEditing) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <Link to="/blog-posts-admin" className="btn btn-primary">
          Back to Admin Panel
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link 
            to="/blog-posts-admin" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary flex items-center space-x-2"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {showPreview ? (
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title || 'Untitled'}</h1>
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{post.subtitle}</p>
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>No content yet...</p>' }}
          />
          {post.tags && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={post.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                  className="input"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle (Optional)
                </label>
                <input
                  type="text"
                  id="subtitle"
                  value={post.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="input"
                  placeholder="Enter subtitle"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                id="tags"
                value={post.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="input"
                placeholder="Enter tags separated by commas (e.g., technology, programming, web)"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">
                Links (Optional)
              </label>
              <input
                type="text"
                id="links"
                value={post.links}
                onChange={(e) => handleChange('links', e.target.value)}
                className="input"
                placeholder="Enter links separated by commas"
              />
            </div>
          </div>

          <div className="card p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <ReactQuill
              value={post.content}
              onChange={(value) => handleChange('content', value)}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write your blog post content here..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/blog-posts-admin" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PostEditor 