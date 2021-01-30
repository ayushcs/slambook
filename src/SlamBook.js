import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import SlambookCreate from './component/SlambookCreate';
import ViewSlamBook  from './component/ViewSlamBook';
import Button from '@material-ui/core/Button';

class SlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showWelcomeButton : true,
        }
    }

    handleButton(){
        this.setState({
            showWelcomeButton : !this.state.showWelcomeButton,
        })
    }

    render() { 
        const {showWelcomeButton} = this.state;
        return (
            <React.Fragment>
            <div className="container-fluid">
                {(showWelcomeButton)
                ?
                <div className="row">
                    <Link to='/SlambookCreate'>
                        <Button variant="outlined" onClick={()=>this.handleButton()} className="mb-2" out color="primary">Create SlamBook</Button>
                    </Link>
                    <Link to='/ViewSlamBook'>
                        <Button variant="outlined" onClick={()=>this.handleButton()} className="mt-2" color="secondary">View SlamBook</Button>
                    </Link>
                </div>
                :
                null
                }
            </div>
            <Switch>
                <Route exact path='/SlambookCreate' component={SlambookCreate} />
                <Route path='/ViewSlamBook' component={ViewSlamBook} />
            </Switch>
        </React.Fragment>
        );
    }
}

export default SlamBook;