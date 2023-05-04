import axios from 'axios';

export class VinService {
    static ocrVin = async (formData: FormData) => {
        try {
            const vinFromServer = await axios.post<string>(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/vin',
                formData
            );
            return vinFromServer.data;
        } catch (error) {
            console.log(error);
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
