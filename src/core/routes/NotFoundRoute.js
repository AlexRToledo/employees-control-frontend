import  React from 'react';
import {Link} from 'react-router-dom';
import IComponent from "../IComponent/IComponent";

class ForbiddenComponent extends IComponent{
    constructor() {
        super();
    }

    render() {
        return(
            <section>
               <h2>Not Found</h2>
                <Link to="/dashboard"></Link>
            </section>
        )
    }

}

export default ForbiddenComponent;