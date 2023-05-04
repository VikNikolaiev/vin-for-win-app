import axios from 'axios';

export class RegnumService {
    static ocrRegnum = async (formData: FormData) => {
        try {
            const regnumFromServer = await axios.post<string>(
                'https://service-vin-search-api.azurewebsites.net/api/ocr/number',
                formData
            );
            return regnumFromServer.data;
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
