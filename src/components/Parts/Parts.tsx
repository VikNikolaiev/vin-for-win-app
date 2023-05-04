import React from 'react';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Image from 'next/image';
import Preloader from '@avtopro/preloader';
import { useTranslation } from 'next-i18next';
import { useStore } from '@/context/mainContext';
import EngineChoice from '@/components/EngineChoice/EngineChoice';
import styles from '@/components/Parts/Parts.module.less';

const Parts = () => {
    const { t } = useTranslation();
    const { car, moreEngines, setStep, setMoreEngine } = useStore();
    const partsList = car.parts;

    return (
        <div className="g-col-6 g-start-4">
            <div className={styles.car__card}>
                <div className={styles.card__wrapper}>
                    <div className={styles.info__wrapper}>
                        <Image
                            alt=""
                            width="108"
                            height="72"
                            loader={() => car.imgUrl}
                            src={car.imgUrl}
                            unoptimized
                            style={{ marginRight: '20px' }}
                        />
                        <div style={{ margin: 'auto 0' }}>
                            <span className={styles.car__name}>
                                {car.name} {car.engines[0].name}
                            </span>
                            <span className={styles.car__vin}>
                                VIN: {car.vinCode}
                            </span>
                            <div style={{ display: 'flex', marginTop: '5px' }}>
                                {!moreEngines && (
                                    <Button
                                        theme="link"
                                        framed={false}
                                        square={false}
                                        style={{
                                            padding: '0px',
                                            marginRight: '20px'
                                        }}
                                        onClick={() => setMoreEngine(true)}
                                    >
                                        {t('changeEngine')}
                                    </Button>
                                )}
                                <Button
                                    theme="link"
                                    framed={false}
                                    square={false}
                                    style={{
                                        padding: '0px'
                                    }}
                                    onClick={() => {
                                        setStep('search');
                                        car.resetCar();
                                    }}
                                >
                                    {t('changeVin')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {car.overallPrice && (
                        <div className={styles.overallPrice__wrapper}>
                            <p className={styles.overallPrice__title}>
                                {t('overallPrice')}
                            </p>
                            <p className={styles.overallPrice}>
                                {car.overallPrice
                                    .toString()
                                    .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        '$1 '
                                    )}{' '}
                                грн
                            </p>
                        </div>
                    )}
                </div>
                {moreEngines && <EngineChoice />}
            </div>
            {!moreEngines && (
                <>
                    <div className={styles.parts}>
                        {!car.pending ? (
                            partsList.map((item: any) => (
                                <div
                                    className={styles.part__wrapper}
                                    key={item.id}
                                >
                                    <div
                                        className="grid-modal"
                                        style={{ alignItems: 'center' }}
                                    >
                                        <div className="g-col-1">
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                            >
                                                {item.code}
                                            </Link>
                                            <p>{item.brandName}</p>
                                        </div>
                                        <div
                                            className={`${styles.part__title} g-col-2 g-start-2`}
                                            style={{ marginLeft: '-30px' }}
                                        >
                                            <Image
                                                alt=""
                                                width="57"
                                                height="40"
                                                loader={() => item.imgUrl}
                                                src={item.imgUrl}
                                                unoptimized
                                                style={{ marginRight: '10px' }}
                                            />
                                            <p>{item.translatedName}</p>
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: '700',
                                                paddingLeft: '25px'
                                            }}
                                            className="g-col-1 g-start-4"
                                        >
                                            <p>
                                                {item.price
                                                    .toString()
                                                    .replace(
                                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                                        '$1 '
                                                    )}{' '}
                                                грн
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '15px 0px' }}>
                                <Preloader title={t('preloader')} />
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '15px'
                        }}
                    >
                        <Link
                            target="_blank"
                            href={`https://zealous-bay-07bf8c303.3.azurestaticapps.net?modelId=${car.id}`}
                        >
                            <Button theme="light-blue">{t('findPart')}</Button>
                        </Link>
                        <Link target="_blank" href={car.catalogueUrl}>
                            <Button theme="light-blue">{t('toCatalog')}</Button>
                        </Link>
                    </div>
                </>
            )}
            {/* {moreEngines ? (
                <EngineChoice />
            ) : (
                <>
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
                                        style={{ marginLeft: '-30px' }}
                                    >
                                        <Image
                                            alt=""
                                            width="57"
                                            height="40"
                                            loader={() => item.imgUrl}
                                            src={item.imgUrl}
                                            unoptimized
                                            style={{ marginRight: '10px' }}
                                        />
                                        <p>{item.name}</p>
                                    </div>
                                    <div
                                        style={{
                                            fontWeight: '700',
                                            paddingLeft: '25px'
                                        }}
                                        className="g-col-1 g-start-4"
                                    >
                                        <p>
                                            {item.price
                                                .toString()
                                                .replace(
                                                    /(\d)(?=(\d{3})+(?!\d))/g,
                                                    '$1 '
                                                )}{' '}
                                            грн
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '15px'
                        }}
                    >
                        <Link
                            target="_blank"
                            href={`https://zealous-bay-07bf8c303.3.azurestaticapps.net?modelId=${car.id}`}
                        >
                            <Button theme="light-blue">{t('findPart')}</Button>
                        </Link>
                        <Link target="_blank" href={car.catalogueUrl}>
                            <Button theme="light-blue">{t('toCatalog')}</Button>
                        </Link>
                    </div>
                </>
            )} */}
        </div>
    );
};

export default observer(Parts);
