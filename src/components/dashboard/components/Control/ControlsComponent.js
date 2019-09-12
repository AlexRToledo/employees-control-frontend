import React from 'react';
import {connect} from 'react-redux';
import ControlsService from '../../../../services/controls/ControlsService';
import PaginationComponent from "../../../../core/Components/PaginationComponent";
import TableListComponent from "../../../../core/Components/TableListComponent";
import AddButton from "../../../../core/Components/IconNav/AddButton";
import IComponent from "../../../../core/IComponent/IComponent";
import SearchFormComponent from "../../../../core/Components/SearchFormComponent";

class ControlsComponent extends IComponent{
    constructor() {
        super();
        this.service = new ControlsService();        
        this.state = {
            data: [],
            users: [],
            keys: [                                                            
                {field: 'day', label: 'Date', date: true, searchable: true},
                {field: 'arrivals', label: 'Arrival'},                                               
                {field: 'departures', label: 'Departure'},                                               
            ],            
            params: null
        };

        this.changePageLoadData = this.changePageLoadData.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerSetEditPage = this.handlerSetEditPage.bind(this);
        this.handlerSearch = this.handlerSearch.bind(this);
    }

    async componentDidMount() {        
        try {                                   
            const res = await this.service.GetList(0, this.props.user.perm == 'isuser' ? {email: this.props.user.email} : {});
            if(res && !res.error) {            
                this.setState({data: res.data});
                if(this.props.user.perm == 'isadmin') {
                    let aux = this.state.keys;
                    aux.push({field: 'email', label: 'Email'})
                    this.setState({
                        keys: aux
                    })
                }
            } else {
                this.notify(res.message)
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }       
    }   

    async changePageLoadData(page=0) {
        try {
            const res = await this.service.GetList(page, this.state.params);
            if(res && !res.error) {
                this.setState({
                    data: res.data
                });
            } else {
                this.notify(res.message)
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    async handlerRemove(id) {
        try {
            const res = await this.service.Remove(id);
            if(res && !res.error) {
                this.notify(res.message);
                this.changePageLoadData();
            } else {
                this.notify(res.message)
            }
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    handlerSetEditPage(id) {
        this.props.history.push(`/dashboard/controls/edit/${id}`)
    }

    async handlerSearch(params) {
        try {
            if(this.props.user.perm === 'isuser') {
                params.email = this.props.user.email
            }
            await this.setState({params: params});
            await this.changePageLoadData();
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    render() {
        return (
            <section>
                <div className={'content-wrapper'}>
                    <h1 className={'title'}>Controls List</h1>
                    <div className={"uk-grid"} >
                        <div className={'uk-width-4-5@m'}>
                            <PaginationComponent total={this.state.data.total} page={this.state.data.page} pages={ Math.ceil(this.state.data.total / this.state.data.limit)} setPage={this.changePageLoadData}/>
                            { this.props.user.perm !== "isuser" ? (
                                    <TableListComponent data={this.state.data.controls} data_keys={this.state.keys} data_title={this.state.title} width={'uk-width-1-3@l uk-width-1-2@m uk-width-1-1@s '} card_menu={'nav'} onRemove={this.handlerRemove} onSetEditPage={this.handlerSetEditPage}/>
                                ) : (
                                    <TableListComponent data={this.state.data.controls} data_keys={this.state.keys} data_title={this.state.title} width={'uk-width-1-3@l uk-width-1-2@m uk-width-1-1@s '} card_menu={'nav'}/>
                                )
                            }
                            {/*<PaginationComponent total={this.state.data.total} page={this.state.data.page} pages={ Math.ceil(this.state.data.total / this.state.data.limit)} setPage={this.changePageLoadData}/>*/}
                        </div>
                        <div className={'uk-width-1-5@m side-actions'}>
                            {this.props.user.perm !== "isuser" &&
                                <div>
                                    <AddButton title={'New'} link={'/dashboard/controls/create'}/>
                                    <hr/>
                                </div>
                            }                            
                            {/* <SearchFormComponent keys={this.state.keys} setSearch={this.handlerSearch}></SearchFormComponent> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {    
    const {user} = state.auth
    return {
        user
    }
}

export default connect(mapStateToProps)(ControlsComponent);