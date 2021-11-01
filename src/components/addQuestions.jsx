import React, { useState } from "react";
import Axios from 'axios';
const AddQuestions = () => {
    let [question, setQuestion] = useState();
    let [firstOpt, setFirstOpt] = useState();
    let [secondOpt, setSecondOpt] = useState();
    let [thirdOpt, setThirdOpt] = useState();
    let [correct, setCorrectOpt] = useState();
    var newObj = [];
    var onSubmit = async () => {
        console.log("hi");
        if (question == null) alert("please fill one question")
        else if (firstOpt == null) alert("please fill first Option")
        else if (secondOpt == null) alert("please fill second Option")
        else if (thirdOpt == null) alert("please fill third Option")
        else {
            // https://question-answer-web.herokuapp.com/api
            await Axios.post('https://question-answer-web.herokuapp.com/api/insert', {
                "question": question,
                "firstopt": firstOpt,
                "secondopt": secondOpt,
                "thirdopt": thirdOpt,
                "correct": correct
            })
            console.log(newObj)
            setQuestion('');setFirstOpt('');setSecondOpt('');setThirdOpt('');setCorrectOpt();
        }
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" style={{ "marginLeft": "800px" }} data-toggle="modal" data-target="#myModal">add Question</button>
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" style={{ "color": "red", "textAlign": "center" }}>Question and Answer</h4>
                        </div>
                        <form onSubmit={() => { onSubmit() }}>
                            <div className="modal-body">
                                <label>Enter the question</label>
                                <input type="text" className="form-control" onChange={(e) => { setQuestion(e.target.value) }} placeholder="enter the question" />
                                <div className="form-group form-group-sm">
                                    <label className="col-sm-2 control-label">Options</label><br />
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control mb-4" onChange={(e) => { setFirstOpt(e.target.value) }} placeholder="enter first option" />
                                        <input type="text" className="form-control mb-4" onChange={(e) => { setSecondOpt(e.target.value) }} placeholder="enter second option" />
                                        <input type="text" className="form-control mb-4" onChange={(e) => { setThirdOpt(e.target.value) }} placeholder="enter third option" />
                                        <input type="text" className="form-control mb-4" onChange={(e) => { setCorrectOpt(e.target.value) }} placeholder="enter correct option" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">submit</button>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AddQuestions;