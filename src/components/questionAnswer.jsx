import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './css/qa.css';
const QuestionAnswer = () => {
    let [questAns, setQA] = useState([]);
    let [viewResult, setViewResult] = useState([]);
    let [result, setResult] = useState([]);
    let [showQs,setQs]=useState("show");
    let [showAs,setAs]=useState("hide");
    useEffect(() => {
        // collect question answers
        Axios.get(('https://question-answer-web.herokuapp.com/api/questions'), {}).then((res) => {
            console.log(res);
            setQA(res.data)
        })
    }, [])
    var data;
    var submitAns = (a, b) => {
        data = result;
        if (data.length === questAns.length) {
            var objIndex = result.findIndex((obj => obj.index == b));
            result[objIndex].data = a
        }
        else {
            data.push({
                index: b,
                data: a
            })
        }
        setResult(data);
    }
    var submit = async () => {
        if (result.length !== questAns.length) alert("please answer all questions...")
        else {
            await Axios.post(('https://question-answer-web.herokuapp.com/api/submit'), {result}).then((res) => {
                console.log(res);
                data =JSON.parse(res.data[0].getData);
                data.forEach((obj,index)=>{
                    obj.answer=result[index].data
                });
                console.log(data)
                setViewResult(data)
                setQs("hide");setAs("show")
                alert(`you scored ${res.data[0].score} out of ${res.data[0].total}`);
            })
        }
    }
    return (
        <div>
            <div className={showQs}>
                {
                    questAns.map((item, index) => {
                        return (
                            <div key={index}>
                                <h4>{index + 1}. {item.question}</h4>
                                <h5 style={{ "marginRight": "10px" }}><input type="radio" onChange={(e) => { submitAns(e.target.value, index) }} value={item.firstopt} name={index} /> {item.firstopt}</h5>
                                <h5 style={{ "marginRight": "10px" }}><input type="radio" onChange={(e) => { submitAns(e.target.value, index) }} value={item.secondopt} name={index} /> {item.secondopt}</h5>
                                <h5 style={{ "marginRight": "10px" }}><input type="radio" onChange={(e) => { submitAns(e.target.value, index) }} value={item.thirdopt} name={index} /> {item.thirdopt}</h5>
                                <hr />
                            </div>
                        )
                    })
                }
                <button type="button" onClick={() => { submit() }} className="btn btn-success">submit</button>
            </div>
            <div className={showAs}>
                {
                    viewResult.map((item, index) => {
                        return (
                            <div key={index}>
                                <h4>{index + 1}. {item.question}</h4>
                                <label>Your Answer :</label>
                                <h5><input type="text" className="textFieldWrong" value={item.answer} readOnly /> </h5>
                                <label>Correct Answer :</label>
                                <h5><input type="text" className="textFieldRight" value={item.correct} readOnly /></h5>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default QuestionAnswer