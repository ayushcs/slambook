import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core/';
import fire from '../config/fire';


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
            data:[],
        }
    }

    componentWillMount() {
        if (window.localStorage.getItem('SLAM_ACCESS_TOKEN') == null) {
            this.props.history.push('/ViewSlamBook/');
        }else{
            try {
                if (this.props.match.params && this.props.match.params.users) {
                    let id = this.props.match.params.users.replace(/users=/,'')
                    console.log(id)
                    if (id) {
                        let uid = atob(id);
                        fire.database().ref(`users/${uid}`).get().then((res)=>{
                            if (res.val()) {
                                this.setState({data: res.val()});
                            }
                        });
                    }else{
                        this.setState({data: [],loader:false});
                    }
                }else{
                    this.setState({data: [],loader:false});
                } 
            } catch (e) {
                this.setState({data: [],loader:false});
            }
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
        const {data} = this.state;
        console.log({3333:data, 2:typeof data})
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
                                {
                                (data.length) ? data.map((d,i) => {
                                    console.log({d})
                                })
                                :null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewSlams;



// {console.log(d)}
                                    // return (
                                        
                                    //     <tr key={index}>
                                    //         <td>{index + 1}</td>
                                    //         <td><Link to={this.props.match.url + "/formid=" + value.form_id}>{value.users} </Link></td>
                                    //     </tr>
                                        
                                    // )