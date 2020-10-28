import { IProduct } from '../../entities/Product';


export interface IProdui {
    getSome: (name: string) => Promise<any | null>
    getOne: (id: string) => Promise<any | null>;
    getAll: () => Promise<any[]>;
    add: (product: IProduct) => Promise<void>;
    update: (product: IProduct, id: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class PProcuts implements IProdui {


    /**k
     * @param id
     */
    public async getOne(id: string): Promise<any | null> {
        // TODO
        return [] as any;
    }


     /**k
     * @param name
     */
    public async getSome(name: string): Promise<any | null> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<any[]> {
        // TODO
        return [] as any;
    }


    /**
     *
     * @param product
     */
    public async add(product: IProduct): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param product && id 
     */
    public async update(product: IProduct, id: string): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default PProcuts;
