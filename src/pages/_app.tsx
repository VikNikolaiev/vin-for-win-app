import React, { useMemo } from 'react';
import type { AppProps } from 'next/app';
import { mainContext } from '../context/mainContext';
import Model from '../models/index';
import '../styles/globals.less';

// const App = ({ Component, pageProps }: AppProps) => (
//     <mainContext.Provider value={new Model()}>
//         <Component {...pageProps} />
//     </mainContext.Provider>
// );

const App = ({ Component, pageProps }: AppProps) => {
    const MemoValue = useMemo(() => new Model(), [new Model()]);
    return (
        <mainContext.Provider value={MemoValue}>
            <Component {...pageProps} />
        </mainContext.Provider>
    );
};

export default App;
