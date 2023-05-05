import { CustomError } from '@/types/CustomError';
import axios, { AxiosError } from 'axios';

export class RegnumService {
    static ocrRegnum = async (
        formData: FormData,
        onError: (error: CustomError) => void
    ) => {
        try {
            const regnumFromServer = await axios.post<string>(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
                formData
            );
            return regnumFromServer.data;
        } catch (error) {
            const e = error as AxiosError;

            switch (e.response?.status) {
                case 400:
                    onError(CustomError.regNumberNotFound);
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
