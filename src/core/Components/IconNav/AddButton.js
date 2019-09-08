import  React, {Component} from 'react';
import  {Link} from 'react-router-dom';

class AddButton extends Component{
    constructor() {
        super();
    }


    render() {
        return(
            <ul className={'uk-iconnav'}>
                <li><Link to={this.props.link} className={'uk-button uk-button-default'}><span uk-icon="icon: plus"></span> {this.props.title}</Link></li>
            </ul>
        )
    }

}

export default AddButton;