import { FC, useEffect, useState } from 'react';
import { useStore } from '@/context/mainContext';
import CheckCircleSmIcon from '@avtopro/icons/dist/jsx/CheckCircleSmIcon';
import { observer } from 'mobx-react-lite';
import styles from './ListIdentifires.module.less';
const ListIdentifiers: FC = () => {
    const { photoIndentifier } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div
            className={`${styles.identifiers} g-col-6 g-start-4 g-col-lg-6 g-start-lg-4 g-col-md-8 g-start-md-3 g-col-sm-10 g-start-sm-2 g-col-xs-10 g-start-xs-1`}
        >
            <ul className={styles.list}>
                {mounted && photoIndentifier.photoIndentifierData?.vinCodes.map(
                    (item, index) => {
                        return (
                            <li
                                key={index}
                                className={`${styles['list-item']} ${
                                    item ===
                                    photoIndentifier.selectedIndentifier
                                        ? styles['list-item--active']
                                        : ''
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        photoIndentifier.selectIndentifier(item)
                                    }
                                >
                                    <CheckCircleSmIcon
                                        className={
                                            item !==
                                            photoIndentifier.selectedIndentifier
                                                ? styles['item-icon-inactive']
                                                : ''
                                        }
                                    />
                                    {item}
                                </button>
                            </li>
                        );
                    }
                )}
            </ul>
            <ul className={styles.list}>
                {mounted && photoIndentifier.photoIndentifierData?.carNumbers?.map(
                    (item, index) => {
                        return (
                            <li
                                key={index}
                                className={`${styles['list-item']} ${
                                    item ===
                                    photoIndentifier.selectedIndentifier
                                        ? styles['list-item--active']
                                        : ''
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        photoIndentifier.selectIndentifier(item)
                                    }
                                >
                                    <CheckCircleSmIcon
                                        className={
                                            item !==
                                            photoIndentifier.selectedIndentifier
                                                ? styles['item-icon-inactive']
                                                : ''
                                        }
                                    />
                                    {item}
                                </button>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};

export default observer(ListIdentifiers);
