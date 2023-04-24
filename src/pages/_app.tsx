import React from 'react';
import '../styles/globals.less';
import type { AppProps } from 'next/app';
import { mainContext } from '../context/mainContext';
import Model from '../models/index';

const App = ({ Component, pageProps }: AppProps) => (
    <mainContext.Provider value={new Model()}>
        <Component {...pageProps} />
    </mainContext.Provider>
);

export default App;
