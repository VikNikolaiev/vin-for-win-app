import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { useStore } from '@/context/mainContext';
import { SearchMode } from '@/types/SearchMode';
import FileInput, { FileDropZone } from '@avtopro/files-uploader';
import PhotoIcon from '@avtopro/icons/dist/jsx/PhotoIcon';
import Panel from '@avtopro/panel';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const CaptureImage = () => {
    const [openPCCamera, setOpenPCCamera] = useState<boolean>(false);
    const { t } = useTranslation();

    const inputElement = useRef<HTMLInputElement>(null);
    const { searchMode, vinSearch, regnumSearch, setPending } = useStore();

    type CustomFiles = {
        name: string;
        blob: Blob;
    };

    const handleFileInput = async (_: string, files: CustomFiles[]) => {
        if (files.length != 0) {
            setPending(true);

            try {
                if (searchMode === SearchMode.VIN) {
                    await vinSearch.getVinFromImage(files[0].blob);
                }

                if (searchMode === SearchMode.REGNUM) {
                    await regnumSearch.getRegnumFromImage(files[0].blob);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setPending(false);
            }
        }

        // const imageFile = files[0].blob;
        // const formData = new FormData();
        // formData.append('file', imageFile);

        // axios
        //     .post(
        //         searchMode == SearchMode.VIN
        //             ? 'https://service-vin-search-api.azurewebsites.net/api/ocr/vin'
        //             : 'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
        //         formData
        //     )
        //     .then((resp: AxiosResponse) => {
        //         const { data } = resp;
        //         vinSearch.setVin(data);
        //         setPending(false);
        //     })
        //     .catch((err: AxiosError) => {
        //         setErrorPesponce(true);
        //         setErrorMessage(`${err.response?.data}`);
        //         setPending(false);
        //     });
        // } else {
        //     vinSearch.setVin('');
        // }
    };

    const openMobileCamera = () => {
        inputElement?.current?.click();
    };

    const handleMobileCamera = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            setPending(true);

            try {
                if (searchMode === SearchMode.VIN) {
                    await vinSearch.getVinFromImage(e.target.files[0] as Blob);
                }

                if (searchMode === SearchMode.REGNUM) {
                    await regnumSearch.getRegnumFromImage(
                        e.target.files[0] as Blob
                    );
                }
            } catch (err) {
                console.log(err);
            } finally {
                setPending(false);
            }

            // const formData = new FormData();
            // formData.append('file', e.target?.files[0]);
            // console.log(formData);

            // axios
            //     .post(
            //         searchMode == SearchMode.VIN
            //             ? 'https://service-vin-search-api.azurewebsites.net/api/ocr/vin'
            //             : 'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
            //         formData
            //     )
            //     .then((resp: AxiosResponse) => {
            //         const { data } = resp;
            //         vinSearch.setVin(data);
            //         setPending(false);
            //     })
            //     .catch((err: AxiosError) => {
            //         setErrorPesponce(true);
            //         setErrorMessage(`${err.response?.data}`);
            //         setPending(false);
            //     });
        }
    };

    return (
        <>
            <Panel
                type="button"
                className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2 camera__button"
                onClick={() =>
                    isMobile
                        ? openMobileCamera()
                        : setOpenPCCamera((prev) => !prev)
                }
            >
                <i className="pro-icon-inline mr-x3">
                    <PhotoIcon />
                </i>
                {searchMode === SearchMode.VIN
                    ? t('photo__panel_vin')
                    : t('photo__panel_number')}
            </Panel>

            {openPCCamera && <PhotoModal setOpenCamera={setOpenPCCamera} />}

            <input
                type="file"
                style={{ display: 'none' }}
                capture="environment"
                ref={inputElement}
                onChange={handleMobileCamera}
            />

            <div className="g-col-6 g-start-4 g-col-xs-8 g-start-xs-2">
                <FileInput
                    onChange={handleFileInput}
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
                                searchMode === SearchMode.VIN
                                    ? t('fileInput__desc_vin')
                                    : t('fileInput__desc_number')
                            }
                            {...inputProps}
                        />
                    )}
                </FileInput>
            </div>
        </>
    );
};
