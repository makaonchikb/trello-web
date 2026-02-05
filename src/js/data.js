export const data = [];

export class Todo {
    constructor(title, text, user, color) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.description = text;
        this.user = user;
        this.status = 'todo';
        this.createDate = new Date();
        this.color = color;
    }
}