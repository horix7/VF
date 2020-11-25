import { IUser } from '../../entities/User';
import  db  from '../db/db.connect';
import { IUserDao } from './Users';

const userCollection = db.collection('users')

class UserDao implements IUserDao {


    public async getOne(email: string): Promise<any | null> {
    
     
        const userData = await userCollection.where("email" , "==" , email).get()
         if(userData.empty) return null
         
         const resultz: FirebaseFirestore.DocumentData[]  = []

         userData.forEach(doc => resultz.push({...doc.data(), id: doc.id}))


         return resultz[0]
    
    }

    public async getAll(): Promise<any> {
 
       const allUsers = await userCollection.get()
       
       const retUsers: FirebaseFirestore.DocumentData[] = []

       allUsers.forEach(doc => retUsers.push({...doc.data(), id: doc.id}))

       return retUsers
    }


    public async getOneId( id: string ): Promise<any | null> {
        
        const Video = await userCollection.doc(id).get()

        if(Video.exists) return {data: Video.data() , id: Video.id}
        
            return;
    }


    public async add(user: IUser): Promise<any> {
        try {
            
           const added = await userCollection.add(user)

            return added.path.split("/")[1];
        } catch (err) {
            throw err;
        }
    }


    public async update(user: IUser, id: string): Promise<void> {
        try {
                await userCollection.doc(id).update({...user}) 
                return;

        } catch (err) {
            throw new Error ('user does not exist ');
        }
    }


    public async delete(id: string): Promise<void> {
        try {
           
            await userCollection.doc(id).delete()
            return;

        } catch (err) {
            throw new Error('User not found');

        }
    }
}

export default UserDao;
