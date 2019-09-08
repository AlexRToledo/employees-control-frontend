import Axios from 'axios';
import Config from '../../config';
import Storage from '../../helpers/Storage';
const storage = new Storage();

class HttpClient {
    constructor() {
        this.Axios = Axios;
        this.Headers();
        this._apiUrl = Config[Config.mode].api;
        this._staticUrl = Config[Config.mode].static;
    }

    Headers() {
        return {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    }

    HeadersFile() {
        return {'Access-Control-Allow-Origin': '*'}
    }


    async Get (url, params) {
       try {
           return this.Response(await this.Axios.get(this._apiUrl + url, {headers: this.Headers(), params: params}));
       } catch (e) {
           this.Close();
       }
    }

    async Post (url, data) {
        try {
            return this.Response(await this.Axios.post(this._apiUrl + url, data, {headers: this.Headers()}));
        } catch (e) {
            this.Close();
        }
    }

    async Delete (url, data = null) {
        try {
            if(data !== null) {
                return this.Response(await this.Axios.delete(this._apiUrl + url, {data, headers: this.Headers()}));
            } else {
                return this.Response(await this.Axios.delete(this._apiUrl + url, {headers: this.Headers()}));
            }
        } catch (e) {
            this.Close();
        }
    }

    async Put (url, data) {
        try {
            return this.Response(await this.Axios.put(this._apiUrl + url, data, {headers: this.Headers()}));
        } catch (e) {
            this.Close();
        }
    }

    async DataWithFile(url, data) {
        try {
            let formData = new FormData();
            for (let index in data) {
                formData.append(index, data[index]);
            }
            return this.Response(await this.Axios.post(this._apiUrl + url, data, {headers: this.Headers()}));
        } catch (e) {
            return null;
        }

    }

    async Response (response) {
        try {
            switch (response.status) {
                case 200:
                    if (response.data) {
                        return response.data
                    } else {
                        return null;
                    }
                default:
                    this.Close();

            }
        } catch (err) {
            console.log(err)
        }
    }

    Close() {
        storage.Logout();
        return {error: true, message: 'Su cuenta se encuentra deshabilitada.'};
    }
}

export default HttpClient;