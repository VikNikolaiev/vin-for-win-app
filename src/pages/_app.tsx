import React, { useEffect, useMemo } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { mainContext } from '@/context/mainContext';

import '@/styles/globals.less';
import models from '@/models';

const App = ({ Component, pageProps }: AppProps) => {
    const MemoValue = useMemo(() => models, [models]);

    const router = useRouter();

    useEffect(() => {
        if (router.locale) {
            localStorage.setItem('lang', router.locale);
        }
    }, []);

    return (
        <mainContext.Provider value={MemoValue}>
            <Component {...pageProps} />
        </mainContext.Provider>
    );
};

export default appWithTranslation(App);
