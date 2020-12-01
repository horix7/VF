import  db  from '../db/db.connect';


const productCollection  = db.collection('question')

class Produi  {

    /**
     * getOne 
     */
    public async getOne(): Promise<any | null> {
        
        const product = await productCollection.doc("plans").get()

        if(product.exists) return {data: product.data(), id: product.id}
        
            return;
    }

    public async getOneHome(): Promise<any | null> {
        
        const product = await productCollection.doc("home").get()

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
            
            await productCollection.doc("plans").delete()
            await productCollection.doc("plans").create(product)

            return;
        } catch (err) {

            try {
                await productCollection.doc("plans").update(product)

                 return;
            } catch (error) {
                throw err;   
            }
           
        }
    }

    public async addHomeContent(product: any): Promise<void> {
        try {
            
            await productCollection.doc("home").create(product)

            return;
        } catch (err) {

            try {
                await productCollection.doc("home").update(product)

                 return;
            } catch (error) {
                throw err;   
            }
           
        }
    }


    public async update(newProduct: any): Promise<void> {
        try {
                await productCollection.doc("plans").update({...newProduct}) 
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

