import { useStore } from '@/context/mainContext';
import Button from '@avtopro/button';
import Modal from '@avtopro/modal';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';

import { SearchMode } from '@/types/SearchMode';
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
};

const PhotoModal: FC<Props> = ({ setOpenCamera }) => {
    const { t } = useTranslation();
    const { searchMode, setPending, photoIndentifier } = useStore();
    const [photo, setPhoto] = useState<Blob>();
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
        setPending(true);

        try {
            const imgBlob = await captureImage();
            setPhoto(imgBlob);
            setTakePhoto(true);
            stopCamera();

            const dataURL = await getDataURL(imgBlob);
            if (imgRef.current) {
                imgRef.current.src = dataURL || '';
            }
        } catch (err) {
            // console.log(err);
        } finally {
            setPending(false);
        }
    };

    const sendCapture = async () => {
        if (photo) {
            setOpenCamera(false);
            setPending(true);
            await photoIndentifier.postPhoto(new File([photo], 'file.jpg'));
            setPending(false);
        }
    };

    return (
        <div>
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
                        <Button
                            theme="prime"
                            onClick={handleCapture}
                            disabled={error ? true : false}
                        >
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
                                tabIndex={0}
                            >
                                {t('retakePhoto__button')}
                            </Button>
                            <Button theme="prime" onClick={sendCapture}>
                                {t('recognizeButton')}
                            </Button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default observer(PhotoModal);
