import React from 'react'
import Button from '@material-ui/core/Button';
import logo from '../image/main_logo.png'
import { Link } from 'react-router-dom';
class FrontPage extends React.Component {
    render() { 
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
                            <Link className="m-auto col-10 col-sm-4" to='/SlambookCreate'>
                                <Button variant="contained" color="primary" className="col-12" >Create SlamBook</Button>
                            </Link>
                        </div>
                        <div className="row mt-3">
                            <Link className="m-auto col-10 col-sm-4" to='/ViewSlamBook'>
                                <Button variant="contained" color="secondary" className="col-12">View SlamBook</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FrontPage;