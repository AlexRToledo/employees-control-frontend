class Storage {
    constructor() {
        if(!localStorage.getItem('token') && !localStorage.getItem('token')) {
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
            localStorage.setItem('expire', '');
        }

        if(!localStorage.getItem('colors')) {
            let colors = {
                    top: "",
                    tfont: "",
                    side: "",
                    sfont: ""
            };
            localStorage.setItem('colors', JSON.stringify(colors));
        }
    }

    SetToken(token) {
        try {
            localStorage.setItem('token', token);
        } catch (err) {
            return null;
        }
    }

    GetToken() {
        try {
            return localStorage.getItem('token')
        } catch (err) {
            return null;
        }
    }

    SetUser(user) {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            return null;
        }
    }

    GetUser() {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (err) {
            return null
        }
    }

    SetExpire() {
        try {
            let expires = new Date();
            expires.setHours(expires.getHours() + 24);
            expires.setMinutes(expires.getMinutes() - 1);
            localStorage.setItem('expire', expires.getTime().toString())
        } catch (err) {

        }
    }

    GetExpire() {
        try {
            return localStorage.getItem('expire')
        } catch (err) {
            return null;
        }
    }

    SetRedirectRoute(path) {
        try {
            localStorage.setItem('redirect', path);
        } catch (err) {
            return null;
        }
    }

    GetRedirectRoute() {
        try {
            return localStorage.getItem('redirect');
        } catch (err) {
            return null;
        }
    }

    AuthVerify() {
        try {
            const expire = new Date(Number(this.GetExpire('expire')));
            const now = new Date();

            if(this.GetToken() !== "" && this.GetUser() !== "" && expire > now) {
                return true
            }
            return false;
        } catch (err) {
            return null;
        }
    }

    Logout() {
        try {
            this.ClearData();
        } catch (err) {

        }
    }

    GetColors() {
        try {
            let theme = JSON.parse(localStorage.getItem('colors'));
            return theme;
        } catch(err) {
            console.log(err)
        }
    }

    SetColor(color) {
        try {
            localStorage.setItem('colors', JSON.stringify(color))
        } catch (err) {

        }
    }

    ClearData() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expire');
        } catch (err) {

        }
    }
}

export default Storage;