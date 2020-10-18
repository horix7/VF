
export interface IArticle {
    published_on: string;
    head: string;
    body: string;
    category: string;
    made_by: string

}

export class Article implements IArticle {

    public published_on: string;
    public head: string;
    public body: string;
    public category: string;
    public made_by: string;


    constructor(
        nameOrHead?: string | IArticle,
        published_on?: string,
        body?: string,
        category?: string,
        made_by?: string,
    ) {
        if (typeof nameOrHead === 'string' || typeof nameOrHead === 'undefined') {
            this.head = nameOrHead || '';
            this.published_on = published_on || '';
            this.body = body || '';
            this.made_by = made_by || '';
            this.category = category || '';
        } else {
            this.head = nameOrHead.head;
            this.published_on = nameOrHead.published_on;
            this.body = nameOrHead.body;
            this.category = nameOrHead.category;
            this.made_by = nameOrHead.made_by;
        }
    }
}
