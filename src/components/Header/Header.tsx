import React, { FC } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import styles from '@/components/Header/Header.module.less';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

const Header: FC = () => (
    <header className={`${styles.header} g-col-12`}>
        <Image src={logo} alt="logo" priority />
        <LocaleSwitcher />
    </header>
);

export default Header;
