import axios, { AxiosError } from 'axios';
import { Parts } from '@/types/Parts';
import Car from '@/models/Car';

class CarService {
    static async getCar(vin: string) {
        try {
            const response = await axios.get<Car>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car?VinCode=${vin}`
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error;
            }
        }
        return null;
    }

    static async getParts(modelId: string, engineId: string) {
        try {
            const response = await axios.get<Parts>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car/parts?ModelId=${modelId}&EnginelId=${engineId}`
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error;
            }
        }
        return null;
    }
}

export default CarService;
