import React from 'react'
import {TextField, Button} from '@material-ui/core/';
import fire from '../config/fire'

class ViewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    'someUniqueId' : [{
                        id: 0,
                        question: "My name in your phone_______ ?",
                        answer: 'Ayush'
                    },
                    {
                        id: 1,
                        question: "My name in your phone_______ ?",
                        answer: 'Aking'
                    }]
                },
                {
                    'someUniqueId2' : [{
                        id: 0,
                        question: "My name in your phone_______ ?",
                        answer: 'Nihal'
                    },
                    {
                        id: 1,
                        question: "My name in your phone_______ ?",
                        answer: 'Abhishek'
                    }]
                }
            ],
            curData:'someUniqueId'
        }
    }

    componentWillMount(){
        try {
            console.log(this.props.match.params)
            if (this.props.match.params) {
                let users = atob(this.props.match.params.users.replace(/users=/,''));
                let formID = this.props.match.params.formid.replace(/formid=/,'');
                console.log({users,formID});
                let data = [];
                if (users && formID) {
                    fire.database().ref(`answers/${users}/${formID}/answer`).get().then((snapshot) => {
                        if (snapshot.val()) {
                            let response = snapshot.val();
                            data.push(response)
                        }
                    });
                    fire.database().ref(`users/${users}/question`).get().then((snapshot) => {
                        if (snapshot.val()) {
                            let response = snapshot.val();
                            data.push(response)
                        }
                    });
                    console.log({data})
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

    componentDidMount() {
        try {
            let curData;
            if (this.props.match.params.formid) {
                curData = this.props.match.params.formid.split('=')[1];
                this.setState({curData: curData});
            }
        } catch (e) {

        }
    }

    render() { 
        return ( 
            
            <div className="container-fluid">
                {this.state.curData != '' ?
                    <div>
                        <div className="row">
                            <div className="col-12 px-0 position-fixed text-center toplabel">
                                <Button className="col-12">Create Your Own SlamBook Now</Button>
                            </div>
                            <div className="mainimage position-fixed" style={{opacity: "0.2"}}></div>
                        </div>
                        <div className="row mt-3 pt-4">
                            <div className="col-12">
                                {/* {this.state.data.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <div key={"q_" + index} className="row mt-2">
                                                    <div key={"q_t" + index} className="col-12 questions">
                                                        {(index+ 1) + ') ' + value[this.state.curData].question}
                                                    </div>
                                                </div>
                                                <div key={"a" + index} className="row">
                                                    <div key={"a_t" + index} className="col-12">
                                                        <TextField id={"question"+ value[this.state.curData].id} label="Your Answer" data-id={value[this.state.curData].id}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })} */}
                            </div>
                            <div className="row mt-4 mb-3">
                                <div className="m-auto col-10 col-sm-4">
                                    <Button variant="contained" color="secondary" className="col-12">Submit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}
 
export default ViewForm;