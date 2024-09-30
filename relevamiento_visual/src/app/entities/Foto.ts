export class Foto{
    id: string;
    url: string;
    user: string;
    type: string;
    date: string;
    votes: string[];
    constructor(id: string, url: string, user: string, type: string, date: string, votes: string[]){
        this.id = id;
        this.url = url;
        this.user = user;
        this.type = type;
        this.date = date;
        this.votes = votes;
    }
}