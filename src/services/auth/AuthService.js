import HttpClient from '../../core/HttpClient/HttpClient';
class AuthService extends HttpClient {
    constructor() {
        super();
        this.url = '/auth'
    }

    async Login(data) {
        try {
            return await this.Post(`${this.url}/login`, data);
        } catch (err) {
            return null
        }
    }

    async Register(data) {
        try {
            return await this.Post(`${this.url}/register`, data);
        } catch (err) {
            return null
        }
    }
}

export default  AuthService