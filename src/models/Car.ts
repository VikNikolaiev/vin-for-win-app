import { makeAutoObservable } from 'mobx';
import { Engine } from '@/types/Engine';
import { Part } from '@/types/Part';
import CarService from '@/services/CarService';

class Car {
    id: string = '';

    name: string = '';

    vinCode: string = '';

    price: string = '';

    overallPrice: string = '';

    imgUrl: string = '';

    engine: string = '';

    engines: Engine[] = [];

    parts: Part[] = [];

    catalogueUrl: string = '';

    notFound: boolean = false;

    pending: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getCar(vin: string) {
        try {
            const car = await CarService.getCar(vin);

            if (car) {
                this.id = car.id;
                this.name = car.name;
                this.vinCode = car.vinCode;
                this.engines = car.engines;
                this.price = car.price;
                this.imgUrl = car.imgUrl;
                this.catalogueUrl = car.catalogueUrl;
            }
        } catch (error: any) {
            // console.log(error);
        }
    }

    async getParts(engine: string) {
        this.engine = engine;
        this.pending = true;
        const data = await CarService.getParts(this.id, engine);
        if (data) {
            this.parts = [...data.parts];
            this.overallPrice = data.overallPrice.toString();
        }
        this.pending = false;
    }

    resetCar() {
        this.id = '';
        this.name = '';
        this.vinCode = '';
        this.engines = [];
        this.price = '';
        this.imgUrl = '';
        this.catalogueUrl = '';
    }

    resetParts() {
        this.parts = [];
    }

    setNotFound(notFound: boolean) {
        this.notFound = notFound;
    }
}

export default Car;
