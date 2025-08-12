import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

const BlogCard = ({ post }) => {
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
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Tag className="h-4 w-4" />
        <div className="flex flex-wrap gap-1">
          {tagList.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {tagList.length > 3 && (
            <span className="text-gray-500 text-xs">+{tagList.length - 3} more</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="text-gray-600 text-sm mb-3">
              {post.subtitle}
            </p>
          )}
        </div>
        
        <div className="text-gray-600 text-sm leading-relaxed">
          {truncateText(post.content.replace(/<[^>]*>/g, ''), 120)}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {renderTags(post.tags)}
          </div>
          
          <Link 
            to={`/post/${post.id}`}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
          >
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard 