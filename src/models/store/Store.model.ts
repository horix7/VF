import { IProduct } from '../../entities/Product';
import  db  from '../db/db.connect';
import { IProdui } from './store';
import CommentsReviews from '../reviewsAndComments/comments'

const comments = new CommentsReviews()

const productCollection  = db.collection('store')

class Produi implements IProdui {

    /**
     * getOne 
     */
    public async getOne( id: string ): Promise<any | null> {
        
        const product = await productCollection.doc(id).get()

        if(product.exists) return {data: product.data(), id: product.id}
        
            return;
    }


    public async getSome(name: string): Promise<any | null> {
     
        const productData = await productCollection.where("name" , "==" , name).get()
         if(productData.empty) return null
         
         const resultz: FirebaseFirestore.DocumentData[]  = []

         productData.forEach(doc => resultz.push({...doc.data(), id: doc.id}))


         return resultz
    
    }

    public async getAll(): Promise<any> {
 
       const allproducts = await productCollection.get()
       
       const retproducts: FirebaseFirestore.DocumentData[] = []

       allproducts.forEach(doc => retproducts.push({...doc.data(), id: doc.id}))

       return retproducts
    }


    public async add(product: IProduct): Promise<void> {
        try {
            
            await productCollection.add(product)
            await comments.add({}, product.published_on)

            return;
        } catch (err) {
            throw err;
        }
    }


    public async update(newProduct: IProduct, id: string): Promise<void> {
        try {
                await productCollection.doc(id).update({...newProduct}) 
                return;

        } catch (err) {
            throw new Error ('product does not exist ');
        } 
    }


    public async delete(id: string): Promise<void> {
        try {
           
            await productCollection.doc(id).delete()
            return;

        } catch (err) {
            throw new Error('product not found');

        }
    }
}

export default Produi;

