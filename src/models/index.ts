import Translate from './Translate';
import Vin from './Vin';

class Model {
    translate: Translate;

    vinSearch: Vin;

    constructor() {
        this.translate = new Translate('');
        this.vinSearch = new Vin('');
    }
}

export default Model;
