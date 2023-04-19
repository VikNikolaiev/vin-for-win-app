import { PropsWithChildren, FC } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
