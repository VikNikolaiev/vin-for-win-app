import CarService from '@/services/CarService';
import { CustomError } from '@/types/CustomError';
import { Engine } from '@/types/Engine';
import { Part } from '@/types/Part';
import { makeAutoObservable } from 'mobx';

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

    error: CustomError | null = null;

    notFound: boolean = false;

    pending: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    onError(error: CustomError) {
        this.error = error;
    }

    resetError() {
        this.error = null;
    }

    async getCar(vin: string) {
        const car = await CarService.getCar(vin, (error: CustomError) =>
            this.onError(error)
        );
        if (car) {
            this.id = car.id;
            this.name = car.name;
            this.vinCode = car.vinCode;
            this.engines = car.engines;
            this.price = car.price;
            this.imgUrl = car.imgUrl;
            this.catalogueUrl = car.catalogueUrl;
        }

        if (this.engines.length === 1) {
            await this.getParts(this.engines[0].id.toString());
        }
    }

    async getParts(engine: string) {
        this.engine = engine;
        this.pending = true;
        const data = await CarService.getParts(
            this.id,
            engine,
            (error: CustomError) => this.onError(error)
        );
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
