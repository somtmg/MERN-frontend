import { store } from './store'

describe('store configuration', () => {
    it('should have auth and tasks reducers', () => {
        const state = store.getState()
        expect(state).toHaveProperty('auth')
        expect(state).toHaveProperty('tasks')
    })
})
