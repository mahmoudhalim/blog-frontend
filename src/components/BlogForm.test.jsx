import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test } from 'vitest'

const createBlog = vi.fn()

test('blog form calls the event handler with the right details', async () => {
  render(<BlogForm createBlog={createBlog} />)
  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const button = screen.getByText('create')
  await userEvent.type(title, 'title')
  await userEvent.type(author, 'author')
  await userEvent.type(url, 'url')
  await userEvent.click(button)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'title',
    author: 'author',
    url: 'url',
  })
})