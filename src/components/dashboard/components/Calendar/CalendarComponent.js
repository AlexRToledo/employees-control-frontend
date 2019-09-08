import React from 'react';
import dateFns from "date-fns";
import IComponent from "../../../../core/IComponent/IComponent";
import NotesComponent from './NotesComponent';
import NotesService from "../../../../services/notes/NotesService";
import UIkit from 'uikit';

class CalendarComponent extends IComponent {
    constructor () {
        super();        
        this.nservice = new NotesService();
        this.state = {
            data: [],
            notes: [],
            title: 'Calendario',
            currentMonth: new Date(),
            selectedDate: new Date(),
            loading: true,
            show: false
        };
        this.GetNotesByMonth = this.GetNotesByMonth.bind(this);
    }

    async componentDidMount() {
        await Promise.all([
            this.GetNotificationByMonth(),
            this.GetNotesByMonth()
        ]);
        this.setState({ loading: false })
    }

    async GetNotificationByMonth() {
        try {
            const res = await this.service.GetList(this.state.currentMonth);
            if (res && !res.error) {
                this.setState({
                    data: res.data.notifications
                });
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    async GetNotesByMonth() {
        try {
            const res = await this.nservice.GetCount(this.state.currentMonth);
            if (res && !res.error) {
                this.setState({
                    notes: res.data.notes
                });
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <a className={ 'uk-margin-left' } uk-icon="icon: chevron-left" onClick={ () => this.prevMonth() }>

                    </a>
                </div>
                <div className="col col-center">
                    <span>
                        { dateFns.format(this.state.currentMonth, dateFormat) }
                    </span>
                </div>
                <div className="col col-end">
                    <a className={ 'uk-margin-right' } uk-icon="icon: chevron-right" onClick={ () => this.nextMonth() }></a>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={ i }>
                    { dateFns.format(dateFns.addDays(startDate, i), dateFormat) }
                </div>
            );
        }
        return <div className="days row">{ days }</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                let count_notes = 0;
                let aux = parseInt(formattedDate) > 10 ? formattedDate : '0' + formattedDate;
                days.push(
                    <div
                        className={ `col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }` }
                        key={ day }
                        onClick={ () => { this.onDateClick(dateFns.parse(cloneDay)); this.handlerShowNotes() } }
                    >
                        <span className="number">{ formattedDate }</span>
                        <span className="bg">{ formattedDate }</span>
                        { this.state.notes.map((ele, key) => {
                            if (aux === ele.date.split('T')[ 0 ].split('-')[ 2 ] && dateFns.isSameMonth(day, monthStart)) {
                                count_notes++;
                            }
                        }) }
                        { count_notes > 0 ? (
                            <span className={ 'count-n' } uk-tooltip="title: Total de Notas; pos: top">{ count_notes }</span>
                        ) : (
                                <span className={ 'count-n' } uk-tooltip="title: Total de Notas; pos: top">0</span>
                            ) }
                        { this.state.data.map((ele, key) => {
                            if (aux === ele.createdAt.split('T')[ 0 ].split('-')[ 2 ] && dateFns.isSameMonth(day, monthStart)) {
                                return <span key={ key } className={ 'alert-n' } uk-icon="icon: info" uk-tooltip="title: Notificacion emitida; pos: top"></span>
                            }
                        }) }
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={ day }>
                    { days }
                </div>
            );
            days = [];
        }
        return <div className="body">{ rows }</div>;
    }

    handlerShowNotes(dateFormat) {
        this.setState({
            show: true
        });
        UIkit.offcanvas(document.getElementById('offcanvas-flip-notes')).show();
    }

    onDateClick(day) {
        this.setState({
            selectedDate: day
        });
    }

    async nextMonth() {
        await this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
        await Promise.all([            
            this.GetNotesByMonth()
        ])
    }

    async prevMonth() {
        await this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
        await Promise.all([            
            this.GetNotesByMonth()
        ])
    }

    render() {
        return (
            <section>
                { this.state.loading === true ? (
                    <div className={ 'uk-flex uk-flex-column uk-flex-middle' }>
                        <div uk-spinner="ratio: 4.5"></div>
                        Cargando
                    </div>
                ) : (
                        <div className={ 'content-wrapper' }>
                            <h1 className={ 'title' }>{ this.state.title }</h1>
                            <div className={ "uk-grid uk-flex uk-flex-center" } >
                                <div className={ 'uk-width-1-1@s' }>
                                    <div className="calendar">
                                        { this.renderHeader() }
                                        { this.renderDays() }
                                        { this.renderCells() }
                                    </div>
                                </div>
                            </div>
                            <NotesComponent date={ this.state.selectedDate } show={ this.state.show } reload={ this.GetNotesByMonth }></NotesComponent>
                        </div>
                    ) }
            </section>
        )
    }
}

export default CalendarComponent