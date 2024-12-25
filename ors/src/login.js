

import { Link } from 'react-router-dom';
import './login.css';
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tranfer from './States';
export var proName = "Name";
export var emailOver = '';

export default function LLogin() {
    // let ref=useRef('/AdminPage');
    const [email, setEmail] = useState("");
    const { userDetails, setuserDetails } = Tranfer();
    // eslint-disable-next-line
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    // eslint-disable-next-line



    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                let flag = 0;
                const data = await fetch(`${process.env.BACKENDLINK}`);
                const dataJson = await data.json();
                const len = dataJson.userLogins.length;
                let i = 0
                for (i = 0; i < len; i++) {
                    if (dataJson.userLogins[i].email === email) {
                        flag = 1;

                        break;
                    }
                }

                if (flag === 0) {
                    console.log('No existing account');
                    alert("Account doesnt exist");

                }
                if (flag === 1) {
                    //navigate
                    console.log("login success", dataJson.userLogins[i].name)
                    proName = dataJson.userLogins[i].name;
                    emailOver = dataJson.userLogins[i].email;
                    setuserDetails(prevstate => ({
                        ...prevstate,
                        name: " " + dataJson.userLogins[i].name + "",
                    }))
                    alert("Successfully logined");
                }
            }
            catch (e) {
                console.error(e);
            }
        }

        fetchData();

    }
    // const Adminpage = (email) =>{
    // e.preventDefault();
    // try{
    //     const updatUser= await fetch('http://localhost:8000',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify()
    //     })
    // }
    // console.log(email);

    // console.log(ref.current);
    // if(email=='Admin@gmail.com'){
    //     window.location.assign("http://localhost:3000"+ref.current);
    // }
    // }
    // window.location.href = '/AdminPage';

    return (
        <div style={{ backgroundImage: 'linear-gradient(140deg, rgb(168, 235, 247) 45%, rgb(55, 222, 75) 75%)', display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }}>
            <div style={{ boxShadow: '5px 5px 5px 5px black', borderRadius: '10px', width: 'fit-content', height: 'fit-content', padding: '40px', marginTop: '20vh' }}>
                <form onSubmit={handleSubmit} className='lbox'>

                    <h2 style={{ textAlign: 'center' }}>Login</h2>
                    <label>Email</label>
                    <div><MdOutlineMail style={{ color: 'rgba(84, 87, 92,0.5)', position: 'absolute', marginTop: '1px' }} /> </div>
                    <input className='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='email' style={{ border: 'none', borderBottom: '1px solid black', paddingBottom: '1px' }} type='email' />
                    <label>Password</label>
                    <div> <b><CiLock style={{ strokeWidth: 0.5, opacity: '0.5', position: 'absolute', marginTop: "1px", color: "rgba(0,0,0,1)" }} /></b> </div>
                    <input placeholder='password' onChange={(e) => { setPass(e.target.value) }} style={{ border: 'none', borderBottom: '1px solid black', paddingBottom: '1px' }} type='password' />
                    <p style={{ width: '100%', textAlign: 'right', marginBottom: '20px', fontSize: '12px' }}>forget password?</p>
                    <p style={{ textAlign: 'center', height: 'fit-content' }}>
                        <button type='submit' style={{ cursor: 'pointer', backgroundImage: 'linear-gradient(140deg,  rgb(55, 222, 75) 45%) rgb(168, 235, 247) 75%', width: '230px', height: '27px', textAlign: 'center', backgroundColor: 'lightblue', fontSize: '15px', letterSpacing: '1px', marginBottom: '25px', border: 'none', borderRadius: '20px' }}>Login</button>
                    </p>
                    <div className='b7'>
                        <hr className='bhr2' /><h4 style={{ fontSize: '18px' }}>new Account?</h4><hr className='bhr2' />
                    </div>
                    <Link to="/Register" className='signuplink'><p className='signup'>Sign up</p> </Link>

                </form>
            </div>
        </div>
    );
}

