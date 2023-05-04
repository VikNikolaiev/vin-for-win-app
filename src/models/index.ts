import Car from '@/models/Car';
import Vin from '@/models/Vin';
import { SearchMode } from '@/types/SearchMode';
import { action, makeAutoObservable, observable } from 'mobx';
import Regnum from './Regnum';

class Model {
    searchMode: SearchMode;

    partPage: boolean = false;

    pending: boolean = false;

    moreEngines: boolean = false;

    step: string = 'search';

    vinSearch: Vin;

    regnumSearch: Regnum;

    car: Car;

    constructor() {
        this.searchMode = SearchMode.VIN;
        this.vinSearch = new Vin('');
        this.regnumSearch = new Regnum('');
        this.car = new Car();
        makeAutoObservable(this, {
            searchMode: observable,
            setSearchMode: action
        });
    }

    setStep = (step: string) => {
        this.step = step;
    };

    setPending = (pending: boolean) => {
        this.pending = pending;
    };

    setMoreEngine = (moreEngines: boolean) => {
        this.moreEngines = moreEngines;
    };

    setSearchMode = (searchMode: SearchMode) => {
        this.searchMode = searchMode;
    };
}

export default Model;
