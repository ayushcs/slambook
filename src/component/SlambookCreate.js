import React from 'react';
import {TextField, Dialog,DialogTitle, Button,FormGroup,FormControlLabel,Checkbox }from '@material-ui/core/';
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
        }
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

    handleSubmit(event){
        event.preventDefault();
        console.log(event)
    }

    render() { 
        const { data,disableProceedButton,proceedModal } = this.state;
        return (  
            <div className="container-fluid bg-green"> 
                <div className="h1 pt-2 pb-2"> Create Your own SlamBook. </div>
                <FormGroup aria-label="position" row>
                {
                    (data)
                    ?
                        data.map((d,i)=>{
                            return(
                                <div className="row w-100">
                                    <FormControlLabel
                                        value={d.id}
                                        control={<Checkbox color="primary" onClick={this.createNewList.bind(this,d)} />}
                                        label={d.question}
                                        labelPlacement="end"
                                    />
                                </div>
                            )
                        })
                    :
                    null
                }
                </FormGroup>
                <Button disabled={disableProceedButton} onClick={this.proceedNext.bind(this)} variant="contained" color="secondary" className="w-100 mt-2 mb-4 p-2">
                    <span className="h1">Proceed</span>
                </Button>


                {/* Dialog Start from here */}
                <Dialog maxWidth="xl" className="p-2 m-2" onClose={()=>this.setState({proceedModal:false})} aria-labelledby="proceed-to-share" open={proceedModal}>
                    <div className="h1">Final Step</div>
                    <span className="text-danger"> Create a UserName & Password. to view your all slamBook</span>
                    <form className="row m-4 p-2" noValidate autoComplete="off">
                        <TextField className="" required id="standard-required" label="User Name" />
                        < br />
                        <TextField  className="" required id="standard-required" label="Password" />
                        < br />
                        <Button type="submit" onClick={this.handleSubmit.bind(this)} variant="contained" color="secondary" className="w-100 mt-2 mb-4 p-2">
                            <span className="h2">Generate Link</span>
                        </Button>
                    </form>

                    </Dialog>
            </div>
        );
    }
}

export default SlambookCreate;