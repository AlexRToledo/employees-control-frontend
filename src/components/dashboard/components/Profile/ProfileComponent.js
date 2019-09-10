import React from 'react';
import {connect} from 'react-redux';
import IComponent from "../../../../core/IComponent/IComponent";

class ProfileComponent extends IComponent {
    constructor() {
        super();
    }

    async componentDidMount() {
        try {
            
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }    

    render() {
        return (
            <div id={'profile'}>
                <h1 className={'title'}>Profile</h1>
                <div className={'uk-grid'}>
                    <div className={'uk-width-1-1@m uk-margin-bottom'}>                    
                        <h2>{this.props.user.email}</h2>                                
                    </div>                                                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {    
    const {user} = state.auth
    return {
        user
    }
}

export default connect(mapStateToProps)(ProfileComponent);