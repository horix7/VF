

export interface IProduct {
    id: number;
    published_on: string;
    name: string;
    description: string;
    specs: object;
    price: string;
    stock: number;
    images: object;
    review_id: string;
}

export class Product implements IProduct {

 public id: number;
 public published_on: string;
 public name: string;
 public description: string;
 public specs: object;
 public price: string;
 public stock: number;
 public images: object;
 public review_id: string;
    

    constructor(
        nameOrProductName?: string | IProduct,
        id?: number,
        published_on?: string,
        description?: string,
        specs?: object,
        price?: string,
        stock?: number,
        images?: object,
        review_id?: string,
    ) {
        if (typeof nameOrProductName === 'string' || typeof nameOrProductName === 'undefined') {
            this.name = nameOrProductName || '';
            this.published_on = published_on || '';
            this.description = description || '';
            this.id = id || -1;
            this.specs = specs || {};
            this.price = price || '';
            this.images = images || [];
            this.review_id = review_id || '';
            this.stock = stock || 0


        } else {
            this.name = nameOrProductName.name;
            this.published_on = nameOrProductName.published_on;
            this.description = nameOrProductName.description;
            this.id = nameOrProductName.id;
            this.specs = nameOrProductName.specs;
            this.price = nameOrProductName.price;
            this.images = nameOrProductName.images;
            this.stock = nameOrProductName.stock;
            this.review_id = nameOrProductName.review_id;

        }
    }
}
