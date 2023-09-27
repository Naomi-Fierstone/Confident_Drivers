import { useState, useEffect } from "react"
import Questions from "./Questions"
import axios from "axios"

const ViewScores = (props) => {
    const [goBackToQ, SetgoBackToQ] = useState(false)
    const [scores, setScores] = useState([])
    let number=0
    let id = JSON.parse(sessionStorage.getItem('user_id'))
    
    useEffect(() => {
        loadScores()
      }, [])

    const loadScores = async() => {
        await axios.get(`/api/getscores/${id}`).then((res) => {
            setScores(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <>
            {goBackToQ ?
                <Questions questions={props.questions}></Questions>
            :
                <div style = {{textAlign: "center", minHeight:434}}>
                    <h1 style = {{fontSize: 70}}>My Scores</h1>
                    {scores.length>0?
                        <>
                            <div style = {{margin:'auto', padding:20, backgroundColor: "black", color:"#F2B600", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 250 }}>
                                {scores.map((e) =>(
                                    <div style={{backgroundColor: '#F2B600', color: "black", boxShadow: '0px 0px 10px 5px #888888', padding:10, margin:10, borderRadius:10, textAlign:'center'}}><b>Test{number+=1}:  </b>You scored {e.score}/10<br></br></div>
                                ))}
                            </div>
                            <h1>Well done!</h1>
                            <button style = {{backgroundColor: "black", color:"#F2B600", padding:10, borderRadius: 10, width: 150 }} onClick={() => SetgoBackToQ(true)}>Give it another go!!</button>
                        </>
                    :
                        <>
                            <div style = {{margin:'20px auto', padding:20, backgroundColor: "black", color:"#F2B600", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350 }}>
                                <h1>You have no previous scores to view!
                                    <br/>We are sure you will pass with flying colours!
                                </h1>
                            </div>
                            <button style = {{backgroundColor: "black", color:"#F2B600", padding:10, borderRadius: 10, width: 150, border:'black', boxShadow: '0px 0px 10px 2px #f1dfa7' }} onClick={() => SetgoBackToQ(true)}>Give it a go!</button>
                        </>
                    }
                    <br></br><br></br>
                </div>
            }
        </>
    )
}
export default ViewScores