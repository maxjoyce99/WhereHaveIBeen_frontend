import { createContext, useReducer } from 'react'

export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
    switch (action.type){
        case 'SET_FRIENDS':
            return {
                friends: action.payload,
                pending: [...state.pending]
            }
        case 'ADD_FRIEND':
            return {
                friends: [action.payload,...state.friends],
                pending: [...state.pending]
            }
        case 'DELETE_FRIEND':
            return {
                friends: state.friends.filter((f) => f.id !== action.payload._id),
                pending: [...state.pending]
            }
        case 'SET_PENDING' :
            return {
                pending: action.payload,
                friends: [...state.friends]
            }
        case 'DELETE_PENDING' :
            return {
                pending: state.pending.filter((p) => p.id !== action.payload._id),
                friends: [...state.friends]
            }
        default:
            return state
    }
}

export const FriendsContextProvider = ({children}) => {
    const [state,dispatchFriend] = useReducer(friendsReducer, {
        friends: [],
        pending: []
    });

    return (
        <FriendsContext.Provider value={{...state,dispatchFriend}}>
            { children }
        </FriendsContext.Provider>

    )
}