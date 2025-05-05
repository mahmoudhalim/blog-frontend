import { useState } from 'react'

const Blog = ({ blog }) => {
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
      </div>
    </div>
  )
}

export default Blog
