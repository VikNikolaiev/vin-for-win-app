import { useStore } from '@/context/mainContext';
import TextInput from '@avtopro/text-input';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

const VinInput = () => {
    const { t } = useTranslation();
    const { photoIndentifier } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    console.log(photoIndentifier.isValid);
    return (
        <>
            <TextInput
                className="g-col-4 g-start-5 g-col-lg-4 g-start-lg-5 g-col-md-6 g-start-md-4 g-col-sm-8 g-start-sm-3 g-col-xs-12 g-col-start-xs-1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    photoIndentifier.selectIndentifier(
                        e.target.value.toUpperCase()
                    );
                }}
                value={photoIndentifier.selectedIndentifier}
                placeholder={t('inputVinPlaceholder')}
            />
            <div
                className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                style={{ minHeight: '20px', textAlign: 'center' }}
            >
                {photoIndentifier.selectedIndentifier &&
                    !photoIndentifier.isValid && (
                        <span
                            style={{
                                color: 'red'
                            }}
                        >
                            {t('invalidVin')}
                        </span>
                    )}
            </div>
        </>
    );
};

export default observer(VinInput);
