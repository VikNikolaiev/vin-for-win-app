import { VinService } from '@/services/VinService';
import { CustomError } from '@/types/CustomError';
import { action, makeAutoObservable, observable } from 'mobx';

class Vin {
    vin: string;
    isValid: boolean;
    error: CustomError | null;

    constructor(vin: string) {
        this.vin = vin || '';
        this.isValid = false;
        this.error = null;
        makeAutoObservable(this, {
            vin: observable,
            isValid: observable,
            error: observable,
            onError: action,
            resetError: action,
            setVin: action
        });
    }

    setVin(vin: string) {
        this.vin = vin;
        this.isValid = this.validateVin(vin);
    }

    validateVin(vin: string) {
        const pattern = /[A-HJ-NPR-Z0-9]{17}/;

        return pattern.test(vin);
    }

    onError(error: CustomError) {
        this.error = error;
    }

    resetError() {
        this.error = null;
    }

    async getVinFromImage(image: Blob) {
        const formData = new FormData();
        formData.append('file', image);

        const newVin = await VinService.ocrVin(formData, (error: CustomError) =>
            this.onError(error)
        );
        if (newVin) {
            this.setVin(newVin);
        }
    }
}
export default Vin;
