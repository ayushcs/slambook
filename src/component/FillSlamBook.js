import React from 'react'
import {TextField, Button} from '@material-ui/core/';


class FillSlamBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    id: 0,
                    question: "My name in your phone_______ ?",
                },
                {
                    id: 1,
                    question: "My name in your phone_______ ?",
                },
                {
                    id: 2,
                    question: "Relation between you and me______?",
                },
                {
                    id: 3,
                    question: "Something You like in me______?",
                },
                {
                    id: 4,
                    question: "Something you hate in me_____?",
                },
                {
                    id: 5,
                    question: "Words about me",
                },
                {
                    id: 6,
                    question: "What would be your reaction if i die_______?",
                },
                {
                    id: 7,
                    question: "What did you feel when you first saw me______?",
                },
                {
                    id: 8,
                    question: "A message for me_____?",
                },
                {
                    id: 9,
                    question: "A nick name for me_______?",
                },
                {
                    id: 10,
                    question: "A song you want to dedicate me_________?",
                },
                {
                    id: 11,
                    question: "You do want me to put this as my status_____?",
                },
                {
                    id: 12,
                    question: "Who is your secret crush?",
                },
                {
                    id: 13,
                    question: "Who would you most like to talk to?",
                },
                {
                    id: 14,
                    question: "Worst mistake?",
                },
                {
                    id: 15,
                    question: "Worst thing that ever happened to you?",
                },
                {
                    id: 16,
                    question: "Your dream?",
                },
                {
                    id: 17,
                    question: "Your favorite actor or actress and why?",
                },
                {
                    id: 18,
                    question: "What lie have you told that hurt someone?",
                },
                {
                    id: 19,
                    question: "What is the most expensive thing you have stolen?",
                },
            ],
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    render() { 
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-0 position-fixed text-center toplabel">
                        <Button className="col-12">Create Your Own SlamBook Now</Button>
                    </div>
                    <div className="mainimage position-fixed" style={{opacity: "0.2"}}></div>
                </div>
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
                                            <TextField id={"question"+ value.id} label="Your Answer" data-id={value.id}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="m-auto col-10 col-sm-4">
                            <Button variant="contained" color="secondary" className="col-12">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FillSlamBook;