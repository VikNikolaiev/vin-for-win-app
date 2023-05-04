import { useStore } from '@/context/mainContext';
import TextInput from '@avtopro/text-input';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import React from 'react';

export const RegnumInput = observer(() => {
    const { t } = useTranslation();

    const { regnumSearch } = useStore();

    return (
        <>
            <TextInput
                className="g-col-4 g-start-5 g-col-xs-4 g-start-xs-3"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    regnumSearch.setRegnum(e.currentTarget.value);
                }}
                value={regnumSearch.regnum}
                placeholder={t('inputNumberPlaceholder')}
            />
            <div
                className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                style={{ minHeight: '20px', textAlign: 'center' }}
            >
                {regnumSearch.regnum.length > 0 && !regnumSearch.isValid && (
                    <span
                        style={{
                            color: 'red'
                        }}
                    >
                        {t('invalidNumber')}
                    </span>
                )}
                {/* {vinSearch.vin.length > 8 && (
                    <span
                        style={{
                            color: 'red'
                        }}
                    >
                        {t('invalidNumber')}
                    </span>
                )} */}
            </div>
        </>
    );
});
