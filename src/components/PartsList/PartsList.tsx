import EngineChoice from '@/components/EngineChoice/EngineChoice';
import { useStore } from '@/context/mainContext';
import { useRouter } from 'next/router';
import Button from '@avtopro/button';
import ArrowRightIcon from '@avtopro/icons/dist/jsx/ArrowRightIcon';
import Preloader from '@avtopro/preloader';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PartsList.module.less';

const Parts = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { car, moreEngines, setMoreEngine } = useStore();
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
                            <div className={styles.car__controls}>
                                {car.engines.length > 1 &&
                                    car.engine !== null && (
                                        <Button
                                            theme="link"
                                            framed={false}
                                            square={false}
                                            style={{
                                                width: 'fit-content',
                                                padding: '0px',
                                                marginRight: '20px'
                                            }}
                                            onClick={() => {
                                                setMoreEngine(true);
                                                car.resetParts();
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
                                        width: 'fit-content',
                                        padding: '0px'
                                    }}
                                    onClick={() => {
                                        router.push('/');
                                    }}
                                >
                                    {t('changeSearchValue')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {car.overallPrice && (
                        <div className={styles.overallPrice__wrapper}>
                            <div className={styles.overallPrice__content}>
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
                                    UAH
                                </p>
                            </div>
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
                                            className={`g-col-2 g-col-lg-2 g-col-md-3 g-col-sm-3 g-col-xs-2 ${styles.part__code}`}
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
                                            style={{ display: 'flex' }}
                                            className="g-col-8 g-col-lg-8 g-col-md-7 g-col-sm-6 g-col-xs-2"
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        'part-photo__wrapper'
                                                    ]
                                                }
                                            >
                                                <Image
                                                    alt=""
                                                    width="51"
                                                    height="34"
                                                    loader={() => item.imgUrl}
                                                    src={item.imgUrl}
                                                    unoptimized
                                                    className={
                                                        styles.part__photo
                                                    }
                                                />
                                            </div>
                                            <p className={styles.part__title}>
                                                {item.translatedName}
                                            </p>
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
                                                UAH
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
                    <div className={styles.parts__buttons}>
                        <Link
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
