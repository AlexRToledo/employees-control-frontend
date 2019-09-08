import HttpClient from '../../core/HttpClient/HttpClient';
class NotesService extends HttpClient {
    constructor() {
        super();
        this.url = '/notes'
    }

    async GetCount(date) {
        try {
            return await this.Get(`${this.url}/count?date=${date}`);
        } catch (err) {
            return null
        }
    }

    async GetList(date) {
        try {
            return await this.Get(`${this.url}?date=${date}`);
        } catch (err) {
            return null
        }
    }

    async Create(data) {
        try {
            return await this.Post(`${this.url}/create`, data);
        } catch (err) {
            return null
        }
    }

    async Edit(id, data) {
        try {
            return await this.Put(`${this.url}/edit/${id}`, data);
        } catch (err) {
            return null
        }
    }

    async Remove(id) {
        try {
            return await this.Delete(`${this.url}/remove`, {_id: id})
        } catch (err) {
            return null;
        }
    }
}

export default NotesService;