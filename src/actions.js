export const ADD_EVENT = 'ADD_EVENT'
export const MARK_ALL_READ = 'MARK_ALL_READ'
export const CLEAR_ALL = 'CLEAR_ALL'

export function addEvent(title) {
	return {
		type: ADD_EVENT,
		title: title
	}
}

export function markAllRead() {
	return {
		type: MARK_ALL_READ
	}
}

export function clearAll() {
	return {
		type: CLEAR_ALL
	}
}