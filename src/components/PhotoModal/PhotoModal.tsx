import React, { FC, useEffect, useState } from 'react';
import Modal from '@avtopro/modal';
import Button from '@avtopro/button';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useStore } from '@/context/mainContext';

import styles from './PhotoModal.module.less';

const { useCaptureImage } = require('use-capture-image');

function getDataURL(file: File | Blob): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString());
        reader.onerror = (error) => reject(error);
    });
}

type Props = {
    setOpenCamera: React.Dispatch<React.SetStateAction<boolean>>;
    mode: number;
};

const PhotoModal: FC<Props> = ({ setOpenCamera, mode }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { vinSearch, setPending } = useStore();
    const [photo, setPhoto] = useState<FormData>();
    const [errorResponce, setErrorPesponce] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [takePhoto, setTakePhoto] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    const { error, startCamera, stopCamera, captureImage, videoRef } =
        useCaptureImage({
            constraints: {
                video: {
                    width: {
                        max: 1200
                    },
                    height: {
                        max: 1200
                    },
                    aspectRatio: { ideal: 1 },
                    facingMode: 'environment'
                }
            }
        });

    useEffect(() => {
        startCamera();
    }, []);

    const handleCapture = async () => {
        setTakePhoto(true);
        const imgBlob = await captureImage();
        const test = new File([imgBlob], 'file.jpg');
        const req = new FormData();
        req.append('file', test);
        const dataURL = await getDataURL(imgBlob);
        if (imgRef.current) {
            imgRef.current.src = dataURL || '';
        }

        setPhoto(req);
    };

    const sendCapture = async () => {
        setPending(true);
        axios
            .post(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/vin',
                photo,
                {
                    headers: {
                        AppLanguage: router.locale
                    }
                }
            )
            .then((resp) => {
                const { data } = resp;
                vinSearch.setVin(data);
                setOpenCamera(false);
                setPending(false);
            })
            .catch((err: AxiosError) => {
                setErrorPesponce(true);
                setErrorMessage(`${err.response?.data}`);
                setPending(false);
            });
    };

    return (
        <div>
            {errorResponce ? (
                <Modal
                    onClose={() => {
                        setErrorPesponce((prev: boolean) => !prev);
                        setOpenCamera((prev: boolean) => !prev);
                    }}
                    closeOnClick="true"
                >
                    <p>{errorMessage}</p>
                </Modal>
            ) : (
                <Modal
                    onClose={() => {
                        stopCamera();
                        setOpenCamera((prev: boolean) => !prev);
                    }}
                    closeOnClick="true"
                >
                    <p>{t('photo__desc')}</p>
                    {!takePhoto ? (
                        <div style={{ backgroundColor: '#ccc', width: '100%' }}>
                            <video
                                className="video"
                                width="100%"
                                autoPlay
                                ref={videoRef}
                            >
                                <track kind="captions" />
                            </video>
                        </div>
                    ) : (
                        <div>
                            <img ref={imgRef} alt="" />
                        </div>
                    )}
                    {error && <p>{error.message}</p>}
                    <div className={styles.modal__controls}>
                        {!takePhoto ? (
                            <Button theme="prime" onClick={handleCapture}>
                                {t('takePhoto__button')}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    theme="prime"
                                    onClick={() => {
                                        setTakePhoto((prev) => !prev);
                                        startCamera();
                                    }}
                                >
                                    {t('retakePhoto__button')}
                                </Button>
                                <Button theme="prime" onClick={sendCapture}>
                                    {mode === 1
                                        ? t('recognizeVin__button')
                                        : t('recognizeNumber__button')}
                                </Button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default observer(PhotoModal);
