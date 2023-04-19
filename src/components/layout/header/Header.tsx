import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import styles from './Header.module.css';

const Header: FC = () => (
    <header className={styles.header}>
        <Link href="/">
            <Image src={logo} alt="logo" priority />
        </Link>
    </header>
);

export default Header;
