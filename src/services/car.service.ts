/* eslint-disable consistent-return */
import axios from 'axios';
import { Part } from '../types/Part';
import Car from '../models/Car';

class CarService {
    static async getCar(vin: string) {
        try {
            const response = await axios.get<Car>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car?VinCode=${vin}`
            );

            return response.data;
        } catch {
            //
        }
    }

    static async getParts(modelId: string, engineId: string) {
        try {
            const response = await axios.get<Part[]>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car/parts?ModelId=${modelId}&EnginelId=${engineId}`
            );

            return response.data;
        } catch {
            //
        }
    }
}

export default CarService;
