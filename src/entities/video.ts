
export interface IVideo {
    published_on: string;
    head: string;
    video: string;
    category: string;
    made_by: string

}

export class Video implements IVideo {

    public published_on: string;
    public head: string;
    public video: string;
    public category: string;
    public made_by: string;


    constructor(
        nameOrHead?: string | IVideo,
        published_on?: string,
        video?: string,
        category?: string,
        made_by?: string,
        id?: number,
    ) {
        if (typeof nameOrHead === 'string' || typeof nameOrHead === 'undefined') {
            this.head = nameOrHead || '';
            this.published_on = published_on || '';
            this.video = video || '';
            this.made_by = made_by || '';
            this.category = category || '';
        } else {
            this.head = nameOrHead.head;
            this.published_on = nameOrHead.published_on;
            this.video = nameOrHead.video;
            this.category = nameOrHead.category;
            this.made_by = nameOrHead.made_by;
        }
    }
}
