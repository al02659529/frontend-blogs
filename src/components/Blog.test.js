import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog =  {
    'title': 'Modern HTML Explained For Dinosaurs',
    'author': 'Peter Jang',
    'url': 'https://medium.com/actualize-network/modern-html-explained-for-dinosaurs-65e56af2981',
    'likes': 500,
    'user': '5f2cb9403bdbab46eccfb383',
    'id': '5f2cb9403bdbab46eccfb384'
  }

  beforeEach( () => {
    component = render(<Blog blog={blog}/>)
  })

  test('renders the blogs title and author', () => {
    const title = component.container.querySelector('.MuiCardHeader-title')
    expect(title).toHaveTextContent(blog.title)
  })

  test('checks that blog\'s number of likes are shown when the button controlling the shown details has been clicked.', () => {
    const shoreMoreButton = component.container.querySelector('.makeStyles-expandIconContainer-9')

    fireEvent.click(shoreMoreButton)

    const toggableContent = component.container.querySelector('.toggableContent')
    expect(toggableContent).toBeDefined()

    const likes = component.container.querySelector('.toggableContent > p > input')
    expect(likes).toHaveValue(blog.likes.toString())
  })

  test('ensures that if the submit like button is clicked, the event handler the component received as props is called.', () => {
    const updateBlogs = jest.fn()
    const component  = render(<Blog blog={blog} updateBlogs={updateBlogs}/>)
    const shoreMoreButton = component.container.querySelector('.makeStyles-expandIconContainer-9')
    fireEvent.click(shoreMoreButton)

    const likes = component.container.querySelector('.toggableContent > p > input')
    fireEvent.change(likes, {
      target: { value: 400 }
    })
    console.log(prettyDOM(likes))
    const submitButton = component.getByText('change')
    fireEvent.click(submitButton)
    expect(updateBlogs.mock.calls).toHaveLength(1)
  })
})







