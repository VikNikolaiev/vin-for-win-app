import { CustomError } from '@/types/CustomError';
import { PhotoIdentifierResponse } from '@/types/PhotoIdentifier';
import axios, { AxiosError } from 'axios';

export class PhotoIndentifierService {
    static ocrVin = async (
        formData: FormData,
        onError: (error: CustomError) => void
    ) => {
        try {
            const response = await axios.post<PhotoIdentifierResponse>(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/vin-number',
                formData
            );
            return response.data;
        } catch (error) {
            const e = error as AxiosError;

            switch (e.response?.status) {
                case 400:
                    onError(CustomError.vinCodeNotFound);
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
    };
}
