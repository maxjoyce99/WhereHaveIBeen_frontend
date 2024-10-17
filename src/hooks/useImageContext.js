import { ImageContext } from "../context/ImageContext";
import { useContext } from "react";

export const useImageContext = () => {
    const context = useContext(ImageContext);

    if(!context){
        throw Error('useImageContext must be use inside a ImageContextProvider');
    }
    return context;
}