import React, { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => (
    <footer className={styles.footer}>
        <span>
            © 2023 Avtopro
            <br />
            Запчасти без посредников
        </span>
    </footer>
);

export default Footer;
