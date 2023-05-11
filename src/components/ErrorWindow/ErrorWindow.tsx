import { FC } from 'react';
import Button from '@avtopro/button';
import Modal from '@avtopro/modal';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import styles from './ErrorWindow.module.less';

type Props = {
    error: string | null;
    resetError: () => void;
};

export const ErrorWindow: FC<Props> = observer(({ error, resetError }) => {
    const { t } = useTranslation();

    return (
        <Modal mode="warning" onClose={resetError} closeOnClick>
            <div className={`modwin__content ${styles.formContent}`}>
                <div className="modwin__caption">{t(`${error}`)}</div>
                <Button
                    type="button"
                    theme="blue"
                    onClick={resetError}
                >
                    {t(`errorReturn__button`)}
                </Button>
            </div>
        </Modal>
    );
});
