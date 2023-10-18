"use client";
import React, { useEffect } from 'react'
import { toast } from "react-hot-toast";
import axios from 'axios';
const TriggerGenerator = () => {

    const [user, setUser] = React.useState({
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        balance:""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSubmitLowbalance = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://reqres.in/api/uses", user);
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
  return (
    <div >
      <h1 className='h-2 align-middle'>Welcome to Trigger Generator</h1>
      <div>
          <h1>Contact Details</h1>
              <label htmlFor="first_name">First Name</label>
              <input 
                  id='first_name'
                  type='text'
                  value={user.first_name}
                  onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              >

              </input>

          <label htmlFor="last_name">Last Name</label>
          <input 
                  id='last_name'
                  type='text'
                  value={user.last_name}
                  onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              ></input>

          <label htmlFor="email">Email</label>
          <input 
                  id='email'
                  type='text'
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
              ></input>

          <label htmlFor="phone">Phone</label>

          <input 
                  id='phone'
                  type='text'
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
              ></input>


          <h1>Low Balance Alert: </h1>
          <div>
           <label>Balance Value:</label>
           <input 
                  id='balance'
                  type='text'
                  value={user.balance}
                  onChange={(e) => setUser({ ...user, balance: e.target.value })}
              ></input>
          <button onClick={onSubmitLowbalance}>Intiate the trigger</button>
          </div>

      </div>
    </div>
  )
}

export default TriggerGenerator
