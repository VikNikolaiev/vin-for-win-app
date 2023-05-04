import React from 'react';
import Image from 'next/image';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import logo from '../../assets/logo.svg';
import styles from './Header.module.less';

const Header = () => (
    <header className={`${styles.header}`}>
        <section className="grid-landing">
            <div className="g-start-4 g-start-xs-2">
                <LocaleSwitcher />
            </div>
            <div className={`${styles.image} g-col-4 g-start-5 g-start-xs-3`}>
                <Image width="200" height="45" src={logo} alt="logo" />
            </div>
        </section>
    </header>
);

export default Header;
