import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import {Link} from "react-router-dom"
const Register = () => {
    const [registerError,setRegisterError]=useState('');
    const [success,setSuccess]=useState('');
    const [showPassword,setShowPassword]=useState(false)
    const handleRegister=e=>{
        e.preventDefault();
        const name = e.target.name.value
        const email= e.target.email.value;
        const password= e.target.password.value;
        const accepted = e.target.terms.checked
        console.log(email,password,accepted,name);
        setRegisterError(' ')
        setSuccess(' ')
        if(password.length<6){
            setRegisterError("At least 6 characters or longer")
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Your password should be one uppercase")
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and condition")
            return;
        }
        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setSuccess("User added successfully")

            // update profile
            updateProfile(result.user,{
                displayName:name,
                photoURL:" "
            })
            .then(()=>console.log("profile updated"))
            .catch(error=>{
                console.log(error);
            })

            // send verification email

            sendEmailVerification(result.user)
            .then(()=>{
                alert("Please check your email and verification your email address ")
            })

        })
        .catch(error=>{
            console.log(error);
            setRegisterError(error.message)
        })
    }
    return (
        <div>
            
            <div className=" mx-auto w-1/2">
            <h2 className=' text-2xl mb-4'>Please Register</h2>
            <form onSubmit={handleRegister}>
               <input className=" mb-3 w-full px-4 py-2 bg-slate-100" type="text" name="name" placeholder="Your Name" id="" required/>
               <br />
               <input className=" mb-3 w-full px-4 py-2 bg-slate-100" type="email" name="email" placeholder="Email Address" id="" required/>
               <br />
               <div className=" relative mb-3">
               <input className=" w-full px-4 py-2 bg-slate-100" 
                 type={showPassword?"text":"password"}
                 name="password" 
                 placeholder="Password" 
                 id="" required />
                 <span className=" absolute top-3 right-3" onClick={()=>setShowPassword(!showPassword)}>
                    {
                        showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                    }
                 </span>
               </div>
               <br />
               <div className=" mb-3">
               <input type="checkbox" name="terms" id="terms" />
               <label className=" ml-2" htmlFor="terms">Accept our <a>Terms and Condition</a> </label>
               </div>
               <br />

               <input className=" mb-3 w-full btn btn-secondary"  type="submit" value="Register" />
            </form>
            {
                registerError && <p>{registerError}</p>
            }
            {
                success && <p>{success}</p>
            }
             <p>Already Have an Account ? Please<Link to="/login" className=" text-pink-700 font-bold">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;