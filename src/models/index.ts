import { makeAutoObservable } from 'mobx';
import Car from '@/models/Car';
import Vin from '@/models/Vin';

class Model {
    partPage: boolean = false;

    pending: boolean = false;

    moreEngines: boolean = false;

    step: string = 'search';

    vinSearch: Vin;

    car: Car;

    constructor() {
        makeAutoObservable(this);
        this.vinSearch = new Vin('');
        this.car = new Car();
    }

    setStep = (step: string) => {
        this.step = step;
    };

    setPending = (pending: boolean) => {
        this.pending = pending;
    };

    setMoreEngine = (moreEngines: boolean) => {
        this.moreEngines = moreEngines;
    };
}

export default new Model();
