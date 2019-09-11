import React from 'react';
import UsersService from '../../../../services/users/UsersService';
import PaginationComponent from "../../../../core/Components/PaginationComponent";
import CardListComponent from "../../../../core/Components/CardListComponent";
import AddButton from "../../../../core/Components/IconNav/AddButton";
import IComponent from "../../../../core/IComponent/IComponent";
import SearchFormComponent from "../../../../core/Components/SearchFormComponent";

class UsersComponent extends IComponent{
    constructor() {
        super();
        this.service = new UsersService();
        this.state = {
            data: [],
            keys: [
                {field: 'email', label: 'Email', searchable: true}                
            ],
            title: [
                {field: 'username', label: 'Username'},
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
            const res = await this.service.GetList();
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
        this.props.history.push(`/dashboard/users/edit/${id}`)
    }

    async handlerSearch(params) {
        try {
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
                    <h1 className={'title'}>Users List</h1>
                    <div className={"uk-grid"} >
                        <div className={'uk-width-4-5@m'}>
                            <PaginationComponent total={this.state.data.total} page={this.state.data.page} pages={ Math.ceil(this.state.data.total / this.state.data.limit)} setPage={this.changePageLoadData}/>
                            <CardListComponent data={this.state.data.users} data_keys={this.state.keys} data_title={this.state.title} width={'uk-width-1-3@l uk-width-1-2@m uk-width-1-1@s '} card_menu={'nav'} onRemove={this.handlerRemove} onSetEditPage={this.handlerSetEditPage}/>
                            {/*<PaginationComponent total={this.state.data.total} page={this.state.data.page} pages={ Math.ceil(this.state.data.total / this.state.data.limit)} setPage={this.changePageLoadData}/>*/}
                        </div>
                        <div className={'uk-width-1-5@m side-actions'}>
                            <AddButton title={'New'} link={'/dashboard/users/create'}/>
                            <hr/>
                            {/* <SearchFormComponent keys={this.state.keys} setSearch={this.handlerSearch}></SearchFormComponent> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default UsersComponent;