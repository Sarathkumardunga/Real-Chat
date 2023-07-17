import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
//import toast and its css for toast notification to be seen (line 4 and 5) 
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login(){
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  //the way a toast notification for validation is shown on diaplay
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //handle submit definition
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      //if the validation is true , gonna call the API
      const {password, username} = values;
      const {data} = await axios.post(loginRoute, {
        username,
        password,
      });
      //till abv we have destructured the data
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }

      if(data.status === true){
        //if everything is correct then,
        //we are storing the data of the user in string format and whenever we need it we can pass it as JSON string
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        //and navigate to the chat container.
        navigate("/");
      } 
    }
  };

  //handle validation
  const handleValidation = () => {
    //we will destructure all the values
    const {password, username} = values;

    if(password === ""){
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    }
    else if (username.length === "") {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } 

    return true;
  };

  //handle change definition
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]:event.target.value});
  };

  //Layout of the register form
  return (
    <>    
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Real Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min = "3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login In</button>
          <span>
            Don't have an account ? <Link to="/register">Sign Up.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

//CSS of the register page 
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url("dot.png");
  background-color: #4E91C9;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000079;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #ffffff;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(113, 226, 237);
      color: rgb(227, 235, 242);
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: rgb(71, 249, 12);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;