import React from 'react';
import {TextField, Button} from '@material-ui/core/';
import logo from '../image/main_logo.png';
import fire from '../config/fire';
class ViewSlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            error:null,
         }
    }

    login(e){
        let uName = document.getElementById('uName').value;
        let pwd = document.getElementById('pwd').value;

        e.preventDefault();
    }

    render() { 
        const {error} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className= "col-12 px-0 mainimage">
                    </div>
                    <div className = "position-absolute col-12" style={{top: '40%'}}>
                        <div className="text-center">
                            <img src={logo} width="150px" alt="Welcome to the Slambook"/>
                        </div>
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <TextField
                                    required
                                    id="uName"
                                    label="Username"
                                    variant="filled"
                                    type="text"
                                    className="w-100"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <TextField
                                    required
                                    id="pwd"
                                    label="Password"
                                    variant="filled"
                                    type="password"
                                    className="w-100"
                                />
                            </div>
                        </div>
                        {(error)?<span className="row m-auto col-10 mt-3 text-danger">{error}</span>:null}
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <Button onClick={this.login.bind(this)} variant="contained" color="secondary" className="col-12">Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewSlamBook;