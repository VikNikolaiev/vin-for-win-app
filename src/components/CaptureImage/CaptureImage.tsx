import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { useStore } from '@/context/mainContext';
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
    const { setPending, photoIndentifier } = useStore();

    type CustomFiles = {
        name: string;
        blob: Blob;
    };

    const handleFileInput = async (_: string, files: CustomFiles[]) => {
        if (files.length != 0) {
            setPending(true);

            try {
                await photoIndentifier.postPhoto(files[0].blob);
            } catch (err) {
                // console.log(err);
            } finally {
                setPending(false);
            }
        }
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
                await photoIndentifier.postPhoto(e.target.files[0] as Blob);
            } catch (err) {
                //console.log(err);
            } finally {
                setPending(false);
            }
        }
    };

    return (
        <>
            <Panel
                type="button"
                className="g-col-6 g-start-4 g-col-lg-8 g-start-lg-3 g-col-md-8 g-start-md-3 g-col-sm-10 g-start-sm-2 g-col-xs-12 g-col-xs-1 camera__button"
                onClick={() =>
                    isMobile
                        ? openMobileCamera()
                        : setOpenPCCamera((prev) => !prev)
                }
            >
                <i className="pro-icon-inline mr-x3">
                    <PhotoIcon />
                </i>
                {t('photoPanel')}
            </Panel>

            {openPCCamera && <PhotoModal setOpenCamera={setOpenPCCamera} />}

            <input
                type="file"
                style={{ display: 'none' }}
                capture="environment"
                ref={inputElement}
                onChange={handleMobileCamera}
            />

            <div className="g-col-6 g-start-4 g-col-lg-8 g-start-lg-3 g-col-md-8 g-start-md-3 g-col-sm-10 g-start-sm-2 g-col-xs-12 g-col-xs-1">
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
                            title={t('fileInput__desc')}
                            {...inputProps}
                        />
                    )}
                </FileInput>
            </div>
        </>
    );
};
