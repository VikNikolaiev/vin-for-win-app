import { makeAutoObservable } from 'mobx';
import Car from './Car';
import Vin from './Vin';
// import CarService from '@/services/car.service';
// import Car from './Car';s
// import { Engine } from '@/types/Engine';

class Model {
    partPage: boolean = false;

    pending: boolean = false;

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
}

export default Model;
