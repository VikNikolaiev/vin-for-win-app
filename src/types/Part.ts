export class Part {
    translatedName: string;

    id: number;

    code: number;

    brandName: string;

    imgUrl: string;

    url: string;

    price: string;

    constructor(
        translatedName: string,
        id: number,
        brandName: string,
        code: number,
        imgUrl: string,
        url: string,
        price: string
    ) {
        this.translatedName = translatedName;
        this.id = id;
        this.code = code;
        this.url = url;
        this.imgUrl = imgUrl;
        this.price = price;
        this.brandName = brandName;
    }
}
