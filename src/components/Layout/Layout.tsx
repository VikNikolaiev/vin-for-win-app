import React, { PropsWithChildren, FC } from 'react';
import { Roboto } from 'next/font/google';
import Preloader from '@avtopro/preloader';
import { observer } from 'mobx-react-lite';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useStore } from '@/context/mainContext';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900']
});

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const { pending } = useStore();
    return (
        <div style={{ position: 'relative' }} className={`${roboto.className}`}>
            <Header />
            <div className="container">
                <div className="grid-landing">{children}</div>
            </div>
            {pending ? <Preloader fixed /> : null}
            <Footer />
        </div>
    );
};

export default observer(Layout);
