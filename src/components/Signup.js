import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:" ",password:"",cpassword:""})
let navigate = useNavigate()
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name,email,password,cpassword} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name,email, password})
    })
    const json = await response.json()
    console.log(json);
    if(json.success && credentials.password===credentials.cpassword){
      localStorage.setItem('token',json.authtoken)
      navigate('/login');
      props.showAlert("Account Created Successfully", "success")

    }else{
      props.showAlert("Invalid Credentials", "danger")
    }
}
const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className="containermt-2signup">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"  name="name" id="name"  onChange={onChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"  name="email" id="email"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  className="form-control" name = "password" id="password" onChange={onChange} minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name = "cpassword" id="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup
