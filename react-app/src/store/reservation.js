const GET_RESERVATIONS = '/get/reservations'
const CREATE_RESERVATION = '/post/reservations'
const DELETE_RESERVATION = 'delete/reservation'

const getReservations = (reservations) => ({
    type: GET_RESERVATIONS,
    reservations
})

const createReservation = (reservation) => ({
    type: CREATE_RESERVATION,
    reservation
})

const deleteReservation = (reservation) => ({
    type: DELETE_RESERVATION,
    reservation
})

export const GetReservationThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/reservations/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getReservations(data.reservations))
        return data
    }
}

export const CreateReservationThunk = (reservation) => async (dispatch) => {
    const res = await fetch(`/api/reservations/new/reservation`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reservation)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(createReservation(data))
        return data
    }
}

export const DeleteReservationThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/reservations/${id}/delete`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteReservation(data))
        return data
    }
}

let initialState = {}
const reservationReducer = (state = initialState, action) => {
    let newState = {...state }
    switch (action.type) {
        case GET_RESERVATIONS:
            action.reservations.forEach(reservation => newState[reservation.id] = reservation)
            return newState;

        case CREATE_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            return newState;

        case DELETE_RESERVATION:
            delete newState[action.reservation.id];
            return newState

        default:
            return state
    }
}

export default reservationReducer
