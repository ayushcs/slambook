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

    componentDidMount() {
        if (window.localStorage.getItem('SLAM_ACCESS_TOKEN')) {
            this.props.history.push('/ViewSlamBook/viewlist/users=' + window.localStorage.getItem('SLAM_ACCESS_TOKEN'));
        }
    }

    login(event) {
        event.preventDefault();
        let uName = document.getElementById('uName').value;
        let pwd = document.getElementById('pwd').value;

        if (uName.trim() == '' || pwd.trim() == '') {
            this.setState({error: "Username and Password can't be blank."})
        } else {
            let uid = uName.toLowerCase() + '||' + pwd;
            fire.database().ref('users/'+ uid).once('value', (snapshot) => {
                if (snapshot.val()) {
                    window.localStorage.setItem('SLAM_ACCESS_TOKEN', btoa(uid));
                    let path = '/ViewSlamBook/viewlist/users=' + btoa(uid);
                    this.props.history.push(path);
                } else {
                    this.setState({error: "Username or Password is wrong."})
                }
            });
        }
    }


    hideError () {
        if (this.state.error) {
            this.setState({error: null});
        }
    }

    home() {
        this.props.history.push('/');
    }

    render() { 
        const {error} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div style={{opacity: "0.5"}} className= "position-fixed mainimage"></div>
                    {(error) ?
                        <div class="alert px-2 alert-danger alert-dismissible fade show" role="alert">
                            <span>{error}</span>
                        </div>
                    : null}
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
                                    onChange = {() => {this.hideError()}}
                                    className="w-100"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <TextField
                                    required
                                    id="pwd"
                                    label="Your Secret Code"
                                    variant="filled"
                                    type="text"
                                    onChange = {() => {this.hideError()}}
                                    className="w-100"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <Button onClick={this.login.bind(this)} variant="contained" color="secondary" className="col-12">Login</Button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="m-auto col-10 col-sm-4">
                                <Button onClick={this.home.bind(this)} variant="contained" color="primary" className="col-12">Go Back</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewSlamBook;