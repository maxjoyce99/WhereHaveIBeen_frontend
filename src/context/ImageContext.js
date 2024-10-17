import { createContext, useReducer } from 'react'

export const ImageContext = createContext();

export const imageReducer = (state, action) => {
    switch (action.type){
        case 'SET_IMAGES' :
            return {
                imagePaths: action.payload
            }
        case 'CREATE_IMAGE':
            return {
                imagePaths: [action.payload,...state.imagePaths]
            }
        case 'DELETE_IMAGE':
            return {
                imagePaths: state.imagePaths.filter((path) => path !== action.payload)
            }
        default:
            return state
    }
}

export const ImageContextProvider = ({ children }) => {
    const [state, dispatchImage] = useReducer(imageReducer, {
        imagePaths: ["Default"]
    });

    return (
        <ImageContext.Provider value={{...state, dispatchImage}}>
            { children }
        </ImageContext.Provider>

    )
}