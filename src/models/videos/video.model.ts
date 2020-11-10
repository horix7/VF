import { IVideo } from '../../entities/video';
import  db  from '../db/db.connect';
import { IIVideo } from './videos';
import CommentsReviews from '../reviewsAndComments/comments'

const comments = new CommentsReviews()

const VideoCollection  = db.collection('Videos')

class IVideos implements IIVideo {

    /**
     * getOne
     */
    public async getOne( id: string ): Promise<any | null> {
        
        const Video = await VideoCollection.doc(id).get()

        if(Video.exists) return {data: Video.data() , id: Video.id}
        
            return;
    }


    public async getSome(name: string): Promise<any | null> {
     
        const VideoData = await VideoCollection.where("name" , "==" , name).get()
         if(VideoData.empty) return null
         
         const resultz: FirebaseFirestore.DocumentData[]  = []

         VideoData.forEach(doc => resultz.push({...doc.data(), id: doc.id}))


         return resultz
    
    }

    public async getAll(): Promise<any> {
 
       const allVideos = await VideoCollection.get()
       
       const retVideos: FirebaseFirestore.DocumentData[] = []

       allVideos.forEach(doc => retVideos.push({...doc.data(), id: doc.id}))

       return retVideos
    }


    public async add(Video: IVideo): Promise<void> {
        try {
            
            await VideoCollection.add(Video)
            await comments.add({}, Video.published_on)

            return;
        } catch (err) {
            throw err;
        }
    }


    public async update(newVideo: IVideo, id: string): Promise<void> {
        try {
                await VideoCollection.doc(id).update({...newVideo}) 
                return;

        } catch (err) {
            throw new Error ('video does not exist ');
        } 
    }


    public async delete(id: string): Promise<void> {
        try {
           
            await VideoCollection.doc(id).delete()
            return;

        } catch (err) {
            throw new Error('product not found');

        }
    }
}

export default IVideos;

