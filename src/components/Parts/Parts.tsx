import React from 'react';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../context/mainContext';
import styles from './Parts.module.less';

const Parts = () => {
    const { car, setStep } = useStore();
    const partsList = car.parts;

    return (
        <>
            <div className="g-col-6 g-start-4">
                <div className={styles.car__card}>
                    <div className={styles.card__wrapper}>
                        <Image
                            alt=""
                            width="108"
                            height="72"
                            loader={() => car.imgUrl}
                            src={`${car.imgUrl}`}
                            style={{ marginRight: '20px' }}
                        />
                        <div style={{ margin: 'auto 0' }}>
                            <span className={styles.car__name}>
                                {car.name} {car.engines[0].name}
                            </span>
                            <span className={styles.car__vin}>
                                VIN: {car.vinCode}
                            </span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            theme="link"
                            onClick={() => {
                                setStep('search');
                            }}
                        >
                            Изменить
                        </Button>
                        <p>
                            Суммарная стоимость:
                            <br />
                            {car.price} грн
                        </p>
                    </div>
                </div>
                <div className={styles.parts}>
                    {partsList.map((item) => (
                        <div className={styles.part__wrapper} key={item.id}>
                            <div
                                className="grid-modal"
                                style={{ alignItems: 'center' }}
                            >
                                <div className="g-col-1">
                                    <Link href={item.url} target="_blank">
                                        {item.code}
                                    </Link>
                                    <p>{item.brandName}</p>
                                </div>
                                <div
                                    className={`${styles.part__title} g-col-2 g-start-2`}
                                >
                                    <Image
                                        alt=""
                                        width="57"
                                        height="40"
                                        loader={() => item.imgUrl}
                                        src={`${item.imgUrl}`}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <div className="g-col-1 g-start-4">
                                    <p>{item.price} грн</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link
                style={{ margin: '0 auto' }}
                className="g-col-12"
                target="_blank"
                href={car.catalogueUrl}
            >
                <Button theme="light-blue">
                    Перейти в полный каталог автозапчастей
                </Button>
            </Link>
            <Link
                style={{ margin: '0 auto' }}
                className="g-col-12"
                target="_blank"
                href={`https://zealous-bay-07bf8c303.3.azurestaticapps.net?modelId=${car.id}`}
            >
                <Button theme="light-blue">Найти деталь по фото</Button>
            </Link>
        </>
    );
};

export default observer(Parts);
