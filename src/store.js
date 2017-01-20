import { createStore } from 'redux';
import { ADD_EVENT, MARK_ALL_READ, CLEAR_ALL } from './actions';

const initialEvents = [
  {
    id: 17,
    title: 'Test test test 17',
    unread: true,
    datetime: new Date(),
  },
  {
    id: 16,
    title: 'Test test test 16',
    unread: true,
    datetime: new Date().setHours((new Date()).getHours() - 2),
  },
  {
    id: 14,
    title: 'Test test test 14',
    unread: true,
    datetime: new Date().setDate((new Date()).getDate() - 1),
  },
  {
    id: 13,
    title: 'Test test test 13',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 3),
  },
  {
    id: 12,
    title: 'Test test test 12',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 8),
  },
  {
    id: 11,
    title: 'Test test test 11',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 31),
  },
  {
    id: 10,
    title: 'Test test test 10',
    unread: false,
    datetime: new Date().setDate((new Date()).getDate() - 160),
  }
]

let nextId = 18

export function eventsReducer(events = initialEvents, action) {
  switch(action.type) {
    case ADD_EVENT:
      return [
        {
          id: nextId++,
          title: action.title,
          unread: true,
          datetime: new Date()
        },
        ...events
      ]
    case MARK_ALL_READ:
      return events.map(event => Object.assign({}, event, {unread: false}))
    case CLEAR_ALL:
      return [];
    default:
      return events;
  }
}

export const store = createStore(eventsReducer)