import { useState} from 'react';
import Score from './Score';
import {useSnackbar } from 'notistack';
import Muipopup from './muipopup';
import * as React from 'react';

const Questions = (props) => {
    const[goToNext, setGoToNext] = useState(false);
    const[selectedAnswer, setSelectedAnswer] = useState('');
    const[questionNumber, setQuestionNumber] = useState(1);
    const[popup, setPopup] = useState(false)
    const[message, setMessage] = useState('Correct Answer!')
    const[severity, setSeverity] = useState('success')
    const[score, setScore] = useState(0);
    let questions = props.questions;
    let answers=[];
    let currentQuestion= questions.find((e) => (e.id==questionNumber))

    if (currentQuestion)
    {answers=[{answer:currentQuestion.answer_1, value:'a'}, {answer:currentQuestion.answer_2, value:'b'}, {answer:currentQuestion.answer_3, value:'c'}, {answer:currentQuestion.answer_4, value:'d'}]}
    
    const checkAnswer =() => {
        console.log(selectedAnswer, currentQuestion.correct)
        if(selectedAnswer == currentQuestion.correct)
        {     
            setMessage('Correct Answer')
            setSeverity('success')
            setScore(score+1)
        }
        else
        {
            setMessage('Incorrect Answer')
            setSeverity('error')
        }
        setGoToNext(true)
        setPopup(true)    
    }

    const nextQuestion =() => {
        setQuestionNumber(questionNumber+1);
        setGoToNext(false);
        setPopup(false);
        setSelectedAnswer('');
        }

    return(
        <div style={{marginTop:60}}>
            {popup && <Muipopup message={message} severity={severity}></Muipopup>}
            {questionNumber>10?
                <Score score = {score} questions={props.questions}></Score>
            :
                <div style={{fontWeight:'bold', marginLeft:10}}>
                    <div style={{margin:20}}>
                        <h1 style={{textAlign:'center'}}>{currentQuestion.question}</h1>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', margin:30, paddingTop:39}}>
                        <div >
                            <b>Question {currentQuestion.id}/10</b>
                            <br/><br/>
                            <div style={{ borderRadius:20}}>
                                <img style={{width:'100%', height:'110%', boxShadow: '0px 0px 10px 5px #888888',borderRadius:20}} src={require(`../images/questions/${currentQuestion.image}`)}></img>
                            </div>
                        </div>
                        {goToNext?
                            <div style={{width:'60%', margin:'auto', paddingTop:30}}>
                                <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>   
                                {
                                    answers.map((e)=>(
                                        <div style={{width:'40%', backgroundColor:(e.value==currentQuestion.correct ? 'green':'red'), boxShadow: '0px 0px 10px 5px #888888', padding:20, margin:10, borderRadius:10, textAlign:'center'}}>
                                            <div>
                                                <span>{e.value==selectedAnswer && <span>{e.value==currentQuestion.correct ?<span>👍</span>:<span>👎</span>}</span>}</span>
                                                <span>{e.answer}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                                <button style={{margin:'auto', backgroundColor:'black', color:"#F2B600", width:'30%', padding:10, margin:'10px 35%', borderRadius:10, textAlign:'center', fontWeight:'bold', fontSize:'15px'}} onClick = {()=>{nextQuestion()}}>Next</button>
                            </div>
                        :
                            <div style={{width:'60%', margin:'auto', paddingTop:30}}>
                                <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>   
                                {
                                    answers.map((e)=>(
                                        <div onClick={()=>setSelectedAnswer(e.value)} style={{width:'40%', backgroundColor:(e.value==selectedAnswer && 'black'), color:(e.value==selectedAnswer && "#F2B600"), boxShadow: '0px 0px 10px 5px #888888', padding:20, margin:10, borderRadius:10, textAlign:'center'}}>
                                            {e.answer}
                                        </div>
                                    ))
                                }
                                </div>
                                <button style={{margin:'auto', backgroundColor:'black', color:"#F2B600", width:'30%', padding:10, margin:'10px 35%', borderRadius:10, textAlign:'center', fontWeight:'bold', fontSize:'15px'}}onClick = {()=>{checkAnswer()}}>Submit</button>
                            </div>
                        }       
                    </div>
                </div>
            }
            <br/><br/>
        </div>
    )}
export default Questions;