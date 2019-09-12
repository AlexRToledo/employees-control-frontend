import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import IComponent from "../../../../core/IComponent/IComponent";
import UsersService from '../../../../services/users/UsersService';
import FormComponent from "../../../../core/Components/FormComponent";

const service = new UsersService();

class UsersFormComponent extends IComponent{
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            id: '',
            isAdmin: false,
            formType: 'create',
            button_disable: false
        };
    }

    async componentDidMount() {
        try {
            const { match: {params} } = this.props;

            if(params.id) {
                const res = await service.GetData(params.id);
                if(res && !res.error) {
                    this.setState({
                        username: res.data.user.username,
                        email: res.data.user.email,                        
                        formType: 'edit',
                        id: params.id
                    });
                    if (res.data.user.isadmin === true) {
                        this.setState({
                            isAdmin: true
                        });
                    } else {
                        this.setState({
                            isAdmin: false
                        });
                    }
                } else {
                    this.notify(res.message)
                }
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    handlerSetFields() {
        return (
            <div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Name</label>
                    <div className="uk-form-controls">
                        <input ref={'username'} className="uk-input" id="form-stacked-text-name" type="text" name={'username'} value={this.state.username} placeholder="Nombre Completo..." onChange={this.handleFields.bind(this)} required/>
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Email</label>
                    <div className="uk-form-controls">
                        <input ref={'email'} className="uk-input" id="form-stacked-text-email" type="email" name={'email'} value={this.state.email} placeholder="Correo..." onChange={this.handleFields.bind(this)} required/>
                    </div>
                </div>
                { this.state.formType === 'create' &&
                    <div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Password</label>
                            <div className="uk-form-controls">
                                <input ref={'password'} className="uk-input" id="form-stacked-text-pass" type="password" name={'password'} value={this.state.password} placeholder="Contrasenna..." onChange={this.handleFields.bind(this)} required/>
                            </div>
                        </div>                    
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Password Confirm</label>
                            <div className="uk-form-controls">
                                <input ref={'passwordConfirm'} className="uk-input" id="form-stacked-text-pass" type="password" name={'passwordConfirm'} value={this.state.passwordConfirm} placeholder="Contrasenna..." onChange={this.handleFields.bind(this)} required/>
                            </div>
                        </div>
                    </div>
                }
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Role</label>
                    <div className="uk-form-controls">
                        <select className="uk-select" id="form-stacked-select" name={'isAdmin'} value={this.state.isAdmin} onChange={this.handleFields.bind(this)} required>
                            <option value={''} disabled={true}>Select</option>
                            <option key="1" value="false">Usuario</option>
                            <option key="2" value="true">Administrador</option>
                        </select>
                    </div>
                </div>                
                <div className={'uk-flex uk-flex-right'}>
                    <button className={'uk-button uk-button-primary '} type='submit'>
                        {this.state.formType === 'create' ? (
                            <span>Create</span>
                        ) : (
                            <span>Edit</span>
                        )}
                    </button>
                    <Link className={'uk-button uk-button-default uk-margin-left'} to="/dashboard/users">Cancel</Link>
                </div>
            </div>
        )
    }

    async onSubmit(e) {
        try {
            let res;
            e.preventDefault();
            if(e.target.checkValidity()) {
                if(this.setState.password !== this.state.passwordConfirm) {
                    this.notify('Passwords must match.')
                } else {
                    let record = {
                        username: this.state.username,
                        email: this.state.email,
                        isAdmin: this.state.isAdmin                    
                    };
                    if(this.state.formType === 'create') {
                        record.password = this.state.password;
                        record.passwordConfirm = this.state.passwordConfirm;
                        res = await service.Create(record);
                    } else {
                        res = await service.Edit(this.state.id, record);
                    }
    
                    if (res && !res.error) {
                        this.props.history.push('/dashboard/users');
                    } else {
                        if(res.field && res.value) {
                            ReactDOM.findDOMNode(this.refs[res.field] + '_input').addClass('uk-form-danger');
                        }
                    }
                    this.notify(res.message)
                }
            }
        } catch (err) {
            this.notify('An error occur.')
        }
    }

    render() {
        return (
            <section>
                <div className={'content-wrapper'}>
                    <h1 className={'title'}>{this.state.formType === 'create' ? 'New' : 'Edit'} User</h1>
                    <div className={"uk-grid uk-flex uk-flex-center"} >
                        <div className={'uk-width-1-2@s'}>
                            <FormComponent handlerSubmit={this.onSubmit.bind(this)} >
                                {this.handlerSetFields()}
                            </FormComponent>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default UsersFormComponent;