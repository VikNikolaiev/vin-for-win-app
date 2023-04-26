import React, { FC, useEffect, useState } from 'react';
import Modal from '@avtopro/modal';
import Button from '@avtopro/button';
import axios, { AxiosError } from 'axios';
import { useStore } from '../../context/mainContext';

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
    const { vinSearch } = useStore();
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
        // axios
        //     .post(
        //         'https://service-vin-search-api.azurewebsites.net/api/vin/ocr',
        //         req
        //     )
        //     .then((resp) => {
        //         const { data } = resp;
        //         vinSearch.vin = data;
        //         setOpenCamera(false);
        //     });
    };

    const sendCapture = async () => {
        // const imgBlob = await captureImage();
        // const test = new File([imgBlob], 'file.jpg');
        // const req = new FormData();
        // req.append('file', test);
        // const dataURL = await getDataURL(imgBlob).catch((e) => {
        //     console.error(e);
        // });
        // imgRef.current.src = dataURL;
        axios
            .post(
                'https://service-vin-search-api.azurewebsites.net/api/vin/ocr',
                photo
            )
            .then((resp) => {
                const { data } = resp;
                vinSearch.vin = data;
                setOpenCamera(false);
            })
            .catch((err: AxiosError) => {
                setErrorPesponce(true);
                setErrorMessage(`Response status: ${err.response?.data}`);
            });
    };

    return (
        <div>
            {errorResponce ? (
                <Modal>
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
                    <p>
                        Дайте разрешение на доступ к камере и сфотографируйте
                        VIN код.
                    </p>
                    {!takePhoto ? (
                        <div
                            style={{ backgroundColor: '#ccc', width: '400px' }}
                        >
                            <video
                                className="video"
                                width="400px"
                                height="400px"
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
                            <>
                                <Button theme="prime" onClick={stopCamera}>
                                    stop camera
                                </Button>
                                <Button theme="prime" onClick={handleCapture}>
                                    Сделать фото
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    theme="prime"
                                    onClick={() => {
                                        setTakePhoto((prev) => !prev);
                                        startCamera();
                                    }}
                                >
                                    Сделать новое фото
                                </Button>
                                <Button theme="prime" onClick={sendCapture}>
                                    Распознать VIN код
                                </Button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PhotoModal;
