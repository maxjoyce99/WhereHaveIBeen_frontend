import { LocationsContext } from '../context/LocationContext'
import { useContext } from 'react'

export const useLocationsContext = () => {
    const context = useContext(LocationsContext);

    if(!context){
        throw Error('useLocationsContext must be used inside a LocationsContextProvider');
    }

    return context;
}