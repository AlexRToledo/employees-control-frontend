import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import './App.css';
import NotificationComponent  from './core/utils/NotificationsComponent';
import LoginComponent  from './components/auth/LoginComponent';
import RegisterComponent  from './components/auth/RegisterComponent';
import DashboardComponent  from './components/dashboard/MainComponent';
import ProtectedRoutes from './core/routes/ProtectedRoutes';
import PublicRoutes from './core/routes/PublicRoutes';
import Storage from './helpers/Storage';

import "react-datepicker/dist/react-datepicker.css";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-icons.min.js';
import "@material/snackbar/dist/mdc.snackbar.min.css";
import './assets/css/main.css';

class App extends Component {
    constructor() {
        super();
        this.store = new Storage();
        this.state = {            
            typeNotify: false,        
        };

        this.changeType = this.changeType.bind(this);
    }

    changeType(value) {
        this.setState({
            typeNotify: value
        });
    }

  render() {
        return (
            <Router>
                <main>
                    <NotificationComponent typeNotify={this.state.typeNotify}/>
                    <Switch>
                        <Route path="/login" component={LoginComponent} />
                        <PublicRoutes path="/register" component={RegisterComponent} />
                        <ProtectedRoutes path="/dashboard" component={DashboardComponent} />
                        <PublicRoutes path={'*'}/>
                    </Switch>
                </main>
            </Router>
        );
  }
}

export default App;
