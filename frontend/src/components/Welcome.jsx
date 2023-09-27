import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "./Questions";
import axios from 'axios';
import ViewScores from "./ViewScores";
import Image from "../images/orange.jpg";

const Welcome = () => {
    const [goToQuestion, SetGoToQuestion] = useState(false);
    const [questions, setQuestions] = useState([])
    const [goToScores, SetGoToScores] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadQuestions()
    }, [])

    const loadQuestions = async () => {
        await axios.get('/api/getquestions/').then((res) => {
            setQuestions(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto', backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover", margin:-8}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', height: 90, padding: '0px 50px' }}>
                <img style={{ height: '80%', margin: 10 }} onClick={() => { SetGoToQuestion(false); SetGoToScores(false) }} src={require('../images/logo.jpg')}></img>
                <div style={{ color: "#F2B600", fontWeight: "bold", border: 'solid #F2B600 4px', padding: 8, borderRadius: 25, margin: 22 }} onClick={() => navigate('/')}>Logout</div>
            </div>
            {
            goToQuestion ? 
                <Questions questions={questions}></Questions> 
            :
            goToScores ? 
                <ViewScores questions={questions}></ViewScores> 
            :
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontSize: 50, marginBottom: 'auto' }}>CONFIDENT DRIVERS</h1>
                    <i><h4 style={{margin:15}}> Pass on your first with just a few clicks!</h4></i>
                    <h6 style={{padding:'0px 40px', marginTop:0}}>Confident Drivers provides you with a free service to test your driving theory test knowledge. <br />
                        Practice unti l you are perfect so you will be super prepared and pass on your first try. 
                        Statistics prove that the best way to guarantee passing is with practice tests!  <br />
                        Just click 'start quiz' to begin! 
                    </h6>
                    <div style={{ margin: "auto", height:279}}>
                        <video style={{ boxShadow: '0px 0px 7px 5px #f1dfa7', height:250 }} loop id="coinSaverIcon" autoPlay playsInline muted>
                            <source src={require('../images/car.webm')} type="video/webm" />
                        </video>
                        <span style={{ display: 'flex', justifyContent: 'space-around', textAlign: "center", width: 500, margin: 'auto', padding: 20, marginBottom:60.5, position:'absolute', bottom:35, right:0, left:0 }}>
                            <button style={{ boxShadow: '0px 0px 10px 5px #f1dfa7',backgroundColor: "black", color: "#F2B600", padding: 10, borderRadius: 10, width: 120 }} onClick={() => SetGoToQuestion(true)}>Start Quiz</button>
                            <button style={{ boxShadow: '0px 0px 10px 5px #f1dfa7',backgroundColor: "black", color: "#F2B600", padding: 10, borderRadius: 10, width: 120 }} onClick={() => SetGoToScores(true)}>View my Scores</button>
                        </span>
                    </div>
                </div>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', height: 15, padding: '7px 40px 10px', marginTop:32 }}>
                <div style={{ color: '#F2B600' }}>©N Fierstone & R Bamberger</div>
                <div style={{ color: '#F2B600' }}>see more at www.ConfidentDrivers.com</div>
            </div>
        </div>
    )
}
export default Welcome;