import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IComponent from '../../../core/IComponent/IComponent'
import UsersComponent from "../components/Users/UsersComponent";
import UsersFormComponent from "../components/Users/UsersFormComponent";
import TopMenuComponent from "../layout/TopMenuComponent";
import ControlsComponent from "../components/Control/ControlsComponent";
import ControlsFormComponent from "../components/Control/ControlsFormComponent";
import ProfileComponent from "../components/Profile/ProfileComponent";

import AdminAccessRoutes from "../../../core/routes/AdminAccessRoutes";
import ForbiddenRoute from "../../../core/routes/ForbiddenRoute";
import NotFoundRoute from "../../../core/routes/NotFoundRoute";


class ContentComponent extends IComponent{
    render() {
        return (
            <section id={'content'} className={'uk-width-4-5@m'}>
                <TopMenuComponent/>
                <div className={'content-wrapper'}>
                    <Switch>                                       
                        <Route exact path="/dashboard/forbidden" component={ForbiddenRoute}/>
                        <Route exact path="/dashboard/controls" component={ControlsComponent}/>
                        <Route exact path="/dashboard/profile" component={ProfileComponent}/>
                        <AdminAccessRoutes exact path="/dashboard/controls/create" component={ControlsFormComponent}/>
                        <AdminAccessRoutes exact path="/dashboard/controls/edit/:id" component={ControlsFormComponent}/> 
                        <AdminAccessRoutes exact path="/dashboard/users" component={UsersComponent}/>
                        <AdminAccessRoutes exact path="/dashboard/users/create" component={UsersFormComponent}/>
                        <AdminAccessRoutes exact path="/dashboard/users/edit/:id" component={UsersFormComponent}/>                                                
                        <Route component={NotFoundRoute}/>
                    </Switch>
                </div>
            </section>
        );
    }
}

export default ContentComponent;