import { RegnumService } from '@/services/RegnumService';
import { CustomError } from '@/types/CustomError';
import { action, makeAutoObservable, observable } from 'mobx';

class Regnum {
    regnum: string;
    isValid: boolean;
    error: CustomError | null;

    constructor(regnum: string) {
        this.regnum = regnum || '';
        this.isValid = false;
        this.error = null;
        makeAutoObservable(this, {
            regnum: observable,
            isValid: observable,
            setRegnum: action
        });
    }

    setRegnum(regnum: string) {
        this.regnum = regnum;
        this.isValid = this.validateRegnum(regnum);
    }

    validateRegnum(regnum: string) {
        // const pattern = /^[ABCEHIKMOPTX]{2}\d{4}(?<!0{4})[ABCEHIKMOPTX]{2}$/;
        const pattern =
            /^[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}\d{4}(?!0{4})[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}$/;
        return pattern.test(regnum);
    }

    onError(error: CustomError) {
        this.error = error;
    }

    resetError() {
        this.error = null;
    }

    async getRegnumFromImage(image: Blob) {
        const formData = new FormData();
        formData.append('file', image);

        const newRegnum = await RegnumService.ocrRegnum(
            formData,
            (error: CustomError) => this.onError(error)
        );
        if (newRegnum) {
            this.setRegnum(newRegnum);
        }
    }
}
export default Regnum;
