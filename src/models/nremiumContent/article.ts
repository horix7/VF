import { IArticle } from '../../entities/article';


export interface IIArticle {
    getSome: (name: string) => Promise<any | null>
    getOne: (id: string) => Promise<any | null>;
    getAll: () => Promise<any[]>;
    add: (article: IArticle) => Promise<void>;
    update: (newArticle: IArticle, id: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class AArticle implements IIArticle {


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
     * @param article
     */
    public async add(article: IArticle): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param article && id 
     */
    public async update(newArticle: IArticle, id: string): Promise<void> {
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

export default AArticle;
