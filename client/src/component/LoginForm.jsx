import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    axios.defaults.withCredentials = true
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8800/login', {email, password})
        .then(res => {
            if(res.data.Login){
                navigate('/dashboard');
            } else {
                alert("Account Not Found")
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
      <div className='flex items-center justify-center p-10 shadow-[2px_4px_6px_0px_rgba(51,_65,_85,_0.12)] border rounded-xl bg-[#2e2e2e] border-[#3d3d3d] text-white'>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
                <label htmlFor="email" className='mb-3'>Email</label>
                <input type="email" placeholder="Enter Email" className="form-control p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#3ECF8E] text-black" onChange={ e => setEmail(e.target.value)}/>
            </div>

            <div className="flex flex-col mb-6">
                <label htmlFor="password" className='mb-3'>Password</label>
                <input type="password" placeholder="Enter Password" className="form-control p-2 border rounded-md outline-none focus:ring-2 focus:ring-[#3ECF8E]" onChange={ e => setPassword(e.target.value)}/>
            </div>

            <button className="w-full bg-[#3ECF8E] p-2 rounded-md">Sign In</button>
        </form>
      </div>
    );
  }
  
export default LoginForm;