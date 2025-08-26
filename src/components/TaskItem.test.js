import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/tasks/taskSlice'
import authReducer from '../features/auth/authSlice' // Assuming you have this
import TaskItem from './TaskItem'
import axios from 'axios'

// Mock axios
jest.mock('axios')

describe('TaskItem integration', () => {
    const task = {
        _id: 'abc123',
        text: 'Learn Redux',
        createdAt: new Date().toISOString()
    }

    const user = {
        token: 'mocked-token'
    }

    it('dispatches deleteTask thunk and receives fulfilled action', async () => {
        // Mock successful DELETE request
        axios.delete.mockResolvedValue({ data: { id: 'abc123' } })

        const store = configureStore({
            reducer: {
                tasks: taskReducer,
                auth: (state = { user }, action) => state, // mock auth slice
            },
            preloadedState: {
                tasks: {
                    tasks: [task],
                    isLoading: false,
                    isSuccess: false,
                    isError: false,
                    message: ''
                },
                auth: { user }
            }
        })

        render(
            <Provider store={store}>
                <TaskItem task={task} />
            </Provider>
        )

        fireEvent.click(screen.getByRole('button', { name: /x/i }))

        await waitFor(() => {
            const newState = store.getState()
            expect(newState.tasks.tasks).toEqual([]) // Task should be removed
        })
    })
})
