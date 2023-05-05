import Car from '@/models/Car';
import { CustomError } from '@/types/CustomError';
import { Parts } from '@/types/Parts';
import axios from 'axios';

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

            console.log(response.data);

            return response.data;
        } catch (error) {
            onError(CustomError.default);
            console.log(error);
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
            onError(CustomError.default);
            console.log(error);
            return null;
        }
    }
}

export default CarService;
