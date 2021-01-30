import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SlambookCreate from './component/SlambookCreate';
import ViewSlamBook  from './component/ViewSlamBook';
import FrontPage from './component/FrontPage';
import FillSlamBook from './component/FillSlamBook';
import ViewSlams from './component/ViewSlams';
import ViewForm from './component/ViewForm';


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
                    <Route exact path='/ViewSlamBook' component={ViewSlamBook} />
                    <Route exact path="/users/:id" component={FillSlamBook} />
                    <Route exact path="/ViewSlamBook/viewlist/:users" component={ViewSlams} />
                    <Route exact path="/ViewSlamBook/viewlist/:users/:formid" component={ViewForm} />

                </Switch>
            </React.Fragment>
        );
    }
}

export default SlamBook;