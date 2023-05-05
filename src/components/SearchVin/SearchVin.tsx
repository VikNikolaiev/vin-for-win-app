import { useStore } from '@/context/mainContext';
import { SearchMode } from '@/types/SearchMode';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { CaptureImage } from '../CaptureImage/CaptureImage';
import { ErrorWindow } from '../ErrorWindow/ErrorWindow';
import { RegnumInput } from '../RegnumInput/RegnumInput';
import { VinInput } from '../VinInput/VinInput';
import styles from './SearchVin.module.less';

const SearchVin = observer(() => {
    const { t } = useTranslation();
    const {
        searchMode,
        setSearchMode,
        vinSearch,
        regnumSearch,
        car,
        setStep,
        setPending,
        setMoreEngine
    } = useStore();

    const visibleButton = () => {
        switch (searchMode) {
            case SearchMode.VIN:
                if (vinSearch.isValid) {
                    return true;
                }
                break;
            case SearchMode.REGNUM:
                if (regnumSearch.isValid) {
                    return true;
                }
                break;
            default:
                return false;
        }
    };

    const handleFindCar = async () => {
        setPending(true);
        await car.getCar(
            searchMode === SearchMode.VIN
                ? `VinCode=${vinSearch.vin}`
                : `CarNumber=${regnumSearch.regnum}`
        );
        if (car.engines.length > 1) {
            setMoreEngine(true);
        }

        if (!car.error) {
            setStep('engines');
        }

        setPending(false);
    };

    return (
        <>
            <div
                style={{ textAlign: 'center' }}
                className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2"
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
                    <Button
                        className={`${styles.tab} ${
                            searchMode == SearchMode.REGNUM ? styles.active : ''
                        }`}
                        onClick={() => setSearchMode(SearchMode.REGNUM)}
                    >
                        {t('numberTab')}
                    </Button>
                </nav>
                <p style={{ marginTop: '20px' }}>
                    {searchMode === SearchMode.VIN
                        ? t('title__desc_vin')
                        : t('title__desc_number')}
                </p>
            </div>
            <CaptureImage />
            <span
                className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                style={{ textAlign: 'center' }}
            >
                {t('or')}
            </span>
            {searchMode === SearchMode.VIN ? <VinInput /> : <RegnumInput />}
            <div style={{ textAlign: 'center' }} className="g-col-12">
                <Button
                    theme="prime"
                    uppercase
                    onClick={handleFindCar}
                    disabled={!visibleButton()}
                >
                    {t('carSearchButton')}
                </Button>
            </div>
            {vinSearch.error && (
                <ErrorWindow
                    error={vinSearch.error}
                    resetError={() => vinSearch.resetError()}
                />
            )}
            {regnumSearch.error && (
                <ErrorWindow
                    error={regnumSearch.error}
                    resetError={() => regnumSearch.resetError()}
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
