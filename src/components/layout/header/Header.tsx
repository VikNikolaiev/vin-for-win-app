import { FC } from "react";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import Button from "@avtopro/button";
import styles from "./Header.module.css";

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image src={logo} alt="logo" priority />
            </Link>
        </header>
    );
};

export default Header;
