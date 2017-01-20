import * as actions from './actions'

describe('actions', () => {
    it('should create an action to add new event', () => {
        const text = 'New event'
        const expected = {
            type: actions.ADD_EVENT,
            title: text
        }
        expect(actions.addEvent(text)).toEqual(expected)
    })

    it('should create an action to mark all as read', () => {
        const expected = {
            type: actions.MARK_ALL_READ
        }
        expect(actions.markAllRead()).toEqual(expected)
    })

    it('should create an action to clear all events', () => {
        const expected = {
            type: actions.CLEAR_ALL
        }
        expect(actions.clearAll()).toEqual(expected)
    })
})