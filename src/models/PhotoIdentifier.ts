import { PhotoIndentifierService } from '@/services/PhotoIdentifierService';
import { CustomError } from '@/types/CustomError';
import { PhotoIdentifierResponse } from '@/types/PhotoIdentifier';
import { SelectedIndentifier } from '@/types/SelectedIndentifier';
import { action, makeAutoObservable, observable } from 'mobx';

class PhotoIdentifier {
    photoIndentifierData: PhotoIdentifierResponse | null = null;
    selectedIndentifier: string;
    isValid: boolean = false;
    error: CustomError | null = null;

    constructor(photoIndentifierData: PhotoIdentifierResponse | null = null) {
        this.photoIndentifierData = photoIndentifierData;
        this.selectedIndentifier = '';

        makeAutoObservable(this, {
            photoIndentifierData: observable,
            error: observable,
            postPhoto: action,
            selectIndentifier: action
        });
    }

    onError(error: CustomError) {
        this.error = error;
    }

    async postPhoto(image: Blob) {
        const formData = new FormData();
        formData.append('file', image);

        const response = await PhotoIndentifierService.ocrVin(
            formData,
            (error: CustomError) => this.onError(error)
        );
        if (response) {
            this.photoIndentifierData = response;
        }
    }

    selectIndentifier(indentifier: string) {
        this.selectedIndentifier = indentifier;
        this.isValid =
            this.validateVin(indentifier) || this.validateRegnum(indentifier);
    }

    validateVin(vin: string) {
        const pattern = /[A-HJ-NPR-Z0-9]{17}/;

        return pattern.test(vin);
    }

    validateRegnum(regnum: string) {
        const pattern =
            /^[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}\d{4}(?!0{4})[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}$/;
        return pattern.test(regnum);
    }

    resetError() {
        this.error = null;
    }
}

export default PhotoIdentifier;