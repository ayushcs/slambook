import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SlambookCreate from './component/SlambookCreate';
import ViewSlamBook  from './component/ViewSlamBook';
import FrontPage from './component/FrontPage';
class SlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    

    render() { 
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={FrontPage} />
                    <Route exact path='/SlambookCreate' component={SlambookCreate} />
                    <Route path='/ViewSlamBook' component={ViewSlamBook} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default SlamBook;