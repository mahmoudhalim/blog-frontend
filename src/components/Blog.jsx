import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, removeBlog, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'show'}
      </button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button type="button" onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>
          <button type="button" onClick={() => removeBlog(blog.id)}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
