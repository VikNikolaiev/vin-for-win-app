import { makeAutoObservable } from 'mobx';
// import VinService from '../services/vin.service';

class Vin {
    pending: boolean = false;

    step: string = 'search';

    vin: string;

    constructor(vin: string) {
        this.vin = vin || '';
        makeAutoObservable(this);
    }

    // async getModels() {
    //     try {
    //         const { data } = await this.lang.getModelName();
    //         runInAction(() => {
    //             this.lang = data;
    //             this.state = 'done';
    //         });
    //     } catch (error) {
    //         this.state = 'error';
    //     }
    // }
}
export default Vin;
