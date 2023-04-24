import React, { useContext } from 'react';
import Model from '../models';

export const mainContext = React.createContext<Model | null>(null);

export const useStore = () => {
    const context = useContext(mainContext);

    if (context === null) {
        throw new Error('error');
    }

    return context;
};
