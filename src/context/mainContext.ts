import { Model } from '@/models';
import React, { useContext } from 'react';

export const mainContext = React.createContext<Model | null>(null);

export const useStore = () => {
    const context = useContext(mainContext);

    if (context === null) {
        throw new Error('error');
    }

    return context;
};
