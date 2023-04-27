export class Part {
    name: string;

    id: number;

    code: number;

    brandName: string;

    imgUrl: string;

    url: string;

    price: string;

    constructor(
        name: string,
        id: number,
        brandName: string,
        code: number,
        imgUrl: string,
        url: string,
        price: string
    ) {
        this.name = name;
        this.id = id;
        this.code = code;
        this.url = url;
        this.imgUrl = imgUrl;
        this.price = price;
        this.brandName = brandName;
    }
}
