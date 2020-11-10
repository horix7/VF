import  db  from '../db/db.connect';


const productCollection  = db.collection('orders')

class Produi  {

    /**
     * getOne 
     */
    public async getOne( id: string ): Promise<any | null> {
        
        const product = await productCollection.doc(id).get()

        if(product.exists) return {data: product.data(), id: product.id}
        
            return;
    }


    public async getAll(): Promise<any> {
 
       const allproducts = await productCollection.get()
       
       const retproducts: FirebaseFirestore.DocumentData[] = []

       allproducts.forEach(doc => retproducts.push({...doc.data(), id: doc.id}))

       return retproducts
    }


    public async add(product: any): Promise<void> {
        try {
            
            await productCollection.add(product)

            return;
        } catch (err) {
            throw err;
        }
    }


    public async update(newProduct: any, id: string): Promise<void> {
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

