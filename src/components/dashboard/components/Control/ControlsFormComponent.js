import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker  from 'react-datepicker'
import {Link} from 'react-router-dom';
import IComponent from "../../../../core/IComponent/IComponent";
import UsersService from '../../../../services/users/UsersService';
import ControlsService from '../../../../services/controls/ControlsService';
import FormComponent from "../../../../core/Components/FormComponent";

class ControlsFormComponent extends IComponent{
    constructor() {
        super();
        this.service = new ControlsService();
        this.userService = new UsersService();
        this.state = {
            users: [],
            day: new Date(),
            users_id: "",
            arrivals: new Date(),
            departures: new Date(),
            id: '',
            isAdmin: false,
            formType: 'create'
        };        
    }

    async componentDidMount() {
        try {
            const { match: {params} } = this.props;

            if(params.id) {
                const res = await this.service.GetData(params.id);
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

            const res = await this.userService.GetList(1, {all: true});
            if(res && !res.error) {
                this.setState({users: res.data.users});
            } else {
                this.notify(res.message)
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    handlerChangeDay(date) {        
        this.setState({
            day: date
        });
    }

    handlerChangeTimeArrival(date) {
        console.log(date)
        this.setState({
            arrivals: date
        });
    }

    handlerChangeTimeDeparture(date) {
        console.log(date)
        this.setState({
            departures: date
        });
    }

    handlerSetFields() {
        return (
            <div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Day</label>
                    <DatePicker selected={this.state.day} onChange={this.handlerChangeDay.bind(this)} />
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">User</label>
                    <div className="uk-form-controls">
                        <select className="uk-select" id="form-stacked-select" name={'users_id'} value={this.state.users_id} onChange={this.handleFields.bind(this)} required>
                            <option value={''} disabled={true}>Select</option>
                            {
                                this.state.users.map((user, key)=> {
                                    return (
                                        <option key={key} value={user.id}>{user.email}</option>
                                    )
                                })
                            }                        
                        </select>
                    </div>
                </div>                
                <div className="uk-margin uk-grid">
                    <div className="uk-width-1-2@s">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Arrival</label>
                        <DatePicker
                            selected={this.state.day}
                            onChange={this.handlerChangeTimeArrival.bind(this)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                        />
                    </div>
                    <div className="uk-width-1-2@s">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Departure</label>
                        <DatePicker
                            selected={this.state.day}
                            onChange={this.handlerChangeTimeDeparture.bind(this)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                        />
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
                    <Link className={'uk-button uk-button-default uk-margin-left'} to="/dashboard/controls">Cancel</Link>
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
                    day: this.state.day,
                    users_id: this.state.users_id,
                    arrivals: this.state.arrivals,                    
                    departures: this.state.departures,                    
                };
                if(this.state.formType === 'create') {                   
                    res = await this.service.Create(record);
                } else {
                    res = await this.service.Edit(this.state.id, record);
                }

                if (res && !res.error) {
                    this.props.history.push('/dashboard/controls');
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
                    <h1 className={'title'}>{this.state.formType === 'create' ? 'New' : 'Edit'} Control</h1>
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

export default ControlsFormComponent;