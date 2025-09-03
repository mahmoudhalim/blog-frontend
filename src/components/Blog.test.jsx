import { beforeEach, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const likeHandler = vi.fn()
beforeEach(() => {
  const blog = {
    title: 'test title',
    author: 'author',
    url: 'example.com',
    likes: 7,
  }
  render(<Blog blog={blog} likeBlog={likeHandler} />)
  screen.debug()
})

test('blog component renders the blogs title and authort not likes and url by default.', () => {
  const element = screen.queryByText('test title')
  expect(element).toBeVisible()
  const author = screen.queryByText('author')
  expect(author).toBeVisible()
  const url = screen.queryByText('example.com')
  expect(url).not.toBeVisible()
  const likes = screen.queryByText('7')
  expect(likes).not.toBeVisible()
})

test('blog URL and number of likes are shown has been clicked', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const url = screen.queryByText('example.com')
  expect(url).toBeVisible()
  const likes = screen.queryByText('7')
  expect(likes).toBeVisible()
})

test('clicking like button twice will get the event handler called twice.', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeHandler.mock.calls).toHaveLength(2)
})
