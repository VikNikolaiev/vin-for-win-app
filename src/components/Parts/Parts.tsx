import EngineChoice from '@/components/EngineChoice/EngineChoice';
import styles from '@/components/Parts/Parts.module.less';
import { useStore } from '@/context/mainContext';
import { useRouter } from 'next/router';
import Button from '@avtopro/button';
import ArrowRightIcon from '@avtopro/icons/dist/jsx/ArrowRightIcon';
import Preloader from '@avtopro/preloader';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Parts = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { car, moreEngines, setStep, setMoreEngine } = useStore();
    const partsList = car.parts;

    return (
        <div className="g-col-10 g-start-2 g-col-lg-8 g-start-lg-3 g-col-md-10 g-start-md-2 g-col-xs-12 g-start-xs-1">
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
                            className={styles.car__photo}
                        />
                        <div style={{ margin: 'auto 0' }}>
                            <span className={styles.car__name}>
                                {car.name} {car.engine?.name}
                            </span>
                            <span className={styles.car__vin}>
                                {car.carNumber !== '' && `${car.carNumber}`}
                                {car.vinCode !== '' && `VIN:  ${car.vinCode}`}
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
                                        onClick={() => {
                                            setMoreEngine(true);
                                            car.resetEngine();
                                        }}
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
                                    {car.carNumber !== '' && t('changeRegnum')}
                                    {car.vinCode !== '' && t('changeVin')}
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
                                        className="grid-base"
                                        style={{
                                            alignItems: 'center',
                                            width: '100%'
                                        }}
                                    >
                                        <div
                                            className="g-col-2 g-col-lg-2 g-col-md-3 g-col-xs-2"
                                            style={{ minWidth: '50px' }}
                                        >
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                            >
                                                {item.code}
                                            </Link>
                                            <p>{item.brandName}</p>
                                        </div>
                                        <div
                                            className={`${styles.part__title} g-col-8 g-col-lg-8 g-col-md-7 g-col-sm-7 g-col-xs-2`}
                                        >
                                            <Image
                                                alt=""
                                                width="57"
                                                height="40"
                                                loader={() => item.imgUrl}
                                                src={item.imgUrl}
                                                unoptimized
                                                style={{ marginRight: '10px' }}
                                                className={styles.part__photo}
                                            />
                                            <p>{item.translatedName}</p>
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: '700'
                                            }}
                                            className="g-col-2 g-col-lg-2 g-col-md-2 g-col-sm-3 g-col-xs-2"
                                        >
                                            <p className={styles.part__price}>
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
                        className={styles.parts__buttons}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '15px'
                        }}
                    >
                        <Link
                            target="_blank"
                            href={`https://zealous-bay-07bf8c303.3.azurestaticapps.net/${router.locale}?modelId=${car.id}`}
                        >
                            <Button theme="light-blue">{t('findPart')}</Button>
                        </Link>
                        <Link target="_blank" href={car.catalogueUrl}>
                            <Button theme="light-blue">
                                {t('toCatalog')} <ArrowRightIcon />
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default observer(Parts);
