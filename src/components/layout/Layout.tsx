import React, { PropsWithChildren, FC } from 'react';
import { Roboto } from 'next/font/google';
// import Header from '../Header/Header';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900']
});

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <div className={`${roboto.className}`}>
        <Header />
        <div className="container grid-landing">{children}</div>
        <Footer />
    </div>
);

export default Layout;
