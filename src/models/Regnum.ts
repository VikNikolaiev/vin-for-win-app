import { RegnumService } from '@/services/RegnumService';
import { action, makeAutoObservable, observable } from 'mobx';

class Regnum {
    regnum: string;
    isValid: boolean;

    constructor(regnum: string) {
        this.regnum = regnum || '';
        this.isValid = false;
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
            /^[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}\d{4}(?<!0{4})[ABCEHIKMOPTXАВСЕНКМОРТХІ]{2}$/;
        return pattern.test(regnum);
    }

    async getRegnumFromImage(image: Blob) {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const newRegnum = await RegnumService.ocrRegnum(formData);
            if (newRegnum) {
                this.setRegnum(newRegnum);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default Regnum;
