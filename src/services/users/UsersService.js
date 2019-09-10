import HttpClient from '../../core/HttpClient/HttpClient';
class UsersService extends HttpClient {
    constructor() {
        super();
        this.url = '/users'
    }

    async GetList(page=1, params=null) {
        try {
            return await this.Get(`${this.url}?page=${page}`, params);
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
            return await this.Delete(`${this.url}/remove`, {id: id})
        } catch (err) {
            return null;
        }
    }

    async GetData(id) {
        try {
            return await this.Get(`${this.url}/${id}`)
        } catch (err) {
            return null;
        }
    }
}

export default UsersService;