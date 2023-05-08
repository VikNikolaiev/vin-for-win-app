import { useStore } from '@/context/mainContext';
import Button from '@avtopro/button';
import AskSmIcon from '@avtopro/icons/dist/jsx/AskSmIcon';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { CaptureImage } from '../CaptureImage/CaptureImage';
import { ErrorWindow } from '../ErrorWindow/ErrorWindow';
import ListIdentifiers from '../Listidentifiers/ListIdentifiers';
import { VinInput } from '../VinInput/VinInput';
import styles from './SearchVin.module.less';

import dynamic from 'next/dynamic';
import { Fragment } from 'react';
const MyTooltip = dynamic<{
    id: string;
    html: boolean;
    place: string;
    delayHide: number;
}>(() => import('@avtopro/tooltip') as any, {
    ssr: false
});

const SearchVin = observer(() => {
    const { t } = useTranslation();
    const { car, setStep, setPending, setMoreEngine, photoIndentifier } =
        useStore();

    const handleFindCar = async () => {
        setPending(true);
        car.error = null;
        if (
            photoIndentifier.validateVin(photoIndentifier.selectedIndentifier)
        ) {
            await car.getCar(`VinCode=${photoIndentifier.selectedIndentifier}`);
        }
        if (
            photoIndentifier.validateRegnum(
                photoIndentifier.selectedIndentifier
            )
        ) {
            await car.getCar(
                `CarNumber=${photoIndentifier.selectedIndentifier}`
            );
        }
        if (car.engines.length > 1) {
            setMoreEngine(true);
        }

        if (!car.error) {
            setStep('engines');
        }

        setPending(false);
    };

    const changeAplication = () => {
        setPending(true);
        router.push(
            `https://zealous-bay-07bf8c303.3.azurestaticapps.net/${router.locale}`
        );
    };

    return (
        <>
            <div
                className={`${styles.switcher} pro-btn-group g-col-12 g-col-xs-6`}
            >
                <Button
                    onClick={() => changeAplication()}
                    className={
                        (styles.switcher__btn,
                        styles['switcher__btn--inactive'])
                    }
                >
                    Search parts
                </Button>
                <Button
                    className={
                        (styles.switcher__btn, styles['switcher__btn--active'])
                    }
                >
                    Search vehicle
                </Button>
                <div style={{ marginTop: '20px' }}>
                    <span>{t('title__desc_vin')}</span>
                    <Fragment>
                        <span
                            className="pro-icon-inline"
                            data-for="test"
                            data-tip={`
                                <p>VIN – уникальный код транспортного средства, состоящий из 17 символов.<br />
                                VIN указан на обратной стороне технического паспорта автомобиля, на приборной панели автомобиля под лобовым стеклом и под капотом автомобиля.</p>
                                <p>
                                    <img src="/images/vin.png" style={{ width: 'auto' }} />
                                </p>
                            `}
                        >
                            <AskSmIcon />
                        </span>
                    </Fragment>
                </div>
            </div>

            <CaptureImage />
            <ListIdentifiers />
            <MyTooltip id="test" html place="right" delayHide={500} />

            <span
                className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                style={{ textAlign: 'center' }}
            >
                {t('or')}
            </span>
            <VinInput />
            <div style={{ textAlign: 'center' }} className="g-col-12">
                <Button
                    theme="prime"
                    uppercase
                    onClick={handleFindCar}
                    disabled={!photoIndentifier.isValid}
                >
                    {t('carSearchButton')}
                </Button>
            </div>
            {photoIndentifier.error && (
                <ErrorWindow
                    error={photoIndentifier.error}
                    resetError={() => photoIndentifier.resetError()}
                />
            )}
            {car.error && (
                <ErrorWindow
                    error={car.error}
                    resetError={() => car.resetError()}
                />
            )}
        </>
    );
});

export default SearchVin;
