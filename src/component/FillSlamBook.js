import React from 'react'
import {TextField, Button, CircularProgress} from '@material-ui/core/';
import fire from '../config/fire'

class FillSlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            loader: true,
            uid: ""
        }
    }

    componentWillMount() {
        try {
            if (this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id.split('=')
                if (id[1]) {
                    let uid = atob(id[1]);
                    fire.database().ref('users/'+ uid).once('value', (snapshot) => {
                        if (snapshot.val()) {
                            let response = snapshot.val();
                            this.setState({data: response.question,loader:false,uid});
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

    setAnswer(e){
        let answers = [];
        let id = e.target.id.replace(/question/g,'');
        let value = e.target.value;
        answers[id] = value;
    }

    handleSubmit(e){
        e.preventDefault();
        // fire.database().ref(`users/${this.state.uid}`).update({
        //     answer:
        // }).then(()=> {
        //     // response generated
        // })
    }

    render() { 
        const {loader} = this.state;
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <Button className="col-12">Create Your Own SlamBook Now</Button>
                    </div>
                    <div className="mainimage position-fixed" style={{opacity: "0.2"}}></div>
                </div>
                {(loader)?
                    <div className="m-auto text-center position-absolute" style={{top:"calc(50% - 1em)", left: '40%'}}>
                        <CircularProgress size={100} className="text-center" color="secondary" />
                    </div>
                :
                    this.state.data.length > 0 ?  
                    <form>
                        <div className="row mt-3 pt-4">
                            <div className="col-12">
                                {this.state.data.map((value, index)=> {
                                    return (
                                        <div key={index}>
                                            <div key={"q_" + index} className="row mt-2">
                                                <div key={"q_t" + index} className="col-12 questions">
                                                    {(index+ 1) + ') ' + value.question}
                                                </div>
                                            </div>
                                            <div key={"a" + index} className="row">
                                                <div key={"a_t" + index} className="col-12">
                                                    <TextField id={"question"+ value.id} onKeyUp={this.setAnswer.bind(this)} label="Your Answer" data-id={value.id}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row mt-4 mb-3">
                                <div className="m-auto col-10 col-sm-4">
                                    <Button type="submit" onClick={this.handleSubmit.bind(this)} variant="contained" color="secondary" className="col-12">Submit</Button>
                                </div>
                            </div>
                        </div> 
                    </form>
                    :
                    <div className="row mt-5 m-0 pt-4">
                        <div className="alert alert-danger">No Data found</div>
                    </div>
                }
            </div>
        );
    }
}

export default FillSlamBook;