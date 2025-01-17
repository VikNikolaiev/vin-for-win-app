import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Image from 'next/image';
import logo from '../../assets/logo.svg';
import styles from './Header.module.less';

const Header = () => (
    <header className={`${styles.header}`}>
        <section className="container grid-landing">
            <div className="g-start-2 g-start-xs-1">
                <LocaleSwitcher />
            </div>
            <div
                className={`${styles.image} g-col-4 g-start-5 g-col-xs-2 g-start-xs-5`}
            >
                <Image width="200" height="45" src={logo} alt="logo" />
            </div>
        </section>
    </header>
);

export default Header;
