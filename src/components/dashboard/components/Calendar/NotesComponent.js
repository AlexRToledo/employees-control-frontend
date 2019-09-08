import React from 'react';
import IComponent from "../../../../core/IComponent/IComponent";
import NotesService from '../../../../services/notes/NotesService';
import FormComponent from '../../../../core/Components/FormComponent';
import DatePicker from "react-datepicker";
import { CirclePicker } from 'react-color';

class NotesComponent extends IComponent {
    constructor() {
        super();
        this.service = new NotesService();
        this.state = {
            data: [],
            text: '',
            color: '#f44336',
            edit: false,
            id: '',
            timer: null
        };
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerEraseData = this.handlerEraseData.bind(this);
    }

    async Load() {
        try {
            const res = await this.service.GetList(this.props.date);
            if(res && !res.error) {
                this.setState({
                    data: res.data.notes,
                    text: '',
                    color: '#f44336',
                    id: '',
                    edit: false,
                });
            }
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    async componentDidUpdate(prevProps) {
        try {
            if(this.props.date !== prevProps.date) {
                if(this.props.show) {
                    await this.Load();
                }
            }
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    handleChangeComplete(color, event) {
        this.setState({
            color: color.hex
        })
    }

    handleChange(date) {
        this.setState({
            timer: date
        });
    }

    FormFields() {
        return (
            <div>
                <div className={'uk-margin'}>
                    <label className="uk-form-label" htmlFor="form-stacked-text">Nota</label>
                    <div className="uk-form-controls">
                        <textarea className="uk-textarea" name={'text'} value={this.state.text} placeholder="Agregue nota..." onChange={this.handleFields.bind(this)} required={true}></textarea>
                    </div>
                </div>
                <div className={'uk-margin'}>
                    <label className="uk-form-label" htmlFor="form-stacked-text">Color</label>
                    <CirclePicker colors={["#f44336", "#4caf50", "#2196f3", "#009688", "#9c27b0", "#ffc107"]}
                                  color={ this.state.color }
                                  onChangeComplete={ this.handleChangeComplete }>
                    </CirclePicker>
                </div>
                <div className={'uk-margin'}>
                    <label className="uk-form-label" htmlFor="form-stacked-text">Tiempo</label>
                    <div className="uk-form-controls">
                        <DatePicker placeholderText="Click si asignar tiempo"
                                    selected={this.state.timer}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="hh:mm aa"
                                    timeCaption="Tiempo"
                        />
                    </div>
                </div>
                <div className={'uk-flex uk-flex-center uk-margin'}>
                    <button className={'uk-button uk-button-primary uk-margin-right'} type='submit'>
                        <span>Guardar</span>
                    </button>
                    {this.state.edit === true &&
                        <button type='button' onClick={this.handlerEraseData} className={'uk-button uk-button-primary'}>
                            <span>Cancelar</span>
                        </button>
                    }
                </div>
            </div>
        )
    }

    handlerEraseData() {
        this.setState({
            text: '',
            color: '#f44336',
            id: '',
            edit: false,
            timer: null
        });
    }

    async handlerEdit(ele) {
        this.setState({
           text: ele.text,
           color: ele.color,
           id: ele._id,
           edit: true,
           timer: null
        });
    }

    async handlerRemove(id) {
        try {
            const res = await this.service.Remove(id);
            if(res && !res.error) {
                await this.Load();
                this.props.reload();
            }
            this.notify(res.message);
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    async Create() {
        try {
            const data = {
                color: this.state.color,
                text: this.state.text,
                date: this.props.date,
                timer: this.state.timer
            };
            console.log(data.timer);
            const res = await this.service.Create(data);
            if(res && !res.error) {
                await this.Load();
                this.props.reload();
            }
            this.notify(res.message);
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    async Edit() {
        try {
            const res = await this.service.Edit(this.state.id, {color: this.state.color, text: this.state.text});
            if(res && !res.error) {
                this.Load();
            }
            this.notify(res.message);
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    async handlerSubmit(e) {
        try {
            e.preventDefault();
            if(e.target.checkValidity()) {
                if(this.state.edit === false) {
                    await this.Create();
                } else {
                    await this.Edit();
                }
            }
        } catch (err) {
            this.notify('Ha ocurrido un error');
        }
    }

    parseDate(date) {
        return new Date(date).getUTCHours() + ':' + new Date(date).getUTCMinutes()
    }


    render() {
        return(
            <div id="offcanvas-flip-notes" uk-offcanvas="flip: true; overlay: true">
                <div className="uk-offcanvas-bar">

                    <a className="uk-offcanvas-close uk-close" type="button" >
                        <span uk-icon="icon: close"></span>
                    </a>
                    <h3>Notas</h3>

                    <FormComponent nocard={false} handlerSubmit={this.handlerSubmit.bind(this)}>
                        {this.FormFields()}
                    </FormComponent>
                    <hr/>
                    {this.state.data.map((ele, key)=> {
                        return <div key={key} className={'uk-card uk-card-default uk-card-body uk-margin'} style={{'borderLeft': '5px solid' + ele.color}}>
                            <div className={'top-actions'}>
                                <span onClick={() => this.handlerEdit(ele)} className={'uk-margin-small-right'} uk-icon="icon: file-edit;" uk-tooltip="title: Editar; pos: top"></span>
                                <span onClick={() => this.handlerRemove(ele._id)} uk-icon="icon: trash;" uk-tooltip="title: Eliminar; pos: top"></span>
                            </div>
                            <span>{ele.text}</span>
                            <hr/>
                            <span>{this.parseDate(ele.timer)}</span>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default NotesComponent;