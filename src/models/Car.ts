import { makeAutoObservable } from 'mobx';
import CarService from '@/services/car.service';
import { Engine } from '../types/Engine';
import { Part } from '../types/Part';

class Car {
    id: string = '';

    name: string = '';

    vinCode: string = '';

    engines: Engine[] = [];

    parts: Part[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getCar(vin: string) {
        const car = await CarService.getCar(vin);
        if (car) {
            this.id = car.id;
            this.name = car.name;
            this.vinCode = car.vinCode;
            this.engines = car.engines;
        }
    }

    async getParts() {
        const carParts = await CarService.getParts(
            this.id,
            this.engines[0].id.toString()
        );
        console.log(carParts);
        if (carParts) {
            this.parts = [...carParts];
        }
    }
}

export default Car;
