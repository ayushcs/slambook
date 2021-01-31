import React from 'react'
import {TextField, Button, CircularProgress,Dialog} from '@material-ui/core/';
import fire from '../config/fire'


class FillSlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            loader: true,
            uid: "",
            answers: {},
            submitModal:false,
            isDisabled:true,
            askModal:false
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
        let answers = this.state.answers;
        answers[e.target.name.replace(/ques_/g, '')] = e.target.value.trim();
        if(Object.values(answers).some(val => val !== "" )){
            this.setState({isDisabled:false})
        }else{
            this.setState({isDisabled:true})
        }
        this.setState({answers})
    }

    submitModal(e){
        e.preventDefault()
        this.setState({submitModal:true})
    }

    handleSubmit(e){
        e.preventDefault();
        fire.database().ref(`answers/${this.state.uid}/`).push({
            answer: this.state.answers
        }).then(()=> {
            this.setState({submitModal:false,askModal:true})
        })
    }

    render() { 
        const {loader,submitModal,isDisabled,askModal} = this.state;
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
                                                    <TextField name={"ques_"+ value.id} id={"question"+ value.id} onChange={this.setAnswer.bind(this)} label="Your Answer" data-id={value.id}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row mt-4 mb-3">
                                <div className="m-auto col-10 col-sm-4">
                                    <Button disabled={isDisabled} type="submit" onClick={this.submitModal.bind(this)} variant="contained" color="secondary" className="col-12">Submit</Button>
                                </div>
                            </div>
                        </div> 
                    </form>
                    :
                    <div className="row mt-5 m-0 pt-4">
                        <div className="alert alert-danger">No Data found</div>
                    </div>
                }
                <Dialog maxWidth="md" onClose={()=> this.setState({submitModal:false})} aria-labelledby="proceed-to-share" open={submitModal}>
                    <div className="row m-auto">
                        <div className="alert alert-success" role="alert">
                            <p>
                                Enter Your Name, Which you want to shown...
                            </p>
                        </div>
                        <div className="px-2">
                            <input type="text" placeholder="Your Name" name="shownName" className="form-control" onBlur={this.setAnswer.bind(this)}  />
                        </div>
                        <div className=" mt-3">
                            <div className="m-auto col-12">
                                <Button onClick={this.handleSubmit.bind(this)} variant="contained" color="primary" className="w-100 mt-2 mb-4 p-2">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog maxWidth="md" onClose={()=> this.setState({askModal:false})} aria-labelledby="proceed-to-share" open={askModal}>
                    <div className="row m-auto">
                        <div className="alert alert-success" role="alert">
                            <p>
                                Submitted !!<br/>Do you want to create your own?
                            </p>
                        </div>
                        <div className=" mt-3">
                            <div className="m-auto col-12">
                                <Button onClick={()=>{this.props.history.push('/SlambookCreate')}} variant="contained" color="primary" className="col-5 mt-2 ml-2 mb-4 p-2">
                                    Yes
                                </Button>
                                <Button onClick={()=>{this.props.history.push('/')}} variant="contained" color="secondary" className="col-5 mt-2 mr-2 mb-4 p-2" style={{float:"right"}}>
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default FillSlamBook;