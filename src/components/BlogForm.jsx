import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newblog = {
      title,
      author,
      url,
    }
    await createBlog(newblog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={handleNewBlog} method="POST">
        <div>
          title:
          <input
            type="text"
            name="Title"
            placeholder='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            placeholder='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            placeholder='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm
