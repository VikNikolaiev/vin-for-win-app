import Modal from '@avtopro/modal';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

type Props = {
    error: string | null;
    resetError: () => void;
};

export const ErrorWindow: FC<Props> = observer(({ error, resetError }) => {
    const { t } = useTranslation();

    return (
        <Modal mode="error" onClose={resetError} closeOnClick="true">
            <div className="modwin__content">
                <div className="modwin__caption">{t(`${error}`)}</div>
            </div>
        </Modal>
    );
});
