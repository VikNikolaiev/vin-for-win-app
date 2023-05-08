import { useStore } from '@/context/mainContext';
import { SearchMode } from '@/types/SearchMode';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { CaptureImage } from '../CaptureImage/CaptureImage';
import { ErrorWindow } from '../ErrorWindow/ErrorWindow';
import ListIdentifiers from '../Listidentifiers/ListIdentifiers';
import { VinInput } from '../VinInput/VinInput';
import styles from './SearchVin.module.less';
import router from 'next/router';

const SearchVin = observer(() => {
    const { t } = useTranslation();
    const {
        searchMode,
        setSearchMode,
        car,
        setStep,
        setPending,
        setMoreEngine,
        photoIndentifier
    } = useStore();

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
            {/* <div
                style={{ textAlign: 'center' }}
                className="g-col-6 g-start-4  g-col-xs-8 g-start-xs-2"
            >
                <nav className="pro-btn-group">
                    <Button
                        className={`${styles.tab} ${
                            searchMode == SearchMode.VIN ? styles.active : ''
                        }`}
                        onClick={() => setSearchMode(SearchMode.VIN)}
                    >
                        {t('vinTab')}
                    </Button>
                </nav>
                <p style={{ marginTop: '20px' }}>
                    {searchMode === SearchMode.VIN
                        ? t('title__desc_vin')
                        : t('title__desc_number')}
                </p>
            </div> */}
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
            </div>
            <CaptureImage />
            <ListIdentifiers />
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
