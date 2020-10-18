import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import NewBlog from './NewBlog'


describe('<NewBlog />', () => {
    const updateBlogs = jest.fn()
    let component
    beforeEach(() => {
        component = render(
            <NewBlog updateBlogs={updateBlogs} />
        )
    })
    test('submitting a new blog calls the updateBlogs fn', () => {
        const newBlog = {
            'title': 'Modern HTML Explained For Dinosaurs',
            'author': 'Peter Jang',
            'url': 'https://medium.com/actualize-network/modern-html-explained-for-dinosaurs-65e56af2981',
            'likes': 500,
            'user': '5f2cb9403bdbab46eccfb383',
            'id': '5f2cb9403bdbab46eccfb384'
        }

        const title = component.container.querySelector('#title')
        fireEvent.change(title, {
            target: { value: newBlog.title }
        })
        const author = component.container.querySelector('#author')
        fireEvent.change(author, {
            target: { value: newBlog.author }
        })

        const likes = component.container.querySelector('#likes')
        fireEvent.change(likes, {
            target: { value: newBlog.likes }
        })

        const url = component.container.querySelector('#url')
        fireEvent.change(url, {
            target: { value: newBlog.url }
        })

        const submitButton = component.getByText('Submit')
        fireEvent.click(submitButton)

        expect(updateBlogs.mock.calls).toHaveLength(1)




    })
})