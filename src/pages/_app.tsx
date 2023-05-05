import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { mainContext } from '@/context/mainContext';
import model from '@/models';
import '@/styles/globals.less';

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        if (router.locale) {
            localStorage.setItem('lang', router.locale);
        }
    }, []);

    return (
        <mainContext.Provider value={model}>
            <Component {...pageProps} />
        </mainContext.Provider>
    );
};

export default appWithTranslation(App);
