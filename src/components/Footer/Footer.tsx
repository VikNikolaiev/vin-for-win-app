import React, { FC } from 'react';
import Image from 'next/image';
import gear from '@/assets/gear.svg';
import gearSm from '@/assets/gear_sm.svg';
import styles from '@/components/Footer/Footer.module.less';

const Footer: FC = () => (
    <footer className="g-col-12">
        <div className={styles.footer__shadow}>
            <Image src={gear} className={styles.footer__gear} alt="" />
            <Image src={gearSm} className={styles.footer__gear_sm} alt="" />
        </div>
        <div className={styles.footer__info}>
            <span>
                © 2023 Avtopro
                <br />
                Запчасти без посредников
            </span>
        </div>
    </footer>
);

export default Footer;
