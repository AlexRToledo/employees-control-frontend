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
            formType: 'create',
            button_disabled: false
        };        
    }

    async componentDidMount() {
        try {
            const { match: {params} } = this.props;
                
            if(params.id) {
                const res = await this.service.GetData(params.id);
                if(res && !res.error) {
                    this.setState({
                        day: new Date(res.data.control.day),
                        users_id: res.data.control.users_id,                        
                        arrivals: this.parseTime(res.data.control.day, res.data.control.arrivals),                        
                        departures: this.parseTime(res.data.control.day, res.data.control.departures),                
                        formType: 'edit',
                        id: params.id
                    });                    
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
            console.log(err)
            this.notify('Ha ocurrido un error.')
        }
    }

    handlerChangeDay(date) {        
        this.setState({
            day: new Date(date)
        });
    }

    handlerChangeTimeArrival(date) {            
        if(new Date(date) < new Date(this.state.departures)) {
            this.toggleButton(false);
            this.setState({
                arrivals: new Date(date)
            });
        } else {
            this.toggleButton(true);
            this.notify('The arrival time cant be major than the departure time.')
        }
    }

    handlerChangeTimeDeparture(date) {    
        if(new Date(date) > new Date(this.state.arrivals)) {
            this.toggleButton(false);
            this.setState({
                departures: new Date(date)
            });
        } else {
            this.toggleButton(true);
            this.notify('The departure time cant be less than the arrival time.')
        }
    }

    toggleButton(value) {
        this.setState({
            button_disabled: value
        })
    }

    parseTime(day, time) {
        var date = new Date(day);
 
        var strs = time.split(":");
        
        date.setHours(strs[0]);
        date.setMinutes(strs[1]);
        date.setSeconds(strs[2]);

        return date;
    }

    handlerSetFields() {
        return (
            <div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Day</label>
                    <DatePicker selected={this.state.day} onChange={this.handlerChangeDay.bind(this)} disabled/>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">User</label>
                    <div className="uk-form-controls">
                        {this.state.formType === "create" ? (
                            <select className="uk-select" id="form-stacked-select" name={'users_id'} value={this.state.users_id} onChange={this.handleFields.bind(this)} required>
                            <option value={''} disabled={true}>Select</option>
                            { this.state.formType === 'create' ? (
                                this.state.users.map((user, key)=> {
                                    return (
                                        <option key={key} value={user.id}>{user.email}</option>
                                    )
                                })
                            ) : (
                                this.state.users.map((user, key)=> {
                                    if(user.id === this.state.users_id) {
                                        return (
                                            <option key={key} value={user.id} defaultValue>{user.email}</option>
                                        )
                                    } else {
                                        return (
                                            <option key={key} value={user.id}>{user.email}</option>
                                        )
                                    }
                                })
                            )}                        
                        </select>
                        ) : (
                            <select className="uk-select" id="form-stacked-select" name={'users_id'} value={this.state.users_id} onChange={this.handleFields.bind(this)} required disabled>
                            <option value={''} disabled={true}>Select</option>
                            { this.state.formType === 'create' ? (
                                this.state.users.map((user, key)=> {
                                    return (
                                        <option key={key} value={user.id}>{user.email}</option>
                                    )
                                })
                            ) : (
                                this.state.users.map((user, key)=> {
                                    if(user.id === this.state.users_id) {
                                        return (
                                            <option key={key} value={user.id} defaultValue>{user.email}</option>
                                        )
                                    } else {
                                        return (
                                            <option key={key} value={user.id}>{user.email}</option>
                                        )
                                    }
                                })
                            )}                        
                        </select>
                        )}
                    </div>
                </div>                
                <div className="uk-margin uk-grid">
                    <div className="uk-width-1-2@s">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Arrival</label>
                        <DatePicker
                            selected={this.state.arrivals}
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
                            selected={this.state.departures}
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
                    <button className={'uk-button uk-button-primary '} type='submit' disabled={this.state.button_disabled}>
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
                    arrivals: this.state.arrivals.toTimeString().split(' ')[0],                    
                    departures: this.state.departures.toTimeString().split(' ')[0],                    
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