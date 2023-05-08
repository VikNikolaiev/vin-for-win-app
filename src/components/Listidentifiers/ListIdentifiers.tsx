import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context/mainContext';
import CheckCircleSmIcon from '@avtopro/icons/dist/jsx/CheckCircleSmIcon';
import styles from './ListIdentifires.module.less';
const ListIdentifiers: FC = () => {
    const { photoIndentifier } = useStore();
    return (
        <div
            className={`${styles.identifiers} g-col-6 g-start-4 g-col-xs-8 g-start-xs-2`}
        >
            <ul className={styles.list}>
                {photoIndentifier.photoIndentifierData?.vinCodes.map(
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
                {photoIndentifier.photoIndentifierData?.vinCodes?.map(
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
