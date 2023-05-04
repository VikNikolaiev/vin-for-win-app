import React, { useState, useRef } from 'react';
import Button from '@avtopro/button';
import TextInput from '@avtopro/text-input';
import Panel from '@avtopro/panel';
import FileInput, { FileDropZone } from '@avtopro/files-uploader';
import Modal from '@avtopro/modal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import PhotoIcon from '@avtopro/icons/dist/jsx/PhotoIcon';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';
import { observer } from 'mobx-react-lite';
import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { useStore } from '@/context/mainContext';
import styles from './SearchVin.module.less';

const SearchVin = () => {
    const { t } = useTranslation();
    const { vinSearch, car, setStep, setPending, setMoreEngine } = useStore();
    const [openCamera, setOpenCamera] = useState<boolean>(false);
    const [mode, setMode] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorResponce, setErrorPesponce] = useState<boolean>(false);
    const inputElement = useRef<HTMLInputElement>(null);

    type CustomFiles = {
        name: string;
        blob: Blob;
    };

    const performOcr = async (_: string, files: CustomFiles[]) => {
        if (files.length != 0) {
            setPending(true);
            const imageFile = files[0].blob;
            const formData = new FormData();
            formData.append('file', imageFile);

            axios
                .post(
                    mode === 1
                        ? 'https://service-vin-search-api.azurewebsites.net/api/ocr/vin'
                        : 'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
                    formData,
                    {
                        headers: {
                            AppLanguage: localStorage.getItem('lang')
                        }
                    }
                )
                .then((resp: AxiosResponse) => {
                    const { data } = resp;
                    vinSearch.setVin(data);
                    setPending(false);
                })
                .catch((err: AxiosError) => {
                    setErrorPesponce(true);
                    setErrorMessage(`${err.response?.data}`);
                    setPending(false);
                });
        } else {
            vinSearch.setVin('');
        }
    };

    const visibleButton = () => {
        if (mode === 1) {
            const regexp =
                /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;
            return regexp.test(vinSearch.vin);
        } else {
            const regexp = /^[ABCEHIKMOPTX]{2}\d{4}(?<!0{4})[ABCEHIKMOPTX]{2}$/;
            return regexp.test(vinSearch.vin);
        }
    };

    const handleClick = () => {
        inputElement?.current?.click();
    };

    if (errorResponce) {
        return (
            <Modal
                onClose={() => {
                    setErrorPesponce((prev: boolean) => !prev);
                    setOpenCamera((prev: boolean) => !prev);
                }}
                closeOnClick="true"
            >
                <p>{errorMessage}</p>
            </Modal>
        );
    } else {
        return (
            <>
                <div
                    style={{ textAlign: 'center' }}
                    className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2"
                >
                    <nav className="pro-btn-group">
                        <Button
                            className={`${styles.tab} ${
                                mode === 1 ? styles.active : ''
                            }`}
                            onClick={() => setMode(1)}
                        >
                            {t('vinTab')}
                        </Button>
                        <Button
                            className={`${styles.tab} ${
                                mode === 2 ? styles.active : ''
                            }`}
                            onClick={() => setMode(2)}
                        >
                            {t('numberTab')}
                        </Button>
                    </nav>
                    <p style={{ marginTop: '20px' }}>
                        {mode === 1
                            ? t('title__desc_vin')
                            : t('title__desc_number')}
                    </p>
                </div>
                <Panel
                    type="button"
                    className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2 camera__button"
                    onClick={() =>
                        isMobile
                            ? handleClick()
                            : setOpenCamera((prev) => !prev)
                    }
                >
                    <i className="pro-icon-inline mr-x3">
                        <PhotoIcon />
                    </i>
                    {mode === 1
                        ? t('photo__panel_vin')
                        : t('photo__panel_number')}
                </Panel>
                {openCamera && (
                    <PhotoModal mode={mode} setOpenCamera={setOpenCamera} />
                )}
                <div className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2">
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const formData = new FormData();

                            if (e.target.files !== null) {
                                setPending(true);
                                formData.append('file', e.target?.files[0]);

                                axios
                                    .post(
                                        mode === 1
                                            ? 'https://service-vin-search-api.azurewebsites.net/api/ocr/vin'
                                            : 'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
                                        formData,
                                        {
                                            headers: {
                                                AppLanguage:
                                                    localStorage.getItem('lang')
                                            }
                                        }
                                    )
                                    .then((resp: AxiosResponse) => {
                                        const { data } = resp;
                                        vinSearch.setVin(data);
                                        setPending(false);
                                    })
                                    .catch((err: AxiosError) => {
                                        setErrorPesponce(true);
                                        setErrorMessage(
                                            `${err.response?.data}`
                                        );
                                        setPending(false);
                                    });
                            }
                        }}
                        type="file"
                        style={{ display: 'none' }}
                        capture="environment"
                        ref={inputElement}
                    />
                    <FileInput
                        onChange={performOcr}
                        {...{
                            name: 'vin',
                            accept: {
                                jpg: ['image/jpeg'],
                                png: ['image/png'],
                                gif: ['image/gif'],
                                tiff: ['image/tiff'],
                                pdf: ['application/pdf']
                            },
                            multiple: false
                        }}
                    >
                        {(inputProps: object) => (
                            <FileDropZone
                                title={
                                    mode === 1
                                        ? t('fileInput__desc_vin')
                                        : t('fileInput__desc_number')
                                }
                                {...inputProps}
                            />
                        )}
                    </FileInput>
                </div>
                <span
                    className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                    style={{ textAlign: 'center' }}
                >
                    {t('or')}
                </span>
                <TextInput
                    className="g-col-4 g-start-5 g-col-xs-4 g-start-xs-3"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        vinSearch.setVin(e.currentTarget.value);
                    }}
                    value={vinSearch.vin}
                    placeholder={
                        mode === 1
                            ? t('inputVinPlaceholder')
                            : t('inputNumberPlaceholder')
                    }
                />
                <div
                    className="g-col-4 g-start-5 g-col-xs-8 g-start-xs-2"
                    style={{ minHeight: '20px', textAlign: 'center' }}
                >
                    {vinSearch.vin.length > (mode === 1 ? 17 : 8) && (
                        <span
                            style={{
                                color: 'red'
                            }}
                        >
                            {mode === 1 ? t('invalidVin') : t('invalidNumber')}
                        </span>
                    )}
                </div>
                {visibleButton() ? (
                    <Button
                        className="g-col-2 g-start-6 g-col-xs-8 g-start-xs-2"
                        theme="prime"
                        uppercase
                        onClick={async () => {
                            setPending(true);
                            await car.getCar(vinSearch.vin);
                            if (car.engines.length > 1) {
                                setMoreEngine(true);
                            } else {
                                await car.getParts(
                                    car.engines[0].id.toString()
                                );
                            }
                            setStep('engines');
                            await setPending(false);
                        }}
                    >
                        {t('carSearchButton')}
                    </Button>
                ) : (
                    <Button
                        disabled
                        className="g-col-2 g-start-6 g-col-md-4 g-start-md-5 g-col-sm-4 g-start-sm-5 g-col-xs-4 g-start-xs-3"
                        theme="prime"
                        uppercase
                    >
                        {t('carSearchButton')}
                    </Button>
                )}
            </>
        );
    }
};

export default observer(SearchVin);
