import React from 'react';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useStore } from '../../context/mainContext';
import styles from './Parts.module.less';

const Parts = () => {
    const { car, setStep } = useStore();
    const partsList = car.parts;

    return (
        <div className="g-col-6 g-start-4">
            <div className={styles.car__card}>
                <div className={styles.card__wrapper}>
                    <div className={styles.car__photo}>ФОТО</div>
                    <div style={{ margin: 'auto 0' }}>
                        <span className={styles.car__name}>
                            {car.name} {car.engines[0].name}
                        </span>
                        <span className={styles.car__vin}>
                            VIN: {car.vinCode}
                        </span>
                    </div>
                </div>
                <Button
                    theme="link"
                    onClick={() => {
                        setStep('search');
                    }}
                >
                    Изменить
                </Button>
            </div>
            <div className={styles.part__card}>
                {partsList.map((item) => (
                    <div className={styles.part} key={item.id}>
                        <div>
                            <p>{item.code}</p>
                            <p>{item.brandName}</p>
                        </div>
                        <div>
                            <div className={styles.part__photo}>ФОТО</div>
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                target="_blank"
                href={`https://zealous-bay-07bf8c303.3.azurestaticapps.net?modelId=${car.id}`}
            >
                <Button>Ссылка на Колю</Button>
            </Link>
        </div>
    );
};

export default observer(Parts);
