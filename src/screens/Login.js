import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Correct the URL format, assuming your API is running on localhost
    const response = await fetch("http://localhost:3000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    try {
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/")
      }
      if (!json.success) {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>i am a new user</Link>
        </form>
      </div>
    </>
  );
}
