import { useStore } from '@/context/mainContext';
import TextInput from '@avtopro/text-input';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import React from 'react';

export const VinInput = observer(() => {
    const { t } = useTranslation();

    const { vinSearch } = useStore();

    return (
        <>
            <TextInput
                className="g-col-4 g-start-5 g-col-xs-4 g-start-xs-3"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    vinSearch.setVin(e.currentTarget.value);
                }}
                value={vinSearch.vin}
                placeholder={t('inputVinPlaceholder')}
            />
            <div
                className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                style={{ minHeight: '20px', textAlign: 'center' }}
            >
                {vinSearch.vin.length > 0 && !vinSearch.isValid && (
                    <span
                        style={{
                            color: 'red'
                        }}
                    >
                        {t('invalidVin')}
                    </span>
                )}
                {/* {vinSearch.vin.length > 17 && (
                    <span
                        style={{
                          color: 'red'
                        }}
                    >
                        {t('invalidVin')}
                    </span>
                )} */}
            </div>
        </>
    );
});
