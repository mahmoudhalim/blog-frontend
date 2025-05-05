import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({
    message: '',
  })
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const changeNotificationMessage = (notification) => {
    setNotificationMessage(notification)
    setTimeout(() => setNotificationMessage({message:""}), 5000)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      changeNotificationMessage({
        message: `Welcome ${user.name}!`,
        isError: true,
      })
    } catch (exception) {
      changeNotificationMessage({
        message: 'wrong name or password',
        isError: false,
      })
      console.log('Wrong credentials')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newblog = {
      title,
      author,
      url,
    }
    try {
      const response = await blogService.create(newblog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(response))
      changeNotificationMessage({
        message: `a new blog has been added!`,
        isError: false,
      })
    } catch (e) {
      
      changeNotificationMessage({
        message: e.response.data.error,
        isError: true,
      })
      console.log(e.response.data)
    }
  }
  if (user === null)
    return (
      <div>
        <Notification
          message={notificationMessage.message}
          isError={notificationMessage.isError}
        />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  else
    return (
      <div>
        <Notification
          message={notificationMessage.message}
          isError={notificationMessage.isError}
        />
        <h2>blogs</h2>
        {user.name} is logged in
        <button onClick={() => handleLogout()}>Logout</button>
        <Togglable buttonLabel="add new blog">
          <h2>add new blog</h2>
          <form onSubmit={handleNewBlog} method="POST">
            <div>
              title:
              <input
                type="text"
                name="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                name="Author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
}
export default App
