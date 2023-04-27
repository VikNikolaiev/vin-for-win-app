export class Part {
    name: string;

    id: number;

    code: number;

    brandName: string;

    constructor(name: string, id: number, brandName: string, code: number) {
        this.name = name;
        this.id = id;
        this.code = code;
        this.brandName = brandName;
    }
}
