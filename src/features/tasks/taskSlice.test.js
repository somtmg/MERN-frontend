import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getTasks } from './taskSlice';
import taskService from './taskService';

const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);

describe('taskSlice', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            task: {
                tasks: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message: '',
            },
            auth: {
                user: { token: 'mock_token' },
            },
        });
    });
    afterEach(() => {
        mock.reset();
        store.clearActions();
    });
    test('calls the taskService to fetch tasks', async () => {
        // test data setup
        const token = 'mock_token';
        const mockTasks = [
            {
                _id: '649e4e271947362dc297436a',
                text: 'Learn Tailwind',
                user: '649023b41935f5557f8e7ca4',
                createdAt: '2023-06-30T03:38:15.287Z',
                updatedAt: '2023-06-30T03:38:15.287Z',
                __v: 0
            }
        ];

        // Mock Service Response
        const getTasksSpy = jest.spyOn(taskService, 'getTasks').mockResolvedValue(mockTasks);

        // Action Dispatch
        await store.dispatch(getTasks());

        // Confirm getTasks was called with the auth token
        expect(getTasksSpy).toHaveBeenCalledWith(token);

        // Verify Redux action sequence
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getTasks.pending.type);
        expect(actions[1].type).toEqual(getTasks.fulfilled.type);
        expect(actions[1].payload).toEqual(mockTasks); // Verify payload
    });
});
/* Why This Test Matters
Verifies your thunk:

Correctly integrates with the service layer

Dispatches proper Redux actions

Handles async operations properly

Catches common issues:

Incorrect API calls

Wrong action sequences

Improper payload handling

Potential Improvements
Add error case testing

Verify state changes (if testing the full slice)

Test for loading state transitions

Verify token usage in API headers */