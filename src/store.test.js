import {addEvent, clearAll, markAllRead} from './actions'
import { eventsReducer } from './store'

describe('reducer', () => {

    it('should process add event action', () => {
        const state = []
        const text = 'New event'
        const newState = eventsReducer(state, addEvent(text))
        expect(newState).not.toBe(state)
        expect(newState).toHaveLength(1)

        const newEvent = newState[0]
        expect(newEvent.id).toBeDefined()
        expect(newEvent.unread).toBeTruthy()
        expect(newEvent.title).toEqual(text)
        expect(newEvent.datetime).toBeDefined()
    })

    it('should process mark all as read action', () => {
        const state = [
            {id: 3, unread: true, title: 'New event 3'},
            {id: 2, unread: true, title: 'New event 2'},
            {id: 1, unread: false, title: 'New event 1'}
        ]
        const newState = eventsReducer(state, markAllRead())
        expect(newState).not.toBe(state)
        expect(newState.map((e) => e.unread)).toEqual([false, false, false])
    })

    it('should process clear all action', () => {
        const state = [
            {id: 3, unread: true, title: 'New event 3'},
            {id: 2, unread: true, title: 'New event 2'},
            {id: 1, unread: false, title: 'New event 1'}
        ]
        const newState = eventsReducer(state, clearAll())
        expect(newState).not.toBe(state)
        expect(newState).toEqual([])
    })

    it('should return same state for unknown actions', () => {
        const state = [{id: 1, unread: false, title: 'New event 1'}]
        const newState = eventsReducer(state, {type: 'unknown action'})
        expect(newState).toBe(state)
        expect(newState).toEqual([{id: 1, unread: false, title: 'New event 1'}])
    })
})