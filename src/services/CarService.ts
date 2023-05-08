import Car from '@/models/Car';
import { CustomError } from '@/types/CustomError';
import { Parts } from '@/types/Parts';
import axios, { AxiosError } from 'axios';

class CarService {
    static async getCar(vin: string, onError: (error: CustomError) => void) {
        try {
            const response = await axios.get<Car>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car?${vin}`,
                {
                    headers: {
                        AppLanguage: localStorage.getItem('lang')
                    }
                }
            );

            return response.data;
        } catch (error) {
            const e = error as AxiosError;

            switch (e.response?.status) {
                case 400:
                case 404:
                    onError(CustomError.carNotFound);
                    break;
                case undefined:
                    onError(CustomError.connection);
                    break;
                default:
                    onError(CustomError.default);
                    break;
            }
            return null;
        }
    }

    static async getParts(
        modelId: string,
        engineId: string,
        onError: (error: CustomError) => void
    ) {
        try {
            const response = await axios.get<Parts>(
                `https://service-vin-search-api.azurewebsites.net/api/cars/car/parts?ModelId=${modelId}&EnginelId=${engineId}`,
                {
                    headers: {
                        AppLanguage: localStorage.getItem('lang')
                    }
                }
            );

            return response.data;
        } catch (error) {
            const e = error as AxiosError;

            switch (e.response?.status) {
                case 400:
                case 404:
                    onError(CustomError.carNotFound);
                    break;
                case undefined:
                    onError(CustomError.connection);
                    break;
                default:
                    onError(CustomError.default);
                    break;
            }
            return null;
        }
    }
}

export default CarService;
