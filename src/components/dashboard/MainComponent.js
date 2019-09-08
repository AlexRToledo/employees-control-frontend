import React from 'react';
import Storage from '../../helpers/Storage';
import IComponent from '../../core/IComponent/IComponent';
import SideMenuComponent from "./layout/SideMenuComponent";
import ContentComponent from "./layout/ContentComponent";

class DashboardComponent extends IComponent{
    constructor(props) {
        super(props);
        this.store = new Storage();
        this.state = {
            typeNotify: false
        };
    }

    render() {
        return (
            <div className={'dashboard'}>
                <div className={'uk-grid uk-flex'}>
                    <SideMenuComponent/>
                    <ContentComponent/>
                </div>
            </div>
        );
    }
}

export default DashboardComponent;