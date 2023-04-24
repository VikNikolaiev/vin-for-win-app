import { makeAutoObservable } from 'mobx';
// import TranslateService from '../services/translate.service';

class Translate {
    lang: string;

    constructor(lang: string) {
        this.lang = lang || 'en';
        makeAutoObservable(this);
    }

    // async getModels() {
    //     try {
    //         const { data } = await this.lang.getModelName();
    //         runInAction(() => {
    //             this.lang = data;
    //             this.state = 'done';
    //         });
    //     } catch (error) {
    //         this.state = 'error';
    //     }
    // }
}
export default Translate;
