import { IArticle } from '@entities/article';
import  db  from '../db/db.connect';
import { IIArticle } from './Content';

const articleCollection  = db.collection('content')

class Articles implements IIArticle {

    /**
     * getOne
     */
    public async getOne( id: string ): Promise<any | null> {
        
        const Article = await articleCollection.doc(id).get()

        if(Article.exists) return {data: Article.data() , id: Article.id}
        
            return;
    }


    public async getSome(name: string): Promise<any | null> {
     
        const ArticleData = await articleCollection.where("name" , "==" , name).get()
         if(ArticleData.empty) return null
         
         const resultz: FirebaseFirestore.DocumentData[]  = []

         ArticleData.forEach(doc => resultz.push({...doc.data(), id: doc.id}))


         return resultz
    
    }

    public async getAll(): Promise<any> {
 
       const allArticles = await articleCollection.get()
       
       const retArticles: FirebaseFirestore.DocumentData[] = []

       allArticles.forEach(doc => retArticles.push({...doc.data(), id: doc.id}))

       return retArticles
    }


    public async add(article: IArticle): Promise<void> {
        try {
            
            await articleCollection.add(article)

            return;
        } catch (err) {
            throw err;
        }
    }


    public async update(newArticle: IArticle, id: string): Promise<void> {
        try {
                await articleCollection.doc(id).update({...newArticle}) 
                return;

        } catch (err) {
            throw new Error ('Article does not exist ');
        } 
    }


    public async delete(id: string): Promise<void> {
        try {
           
            await articleCollection.doc(id).delete()
            return;

        } catch (err) {
            throw new Error('product not found');

        }
    }
}

export default Articles;

