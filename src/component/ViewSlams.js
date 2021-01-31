import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core/';


class ViewSlams extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalusers : [{
                users: 'Ayush',
                form_id: 'someUniqueId',
            }, {
                users: 'Nihal',
                form_id: 'someUniqueId2',
            }],
        }
    }

    componentWillMount() {
        if (window.localStorage.getItem('SLAM_ACCESS_TOKEN') == null) {
            this.props.history.push('/ViewSlamBook/');
        }
        // let totallist;
        // fire.database().ref('users').on('value', (snapshot) => {
        //     totallist = snapshot.val();
        // });
    }

    logout() {
        window.localStorage.removeItem('SLAM_ACCESS_TOKEN')
        this.props.history.push('/ViewSlamBook/');
    }

    render() { 
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div style={{opacity: "0.2"}} className= "position-fixed mainimage"></div>
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <Button className="col-12" onClick={this.logout.bind(this)}>Logout</Button>
                    </div>
                    <div className="table-responsive mt-5 p-1">
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.totalusers.map ((value, index)=> {
                                    return (
                                        
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link to={this.props.match.url + "/formid=" + value.form_id}>{value.users} </Link></td>
                                        </tr>
                                        
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewSlams;