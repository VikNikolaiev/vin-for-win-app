import React from 'react';
import { useStore } from '@/context/mainContext';
import Home from '@/pages/index';

const HOCWrapper = (Component: any) => {
    const HOC = (props: any) => {
        const {
            car: { engines }
        } = useStore();

        if (!engines.length) {
            return <Home />;
        }

        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        HOC.getInitialProps = Component.getInitialProps;
    }

    return HOC;
};

export default HOCWrapper;
