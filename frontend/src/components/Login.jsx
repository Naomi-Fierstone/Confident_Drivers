import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Image from "../images/orange.jpg";
 
export default function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [signUp, setSignUp] = useState(false)
    const navigate = useNavigate()

    const checkUser = async () => {
        axios.put('api/validateuser/', { 'user_email': email, 'user_password': pass })
            .then((res) => {
                if (res.data == 'Wrong Password') {
                    alert('Incorrect password. Please try again')
                }
                else if (res.data == 'Please sign up') {
                    setSignUp(true)
                    alert(res.data)
                }
                else {
                    let id = JSON.stringify(res.data)
                    sessionStorage.setItem('user_id', id)
                    navigate('/confidentdrivers')
                }
            })
            .catch((err) => {
                console.log("error is:", err.response.data)
            })
    }

    const addUser = () => {
        axios.post('api/adduser/', { 'email': email, 'password': pass })
            .then((response) => {
                alert('Welcome! You have successfully signed up. Please log in.');
                setSignUp(false)
            }
            )
            .catch((error) => { console.log(error.response.data) });
    }

    return (
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0, backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto', backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', height: 90, padding: '0px 50px' }}>
                <img style={{ height: '80%', margin: 10 }} src={require('../images/logo.jpg')}></img>
                {!signUp? 
                    <div style={{ color: "#F2B600", fontWeight: "bold", border: 'solid #F2B600 4px', padding: 8, borderRadius: 25, margin: 22 }} onClick={() => setSignUp(true)}>Sign Up</div>
                :
                    <div style={{ color: "#F2B600", fontWeight: "bold", border: 'solid #F2B600 4px', padding: 8, borderRadius: 25, margin: 22 }} onClick={() => setSignUp(false)}>Log In</div>
                }
            </div>
            <div style={{ textAlign: "center"}}>
                <h2 style={{ fontSize: 70, marginBottom: 'auto', textShadow: '0px 0px 10px 5px #888888' }}>CONFIDENT DRIVERS</h2>
                {signUp ? 
                    <i><h2 style={{fontSize: 40 }}>Sign up</h2></i> 
                :
                    <i><h2 style={{fontSize: 40 }}>Log in</h2></i>
                }
                <div style={{alignItems: 'center', textAlign:"center", marginBottom:50}}>
                    <div style={{margin:'auto' }}>
                        <div style={{ marginRight:'40%', fontSize: 30, textAlign: "right"  }}>
                            <label>Email </label>
                            <input style={{padding:'2px 10px', fontSize: 25, backgroundColor: "black", color: "#F2B600", borderRadius: 7, border: 'black', width: 200, marginBottom:20}} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>
                        <div style={{marginRight:'40%',fontSize: 30, textAlign: "right"}}>
                            <label>Password </label>
                            <input style={{ padding:'2px 10px', fontSize: 25, backgroundColor: "black", color: "#F2B600", borderRadius: 7, border: 'black', width: 200 }} placeholder='Password' onChange={(e) => { setPass(e.target.value) }}></input>
                        </div>
                    </div>
                </div>
                {signUp ? 
                    <button style={{ backgroundColor: "black", color: "#F2B600", padding: 10, borderRadius: 10, width: 150, boxShadow: '0px 0px 10px 2px #777777', fontWeight:'bold' }} onClick={() => addUser()}>Sign up</button> 
                :
                    <button style={{ backgroundColor: "black", color: "#F2B600", padding: 10, borderRadius: 10, width: 150, boxShadow: '0px 0px 10px 2px #777777', fontWeight:'bold' }} onClick={() => checkUser()}>Log in</button>
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', height: 15, padding: '7px 40px 10px', position: "absolute", bottom: 0, right: 0, left: 0 }}>
                <div style={{ color: '#F2B600' }}>©N Fierstone & R Bamberger</div>
                <div style={{ color: '#F2B600' }}>see more at www.ConfidentDrivers.com</div>
            </div>
        </div>
    )
}