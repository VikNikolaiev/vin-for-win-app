import { useStore } from '@/context/mainContext';
import { SearchMode } from '@/types/SearchMode';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { CaptureImage } from '../CaptureImage/CaptureImage';
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

    // if (errorResponce) {
    //     return (
    //         <Modal
    //             onClose={() => {
    //                 setErrorPesponce((prev: boolean) => !prev);
    //                 setOpenCamera((prev: boolean) => !prev);
    //             }}
    //             closeOnClick="true"
    //         >
    //             <p>{errorMessage}</p>
    //         </Modal>
    //     );
    // } else {
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
            <Button
                className="g-col-2 g-start-6 g-col-xs-8 g-start-xs-2"
                theme="prime"
                uppercase
                onClick={async () => {
                    setPending(true);
                    await car.getCar(vinSearch.vin);
                    if (car.engines.length > 1) {
                        setMoreEngine(true);
                    } else {
                        await car.getParts(car.engines[0].id.toString());
                    }
                    setStep('engines');
                    await setPending(false);
                }}
                disabled={!visibleButton()}
            >
                {t('carSearchButton')}
            </Button>
        </>
    );
});

export default SearchVin;
