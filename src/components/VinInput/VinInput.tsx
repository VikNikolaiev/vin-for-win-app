import { useStore } from '@/context/mainContext';
import TextInput from '@avtopro/text-input';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import React from 'react';

export const VinInput = observer(() => {
    const { t } = useTranslation();

    const { photoIndentifier } = useStore();
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
                {photoIndentifier.selectedIndentifier.length > 0 &&
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
});
