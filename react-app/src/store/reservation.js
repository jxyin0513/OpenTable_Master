const GET_RESERVATIONS = '/get/reservations'
const CREATE_RESERVATION = '/post/reservations'
const DELETE_RESERVATION = 'delete/reservation'

const getReservations = (reservation) => ({
    type: GET_RESERVATIONS,
    reservation
})

const createReservation = (reservation) => ({
    type: CREATE_RESERVATION,
    reservation
})

const deleteReservation = (reservation) => ({
    type: DELETE_RESERVATION,
    reservation
})

export const GetReservationThunk = (Id) => async (dispatch) => {
    const res = await fetch(`/api/reservations/${Id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getReservations(data.reservations))
        return data
    }
}

let initialState = {}
const reservationReducer = (state = initialState, action) => {
    let newState = {...state }
    switch (action.type) {
        case GET_RESERVATIONS:
            action.reservation.forEach(reservation => newState[reservation.id] = reservation)
            return newState;
        default:
            return state
    }
}

export default reservationReducer
