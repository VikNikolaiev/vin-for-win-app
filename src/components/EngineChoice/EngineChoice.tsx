import React from 'react';
import Button from '@avtopro/button';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context/mainContext';
import { useTranslation } from 'next-i18next';

const EngineChoice = () => {
    const { t } = useTranslation();
    const { car, setMoreEngine, setPending } = useStore();
    return (
        <div>
            <p>{t('choiceEngine')}</p>
            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    height: '133px'
                }}
            >
                {car.engines.map((item) => (
                    <li key={item.id} style={{ marginBottom: '5px' }}>
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
