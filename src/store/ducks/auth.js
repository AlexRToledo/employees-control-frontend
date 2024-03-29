import Storage from '../../helpers/Storage';
const store = new Storage();

const expire = new Date(Number(store.GetExpire('expire')));
const now = new Date(),
  initialState = {
    auth: false,
    user: {},
    users: [],
    redirect: ''
};

if(store.GetToken() !== "" && store.GetUser() !== "" && expire > now) {
    initialState.auth = true;
    initialState.user = store.GetUser();
    initialState.redirect = store.GetRedirectRoute();
}

const LOGIN_SUCCESS = 'control/auth/LOGIN_SUCCESS';
const LOGOUT = 'control/auth/LOGOUT';

export function loginAction (data) {
  return {
    type: LOGIN_SUCCESS, 
    data
  }
};

export function logoutAction () {
  return {
    type: LOGOUT
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      store.SetUser(action.data.user);
      store.SetToken(action.data.token);
      store.SetExpire();
      return {
        auth: true,
        user: action.data.user
      };      
    case LOGOUT:
        store.Logout();
        return {
          auth: false,
          user: {}
        };   
    default:
      return state
  }
}
