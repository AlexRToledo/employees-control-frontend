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
            status: 'false',
            id: '',
            perm: '',
            formType: 'create'
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
                        status: JSON.stringify(res.data.user.status),
                        formType: 'edit',
                        id: params.id
                    });
                    if (res.data.user.permissions.isUser) {
                        this.setState({
                            perm: 'isUser'
                        });
                    } else {
                        this.setState({
                            perm: 'isAdmin'
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
                    <label className="uk-form-label" htmlFor="form-stacked-text">Nombre</label>
                    <div className="uk-form-controls">
                        <input ref={'username'} className="uk-input" id="form-stacked-text-name" type="text" name={'username'} value={this.state.username} placeholder="Nombre Completo..." onChange={this.handleFields.bind(this)} required/>
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Email</label>
                    <div className="uk-form-controls">
                        <input ref={'password'} className="uk-input" id="form-stacked-text-email" type="email" name={'email'} value={this.state.email} placeholder="Correo..." onChange={this.handleFields.bind(this)} required/>
                    </div>
                </div>
                { this.state.formType === 'create' &&
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Contrasenna</label>
                        <div className="uk-form-controls">
                            <input ref={'email'} className="uk-input" id="form-stacked-text-pass" type="password" name={'password'} value={this.state.password} placeholder="Contrasenna..." onChange={this.handleFields.bind(this)} required/>
                        </div>
                    </div>
                }
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Tipo de Usuario</label>
                    <div className="uk-form-controls">
                        <select className="uk-select" id="form-stacked-select" name={'perm'} value={this.state.perm} onChange={this.handleFields.bind(this)} required>
                            <option value={''} disabled={true}>Seleccione</option>
                            <option key="1" value="isUser">Usuario</option>
                            <option key="2" value="isAdmin">Administrador</option>
                        </select>
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Estado</label>
                    <div className="uk-form-controls uk-form-controls-text">
                        <label><input className="uk-radio" type="radio" name="status" value={'true'} onChange={this.handleFields.bind(this)} checked={this.state.status === 'true' ? true : false}/> Activado</label>
                        <label className={'uk-margin-small-left'}><input className="uk-radio" type="radio" name="status" value={'false'} onChange={this.handleFields.bind(this)} checked={this.state.status === 'false' ? true : false}/> Deshabilitado</label>
                    </div>
                </div>
                <div className={'uk-flex uk-flex-right'}>
                    <button className={'uk-button uk-button-primary '} type='submit'>
                        {this.state.formType === 'create' ? (
                            <span>Crear</span>
                        ) : (
                            <span>Editar</span>
                        )}
                    </button>
                    <Link className={'uk-button uk-button-default uk-margin-left'} to="/dashboard/users">Cancelar</Link>
                </div>
            </div>
        )
    }

    async onSubmit(e) {
        try {
            let res;
            e.preventDefault();
            if(e.target.checkValidity()) {
                let record = {
                    name: this.state.username,
                    email: this.state.email,
                    perm: this.state.perm,
                    status: this.state.status,
                };
                if(this.state.formType === 'create') {
                    record.password = this.state.password;
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
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    render() {
        return (
            <section>
                <div className={'content-wrapper'}>
                    <h1 className={'title'}>{this.state.formType === 'create' ? 'Nuevo' : 'Editar'} Usuario</h1>
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