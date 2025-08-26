import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import taskService from './taskService'

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

describe('taskService', () => {
    afterEach(() => {
        mock.reset();
    })
    test('fetches tasks successfully', async () => {
        const mockToken = 'mock_token'
        const mockTasks = [
            {
                _id: '649e4e271947362dc297436a',
                text: 'Learn Tailwind',
                user: '649023b41935f5557f8e7ca4',
                createdAt: '2023-06-30T03:38:15.287Z',
                updatedAt: '2023-06-30T03:38:15.287Z',
                __v: 0
            }

        ]

        mock.onGet('/api/tasks/').reply((config) => {
            // 1. Verify the token exists
            if (!config.headers?.Authorization) {
                return [401, { message: 'Missing token' }];
            }
            // 2. Verify the token value
            const token = config.headers.Authorization.replace('Bearer ', '');
            if (token !== mockToken) {
                return [403, { message: 'Invalid token' }];
            }
            // 3. Only return success if token is valid
            return [200, mockTasks];
        });


        const response = await taskService.getTasks(mockToken);
        expect(response).toEqual(mockTasks)


    })
    //test('create tasks successfully', async () => {
    //    const mockToken = 'mock_token'
    //    const mockTasks = [
    //        {
    //            _id: '649e4e271947362dc297436a',
    //            text: 'Learn Tailwind',
    //            user: '649023b41935f5557f8e7ca4',
    //            createdAt: '2023-06-30T03:38:15.287Z',
    //            updatedAt: '2023-06-30T03:38:15.287Z',
    //            __v: 0
    //        }

    //    ]

    //    mock.onPost('/api/tasks/').reply((config) => {
    //        if (!config.headers?.Authorization) {
    //            return [401, { message: 'Missing token' }];
    //        }
    //        if (!mockTasks) {
    //            return [401, { message: 'Missing tasks' }];
    //        }
    //        const token = config.headers.Authorization.replace('Bearer ', '');
    //        if (token !== mockToken) {
    //            return [403, { message: 'Invalid token' }];
    //        }
    //        return [200, mockTasks]
    //    })

    //    const response = await taskService.createTask(mockToken);
    //    expect(response).toEqual(mockTasks)


    //})
})
