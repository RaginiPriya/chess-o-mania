const initialState = {
    socket : null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'WS': return {...state, ...action.payload}
        default: return state
    }
}

export default reducer