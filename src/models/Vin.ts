import { action, makeAutoObservable, observable } from 'mobx';

class Vin {
    vin: string;

    constructor(vin: string) {
        this.vin = vin || '';
        makeAutoObservable(this, {
            vin: observable,
            setVin: action
        });
    }

    setVin(vin: string) {
        this.vin = vin;
    }
}
export default Vin;
