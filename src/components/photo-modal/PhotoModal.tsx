import React from 'react';
import Modal from '@avtopro/modal';
import axios from 'axios';
// import { useCaptureImage } from 'use-capture-image';
const { useCaptureImage } = require('use-capture-image');

function getDataURL(file: File | Blob): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString());
        reader.onerror = (error) => reject(error);
    });
}

const PhotoModal = () => {
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

    const imgRef = React.useRef(null);

    const handleCapture = async () => {
        const imgBlob = await captureImage();
        const yty = new File([imgBlob], 'file.jpg');
        const req = new FormData();
        req.append('file', yty);
        const dataURL = await getDataURL(imgBlob).catch((e) => {
            console.error(e);
        });
        imgRef.current.src = dataURL;
        axios
            .post(
                'https://service-vin-search-api.azurewebsites.net/api/vin/ocr',
                req
            )
            .then((resp) => {
                const { data } = resp;
            });
    };

    return (
        <Modal>
            <div style={{ backgroundColor: '#ccc', width: '400px' }}>
                <video
                    className="video"
                    width="400px"
                    height="400px"
                    autoPlay
                    ref={videoRef}
                    style={{ display: 'block' }}
                />
            </div>
            {error && <p>{error.message}</p>}
            <button type="button" onClick={stopCamera}>
                stop camera
            </button>
            <button type="button" onClick={startCamera}>
                start camera
            </button>
            <button type="button" onClick={handleCapture}>
                capture image
            </button>
            <div>
                <img ref={imgRef} alt="" />
            </div>
        </Modal>
    );
};

export default PhotoModal;
