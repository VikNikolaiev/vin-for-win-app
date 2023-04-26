import React, { useState, useRef } from 'react';
import Button from '@avtopro/button';
import TextInput from '@avtopro/text-input';
import Panel from '@avtopro/panel';
import FileInput, { FileDropZone } from '@avtopro/files-uploader';
import axios, { AxiosError, AxiosResponse } from 'axios';
import PhotoIcon from '@avtopro/icons/dist/jsx/PhotoIcon';
import { isMobile } from 'react-device-detect';
import imageCompression from 'browser-image-compression';
import { useStore } from '../../context/mainContext';
import PhotoModal from '../PhotoModal/PhotoModal';

const SearchVin = () => {
    const { vinSearch } = useStore();
    const [loading, setLoading] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const [errorResponce, setErrorPesponce] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const inputElement = useRef<HTMLInputElement | null>(null);

    type CustomFiles = {
        name: string;
        blob: Blob;
    };

    const performOcr = async (_: string, files: CustomFiles[]) => {
        if (files.length != 0) {
            setLoading(true);
            const imageFile = files[0].blob;
            const formData = new FormData();
            formData.append('file', imageFile);

            axios
                .post(
                    'https://service-vin-search-api.azurewebsites.net/api/vin/ocr',
                    formData
                )
                .then((resp: AxiosResponse) => {
                    const { data } = resp;
                    vinSearch.vin = data;
                    setLoading(false);
                })
                .catch((err: AxiosError) => {
                    setErrorPesponce(true);
                    setErrorMessage(`Response status: ${err.response?.data}`);
                });
        } else {
            vinSearch.vin = '';
        }
    };

    const visibleButton = () => {
        const regexp =
            /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;
        return regexp.test(vinSearch.vin);
    };

    const handleClick = () => {
        inputElement?.current?.click();
    };

    return (
        <div>
            {errorResponce ? (
                <div>{errorMessage}</div>
            ) : (
                <>
                    <Panel
                        type="button"
                        className="camera__button g-col-6 g-start-4"
                        onClick={() =>
                            isMobile
                                ? handleClick()
                                : setOpenCamera((prev) => !prev)
                        }
                    >
                        <i className="pro-icon-inline mr-x3">
                            <PhotoIcon />
                        </i>
                        Сфотографируйте VIN код
                    </Panel>
                    {openCamera && <PhotoModal setOpenCamera={setOpenCamera} />}
                    <div className="g-col-6 g-start-4">
                        <input
                            onChange={async (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const formData = new FormData();

                                const options = {
                                    maxSizeMB: 4,
                                    maxWidthOrHeight: 1920
                                };

                                if (e.target.files !== null) {
                                    // try {
                                    const compressedFile =
                                        await imageCompression(
                                            e.target?.files[0],
                                            options
                                        );
                                    const test = await new File(
                                        [compressedFile],
                                        'file.jpg'
                                    );
                                    await formData.append('file', test);
                                    // } catch (error) {
                                    //     console.log(error);
                                    // }

                                    axios
                                        .post(
                                            'https://service-vin-search-api.azurewebsites.net/api/vin/ocr',
                                            formData
                                        )
                                        .then((resp: AxiosResponse) => {
                                            const { data } = resp;
                                            vinSearch.vin = data;
                                            setLoading(false);
                                        })
                                        .catch((err: AxiosError) => {
                                            setErrorPesponce(true);
                                            setErrorMessage(
                                                `Response status: ${err.response?.data}`
                                            );
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
                                name: 'logo',
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
                                    title="Загрузите фото VIN кода"
                                    {...inputProps}
                                />
                            )}
                        </FileInput>
                    </div>
                    <span
                        className="g-col-4 g-start-5"
                        style={{ textAlign: 'center' }}
                    >
                        {vinSearch.vin.length >= 17
                            ? 'Проверьте корректность VIN кода:'
                            : 'или'}
                    </span>
                    <TextInput
                        defaultValue={vinSearch.vin}
                        className="g-col-4 g-start-5"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            vinSearch.vin = e.currentTarget.value;
                        }}
                        placeholder="Введите VIN код"
                    />
                    <div
                        className="g-col-4 g-start-5"
                        style={{ minHeight: '20px', textAlign: 'center' }}
                    >
                        {vinSearch.vin.length > 17 && (
                            <span
                                style={{
                                    color: 'red'
                                }}
                            >
                                Длина VIN кода не должна превышать 17 символов.
                            </span>
                        )}
                    </div>
                    {visibleButton() ? (
                        <Button
                            className="g-col-2 g-start-6"
                            theme="prime"
                            uppercase
                        >
                            {loading ? 'Загрузка' : 'Найти автомобиль'}
                        </Button>
                    ) : (
                        <Button
                            disabled
                            className="g-col-2 g-start-6"
                            theme="prime"
                            uppercase
                        >
                            {loading ? 'Загрузка' : 'Найти автомобиль'}
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchVin;
