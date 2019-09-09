import Storage from '../../helpers/Storage';
const store = new Storage();

const expire = new Date(Number(store.GetExpire('expire')));
const now = new Date(),
  initialState = {
    auth: false,
    user: {},
    redirect: ''
};

if(store.GetToken() !== "" && store.GetUser() !== "" && expire > now) {
    initialState.auth = true;
    initialState.user = store.GetUser();
    initialState.user = store.GetRedirectRoute();
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      store.SetUser(action.data.user);
      store.SetToken(action.data.token);
      store.SetExpire();
      return {
        auth: true,
        user: action.data.user
      };      
    case "LOGOUT":
        store.Logout();
        return {
          auth: false,
          user: {}
        };  
    default:
      return state
  }
}
