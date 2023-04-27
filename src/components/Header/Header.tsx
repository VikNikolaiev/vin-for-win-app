import React, { FC } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import styles from './Header.module.less';

const Header: FC = () => (
    <header className={`${styles.header} g-col-12`}>
        <Image src={logo} alt="logo" priority />
    </header>
);

export default Header;
