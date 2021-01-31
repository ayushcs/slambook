import React from 'react';
import fire from '../config/fire';
import {TextField, Dialog,LinearProgress, Button,FormGroup,FormControlLabel,Checkbox }from '@material-ui/core/';
class SlambookCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    id: 0,
                    question: "My name in your phone_______ ?",
                    added:false
                },
                {
                    id: 1,
                    question: "My name in your phone_______ ?",
                    added:false
                },
                {
                    id: 2,
                    question: "Relation between you and me______?",
                    added:false
                },
                {
                    id: 3,
                    question: "Something You like in me______?",
                    added:false
                },
                {
                    id: 4,
                    question: "Something you hate in me_____?",
                    added:false
                },
                {
                    id: 5,
                    question: "Words about me",
                    added:false
                },
                {
                    id: 6,
                    question: "What would be your reaction if i die_______?",
                    added:false
                },
                {
                    id: 7,
                    question: "What did you feel when you first saw me______?",
                    added:false
                },
                {
                    id: 8,
                    question: "A message for me_____?",
                    added:false
                },
                {
                    id: 9,
                    question: "A nick name for me_______?",
                    added:false
                },
                {
                    id: 10,
                    question: "A song you want to dedicate me_________?",
                    added:false
                },
                {
                    id: 11,
                    question: "You do want me to put this as my status_____?",
                    added:false
                },
                {
                    id: 12,
                    question: "Who is your secret crush?",
                    added:false
                },
                {
                    id: 13,
                    question: "Who would you most like to talk to?",
                    added:false
                },
                {
                    id: 14,
                    question: "Worst mistake?",
                    added:false
                },
                {
                    id: 15,
                    question: "Worst thing that ever happened to you?",
                    added:false
                },
                {
                    id: 16,
                    question: "Your dream?",
                    added:false
                },
                {
                    id: 17,
                    question: "Your favorite actor or actress and why?",
                    added:false
                },
                {
                    id: 18,
                    question: "What lie have you told that hurt someone?",
                    added:false
                },
                {
                    id: 19,
                    question: "What is the most expensive thing you have stolen?",
                    added:false
                },
            ],
            disableProceedButton:true,
            proceedModal: false,
            loader:false,
            generatedLink:false,
            isCopied:false,
            error:null,
        }
        // for debugging
        window.fire = fire;

    }

    createNewList(d,event){
        let arr = this.state.data;
        let pos = parseInt(event.target.value);
        let disableProceedButton = this.state.disableProceedButton; 
        if(event.target.checked){
            arr[pos]["added"] = event.target.checked;
        }else{
            arr[pos]["added"] = event.target.checked;
        }
        disableProceedButton = arr.some(function(e) {
            return e.added == true;
        });
        this.setState({data:arr,disableProceedButton : !disableProceedButton});
    }


    proceedNext(event){
        if(this.state.disableProceedButton){
            alert("Please select at least one to Proceed !!")
        }else{
            this.setState({proceedModal:true})
        }
    }

    copyLink(event){
        event.preventDefault();
        var copyText = document.getElementById("shareableLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        this.setState({isCopied:true})
    }

    handleClose() {
        if (this.state.isCopied) {
            this.props.history.push(`/`);
        } else {
            this.setState({proceedModal:false,generatedLink:false})
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let error = this.state.error
        let username = document.getElementById('uName').value;
        let password = document.getElementById('pwd').value;
        if(username && password){
            this.setState({loader:true})
            let uid = username.toLowerCase() + '||' + password;
            let question = this.state.data.filter( (item) => item.added == true );
            // appending new user data to the 
            fire.database().ref("users").child(uid).set({
                username,
                password,
                question,
            }).then(()=> {
                // response generated
                this.setState ({
                    loader:false, 
                    generatedLink: window.location.origin + "/#/users/id=" + btoa(uid)
                })
            })
        } else{
            error = "Please create a UserName/Password";
            this.setState({error})
        }
    }

    render() { 
        const { data,disableProceedButton,proceedModal,loader,generatedLink,isCopied,error } = this.state;
        return (  
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <p className="col-12 mt-2">Select the question and Press submit to share with your friends.</p>
                    </div>
                    <div className="mainimage position-fixed" style={{opacity: "0.2",zIndex:"-1"}}></div>
                </div>
                <div className="p-2 pt-4 mt-5">
                    <FormGroup aria-label="position" row>
                    {
                        (data)
                        ?
                            data.map((d,i)=>{
                                return(
                                    <div key={`q${i}`} className="row w-100">
                                        <div className="col-12 px-0">
                                        <FormControlLabel
                                            value={d.id}
                                            control={<Checkbox color="primary" onClick={this.createNewList.bind(this,d)} />}
                                            label={d.question}
                                            labelPlacement="end"
                                        />
                                        </div>
                                    </div>
                                )
                            })
                        :
                        null
                    }
                    </FormGroup>
                    <Button disabled={disableProceedButton} onClick={this.proceedNext.bind(this)} variant="contained" color="secondary" className="w-100 mt-2 mb-4 p-2">
                        Proceed
                    </Button>
                </div>
                {/* Dialog Start from here */}
                <Dialog maxWidth="md" onClose={()=> this.handleClose()} aria-labelledby="proceed-to-share" open={proceedModal}>
                {
                (generatedLink)?
                    <div className="row m-auto">
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Yeipee! Link Generated</h4>
                        <p>
                            Click on Copy and Share with your colleagues for the exicited answer. Let the fun begin!
                        </p>
                    </div>
                    <div className="px-2">
                        <input type="text" className="form-control" id="shareableLink" readonly={true} value={generatedLink} />
                    </div>
                    <div className=" mt-3">
                        <div className="m-auto col-12">
                            <Button onClick={this.copyLink.bind(this)} variant="contained" color="primary" className="w-100 mt-2 mb-4 p-2">
                                <span>{(isCopied) ? "Link Copied": "Copy Link"}</span>
                            </Button>
                        </div>
                    </div>
                </div>
                :
                    <div className="row m-auto">
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Final Step</h4>
                            <p>
                                Create a username and password to view all your SLAMBOOK for the next time. 
                            </p>
                        </div>
                        <form noValidate autoComplete="off">
                            <div className="mt-3">
                                <div className="m-auto col-12">
                                    <TextField
                                        required
                                        fullWidth="true"
                                        id="uName"
                                        label="Username"
                                        variant="filled"
                                        type="text"
                                        className="col-12"
                                    />
                                </div>
                            </div>
                            <div className=" mt-3">
                                <div className="m-auto col-12">
                                    <TextField
                                        required
                                        fullWidth="true"
                                        id="pwd"
                                        label="Password"
                                        variant="filled"
                                        type="password"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                            {(error)?<span className="text-danger p-2 px-0">{error}</span>:null}
                            <div className=" mt-3">
                                <div className="m-auto col-12">
                                    <Button type="submit" onClick={this.handleSubmit.bind(this)} variant="contained" color="primary" className="w-100 mt-2 mb-4 p-2">
                                        {
                                        (loader)
                                        ?
                                        <span>
                                            Generating
                                        <LinearProgress color="secondary" /></span>
                                        :
                                        <span>Generate Link</span>
                                        }
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    }
                </Dialog>
            </div>
        );
    }
}

export default SlambookCreate;