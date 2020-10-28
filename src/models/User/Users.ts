import { IUser } from '../../entities/User';


export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser, id: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class UserDao implements IUserDao {


    /**k
     * @param email
     */
    public async getOne(email: string): Promise<IUser | null> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        // TODO
        return [] as any;
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param user && id 
     */
    public async update(user: IUser, id: string): Promise<void> {
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

export default UserDao;
