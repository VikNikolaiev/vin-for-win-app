import { CustomError } from '@/types/CustomError';
import axios, { AxiosError } from 'axios';

export class VinService {
    static ocrVin = async (
        formData: FormData,
        onError: (error: CustomError) => void
    ) => {
        try {
            const vinFromServer = await axios.post<string>(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/vin',
                formData
            );
            return vinFromServer.data;
        } catch (error) {
            const e = error as AxiosError;

            switch (e.response?.status) {
                case 400:
                    onError(CustomError.searchValueNotFound);
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

// .then((resp: AxiosResponse) => {
//   const { data } = resp;
//   vinSearch.setVin(data);
//   setPending(false);
// })
// .catch((err: AxiosError) => {
//   setErrorPesponce(true);
//   setErrorMessage(`${err.response?.data}`);
//   setPending(false);
// });
