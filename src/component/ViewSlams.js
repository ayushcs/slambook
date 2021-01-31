import React from 'react'
import { Link } from 'react-router-dom';
import {Button, CircularProgress} from '@material-ui/core/';
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
            uid: '',
            loader: true,
        }
    }

    componentWillMount() {
        if (window.localStorage.getItem('SLAM_ACCESS_TOKEN') == null) {
            this.props.history.push('/ViewSlamBook/');
        } else{
            try {
                if (this.props.match.params && this.props.match.params.users) {
                    let id = this.props.match.params.users.replace(/users=/,'')
                    if (id) {
                        let uid = atob(id);
                        fire.database().ref(`answers/${uid}`).get().then((res)=>{
                            if (res.val()) {
                                let response = Object.keys(res.val());
                                let names = Object.values(res.val());
                                let data = [];
                                for (let index = 0; index < names.length; index++) {
                                    data[index] = {name : names[index]['answer']['shownName'], key: response[index]};
                                }
                                this.setState({data: data, loader: false, uid});
                            }else{
                                this.setState({data: [],loader:false,uid});
                            }
                        });
                    } else {
                        this.setState({data: [],loader:false});
                    }
                } else{
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

    copyLink(event){
        event.preventDefault();
        var copyText = document.getElementById("shareableLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        this.setState({isCopied:true})
    }
    
    logout() {
        window.localStorage.removeItem('SLAM_ACCESS_TOKEN')
        this.props.history.push('/ViewSlamBook/');
    }

    render() { 
        const {data, loader, isCopied, uid} = this.state;
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div style={{opacity: "0.2", zIndex: "-1"}} className= "position-fixed mainimage"></div>
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <Button className="col-12" onClick={this.logout.bind(this)}>Logout</Button>
                    </div>
                    <div className="table-responsive mt-5 p-1">
                    {(loader)?
                            <div className="m-auto text-center position-absolute" style={{top:"calc(50% - 1em)", left: '40%'}}>
                                <CircularProgress size={100} className="text-center" color="secondary" />
                            </div>
                        :
                        data.length > 0 ?
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="text-capitalize"><Link to={this.props.match.url + "/formid=" + value.key}>{value.name} </Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        : 
                        <div className="row m-0 pt-4">
                            <div className="alert alert-primary">You have not recieved the response yet. Share the link for more responses</div>
                            <div className="px-2">
                                <input type="text" className="form-control" id="shareableLink" readonly={true} value={window.location.origin + "/#/users/id=" + btoa(uid)} />
                            </div>
                            <div className="mt-3">
                                <div className="m-auto col-12">
                                    <Button onClick={this.copyLink.bind(this)} variant="contained" color="primary" className="w-100 mt-2 mb-4 p-2">
                                        <span>{(isCopied) ? "Link Copied": "Copy Link"}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewSlams;
                                    