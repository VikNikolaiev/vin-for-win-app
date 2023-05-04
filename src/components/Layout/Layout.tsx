import React, { PropsWithChildren, FC } from 'react';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900']
});

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <div className={`${roboto.className}`}>
        <Header />
        <div className="container">
            <div className="grid-landing">{children}</div>
        </div>
        <Footer />
    </div>
);

export default Layout;
