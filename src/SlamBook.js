import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import SlambookCreate from './component/SlambookCreate';
import ViewSlamBook  from './component/ViewSlamBook';
import Button from '@material-ui/core/Button';
import logo from './image/main_logo.png'
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
                    <div className= "col-12 px-0 mainimage">
                    </div>
                    <div className = "position-absolute col-12" style={{top: '40%'}}>
                        <div className="text-center">
                            <img src={logo} width="150px"/>
                        </div>
                        <div className="row mt-3">
                            <Link className="col-12" to='/SlambookCreate'>
                                <Button variant="contained" color="primary" onClick={()=>this.handleButton()} className="mb-2 col-12" >Create SlamBook</Button>
                            </Link>
                            <Link className="col-12" to='/ViewSlamBook'>
                                <Button variant="contained" color="secondary" onClick={()=>this.handleButton()} className="mt-2 col-12">View SlamBook</Button>
                            </Link>
                        </div>
                    </div>
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