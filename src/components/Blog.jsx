import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 } 
    await blogService.likeBlog(newBlog) 
    setLikes(() => likes + 1)
  }

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
          {likes}
          <button type="button" onClick={handleLike}>like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
