import React from 'react';
import { Switch } from 'react-router-dom';
import IComponent from '../../../core/IComponent/IComponent'
import UsersComponent from "../components/Users/UsersComponent";
import ProtectedRoutes from "../../../core/routes/ProtectedRoutes";
import UsersFormComponent from "../components/Users/UsersFormComponent";
import TopMenuComponent from "../layout/TopMenuComponent";
import ControlsComponent from "../components/Control/ControlsComponent";
import ControlsFormComponent from "../components/Control/ControlsFormComponent";
import ProfileComponent from "../components/Profile/ProfileComponent";


class ContentComponent extends IComponent{
    render() {
        return (
            <section id={'content'} className={'uk-width-4-5@m'}>
                <TopMenuComponent/>
                <div className={'content-wrapper'}>
                    <Switch>                                            
                        <ProtectedRoutes exact path="/dashboard/controls" component={ControlsComponent}/>
                        <ProtectedRoutes exact path="/dashboard/controls/create" component={ControlsFormComponent}/>
                        <ProtectedRoutes exact path="/dashboard/controls/edit/:id" component={ControlsFormComponent}/> 
                        <ProtectedRoutes exact path="/dashboard/users" component={UsersComponent}/>
                        <ProtectedRoutes exact path="/dashboard/users/create" component={UsersFormComponent}/>
                        <ProtectedRoutes exact path="/dashboard/users/edit/:id" component={UsersFormComponent}/>                        
                        <ProtectedRoutes exact path="/dashboard/profile" component={ProfileComponent}/>
                    </Switch>
                </div>
            </section>
        );
    }
}

export default ContentComponent;