import  db  from '../db/db.connect';
const articleCollection  = db.collection('reviewz')

class CommentsReviews {


    public async getOne( id: string ): Promise<any | null> {
        
        const Article = await articleCollection.doc(id).get()

        if(Article.exists) return {data: Article.data() , id: Article.id}
        else {
                this.add({}, id)
            }
    }



    public async add(article: any, id: string): Promise<void> {
        try {


            await articleCollection.doc(id).create(article)

            return;
        } catch (err) {
            throw err;
        }
    }


    public async addMore(article: any, id: string): Promise<void> {
        try {        

            await articleCollection.doc(id).update(article)
            return;

        } catch (err) {
           this.add({}, id)
        }
    }

}

export default CommentsReviews;

