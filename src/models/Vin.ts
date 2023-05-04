import { VinService } from '@/services/VinService';
import { action, makeAutoObservable, observable } from 'mobx';

class Vin {
    vin: string;
    isValid: boolean;

    constructor(vin: string) {
        this.vin = vin || '';
        this.isValid = false;
        makeAutoObservable(this, {
            vin: observable,
            isValid: observable,
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

    async getVinFromImage(image: Blob) {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const newVin = await VinService.ocrVin(formData);
            if (newVin) {
                this.setVin(newVin);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default Vin;
