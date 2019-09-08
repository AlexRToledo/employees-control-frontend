import NotificationsComponent from "../utils/NotificationsComponent";
import Json from "../utils/Json";
import  {Component} from 'react';

class IComponent extends Component{
    constructor() {
        super();
        this.Notifications = new NotificationsComponent();
        this.Json = new Json();
    }

    notify(message, value = false) {
        try {
            this.Notifications.Show(message);
        } catch (err) {
            console.log(err)
        }
    }

    handleFields(event) {
        const target = event.target;
        let value = '';
        switch (target.type) {
            case 'checkbox':
                value = target.checked;
                break;
            case 'file':
                value = target.files[0];
                break;
            default:
                value = target.value;
                break;
        }
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

}

export default IComponent;