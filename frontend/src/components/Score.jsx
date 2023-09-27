import Questions from "./Questions"
import { useState, useEffect } from "react"
import axios from "axios"
import ViewScores from "./ViewScores"

const Score = (props) => {
    let score = props.score
    let vid = 'tryagain'
    let id = JSON.parse(sessionStorage.getItem('user_id'))
    const [goBackToQ, SetgoBackToQ] = useState(false)
    const [viewScores, setViewScores] = useState(false)

    const saveScore = () => {
        axios.post('api/savescore/', { 'current_user_id': `${id}`, 'current_score': `${score}` })
            .then((response) => { alert('Your score has been saved! To track your progress, view your scores.') })
            .catch((error) => { console.log(error.response.data) });
    }

    if(score>6) vid='success';

    return (
        <>
            {goBackToQ ? 
                <Questions questions={props.questions}></Questions> 
            :
            viewScores ? 
                <ViewScores questions={props.questions}></ViewScores> 
            :
                <div style={{ margin: 10, textAlign: "center", padding: 10, backgroundColor: "black", color: '#F2B600', width: 600, margin: '-10px auto 8px', borderRadius: 10 }}>
                    <h1>Well done! You completed CONFIDENT DRIVERS test!</h1>
                    <b>You got {score}/10 correct!</b>
                    <br/>
                    <div style={{ margin: "auto" }}>
                        <video style={{ width: 600 }} loop id="coinSaverIcon" autoPlay playsInline muted>
                            <source src={require(`../images/${vid}.mp4`)} type="video/webm" /></video>
                    </div> 
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '7px 40px 10px', alignContent: "center", margin: 'auto' }}>
                        <button style={{ backgroundColor: "#F2B600", color: "black", padding: 10, borderRadius: 10, width: 150, height: 40, boxShadow: '0px 0px 10px 3px #888888', border: 'black' }} onClick={() => saveScore()}>Save my score</button>
                        <button style={{ backgroundColor: "#F2B600", color: "black", padding: 10, borderRadius: 10, width: 150, height: 40, boxShadow: '0px 0px 10px 3px #888888', border: 'black' }} onClick={() => setViewScores(true)}>View My Scores</button>
                        <button style={{ backgroundColor: "#F2B600", color: "black", padding: 10, borderRadius: 10, width: 150, height: 40, boxShadow: '0px 0px 10px 3px #888888', border: 'black' }} onClick={() => SetgoBackToQ(true)}>Take Another Test</button>
                    </div>
                </div>
            }
        </>
    )
}
export default Score;