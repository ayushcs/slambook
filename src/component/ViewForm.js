import React from 'react'
import {TextField, Button, CircularProgress} from '@material-ui/core/';
import fire from '../config/fire'

class ViewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            loader: true
        }
    }

    componentWillMount(){
        try {
            console.log(this.props.match.params)
            if (this.props.match.params) {
                let users = atob(this.props.match.params.users.replace(/users=/,''));
                let formID = this.props.match.params.formid.replace(/formid=/,'');
                let data = [];
                let answers = [];
                if (users && formID) {
                    fire.database().ref(`answers/${users}/${formID}/answer`).get().then((snapshot) => {
                        if (snapshot.val()) {
                            answers = snapshot.val();
                        }
                    });
                    fire.database().ref(`users/${users}/question`).get().then((snapshot) => {
                        if (snapshot.val()) {
                            let response = snapshot.val();
                            
                            for (let index = 0; index < response.length; index++) {
                                response[index]['answers'] = answers[response[index]['id']] ? answers[response[index]['id']] : 'Not Filled';
                            }
                            data = [...response];
                            this.setState({data: data,loader:false});
                        } else {
                            this.setState({data: [],loader:false});
                        }
                    });
                } else{
                    this.setState({data: [],loader:false});
                }
            }else{
                this.setState({data: [],loader:false});
            } 
        } catch (e) {
            this.setState({data: [],loader:false});
        }
    }

    goBack() {
        window.location.href = window.location.origin + window.location.pathname +'#/ViewSlamBook/viewlist/' + this.props.match.params.users;
    }

    render() { 
        const {loader, data} = this.state;
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <Button className="col-12">Answers Filled By the person</Button>
                    </div>
                    <div className="mainimage position-fixed" style={{opacity: "0.2"}}></div>
                </div>
                {(loader)?
                    <div className="m-auto text-center position-absolute" style={{top:"calc(50% - 1em)", left: '40%'}}>
                        <CircularProgress size={100} className="text-center" color="secondary" />
                    </div>
                :
                    data.length > 0 ?  
                        <div className="row mt-3 pt-4">
                            <div className="col-12">
                                {data.map((value, index)=> {
                                    return (
                                        <div key={index}>
                                            <div key={"q_" + index} className="row mt-2">
                                                <div key={"q_t" + index} className="col-12 questions">
                                                    {(index+ 1) + ') ' + value.question}
                                                </div>
                                            </div>
                                            <div key={"a" + index} className="row">
                                                <div key={"a_t" + index} className="col-12">
                                                    <TextField InputProps={{readOnly: true}} name={"ques_"+ value.id} id={"question"+ value.id} defaultValue={value.answers} label="Your Answer"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row mt-4 mb-3">
                                <div className="m-auto col-10 col-sm-4">
                                    <Button variant="contained" onClick={this.goBack.bind(this)}color="secondary" className="col-12">Go Back</Button>
                                </div>
                            </div>
                        </div> 
                    :
                    <div className="row mt-5 m-0 pt-4">
                        <div className="alert alert-danger">There is some issue, Data not found!</div>
                    </div>
                }
            </div>
        );
    }
}

export default ViewForm;