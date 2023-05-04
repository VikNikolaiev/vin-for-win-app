import React from 'react';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { useStore } from '@/context/mainContext';
import { Engine } from '@/types/Engine';
import styles from './EngineChoice.module.less';

const EngineChoice = () => {
    const { t } = useTranslation();
    const { car, setMoreEngine, setPending } = useStore();

    return (
        <div className={styles.choice}>
            <p className={styles.desc}>{t('choiceEngine')}</p>
            <ul
                style={{
                    display: 'grid',
                    gap: '5px',
                    gridTemplateColumns: '1fr 1fr'
                }}
            >
                {car.engines.map((item: Engine) => (
                    <li key={item.id} style={{ marginBottom: '0px' }}>
                        <Button
                            theme="link"
                            style={{ padding: '0' }}
                            onClick={async () => {
                                setPending(true);
                                await car.getParts(item.id.toString());
                                await setMoreEngine(false);
                                await setPending(false);
                            }}
                        >
                            {item.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default observer(EngineChoice);
