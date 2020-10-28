import { IVideo } from '../../entities/video';


export interface IIVideo {
    getSome: (name: string) => Promise<any | null>
    getOne: (id: string) => Promise<any | null>;
    getAll: () => Promise<any[]>;
    add: (video: IVideo) => Promise<void>;
    update: (newvideo: IVideo, id: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class IIvodeo implements IIVideo {


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
     * @param video
     */
    public async add(video: IVideo): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param video && id 
     */
    public async update(newvideo: IVideo, id: string): Promise<void> {
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

export default IIvodeo;
