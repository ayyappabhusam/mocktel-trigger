"use client";
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './TriggerGenerator.css';
import LowBalanceTrigger from './LowBalanceTrigger';
import MissedCallTrigger from './MissedCallTrigger';
import DataExpiryTrigger from './DataExpiryTrigger';

const TriggerGenerator = () => {
  const [user, setUser] = useState({
    email: localStorage.getItem('email') || '',
    phone: localStorage.getItem('phone') || '',
    first_name: localStorage.getItem('first_name') || '',
    last_name: localStorage.getItem('last_name') || '',
    balance: '',
    missed_call_from: '',
    data_pack_expiry_duration: '',
  });

  const onSuccess = (triggerType) => {
    toast.success(`Trigger initiated: ${triggerType}`);
    setLoading(false);
  };

  const onError = (triggerType, errorMessage) => {
    toast.error(`Trigger initiation failed (${triggerType}): ${errorMessage}`);
    setLoading(false);
  };

  return (
    <div>
      <h1 className='heading'>
        Welcome to Trigger Generator
      </h1>
      <div >
      <div className='box'>
        <h1 className='sub-heading'>Contact Details:</h1>
       
          <div style={{marginLeft:"200px"}}>
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name"
              type="text"
              className='input'
              value={user.first_name}
              onChange={(e) => {setUser({ ...user, first_name: e.target.value })
                                localStorage.setItem('first_name', e.target.value);
                        }}
              
            />
          </div>

          <div className='input-fields'>
            <label style={{marginLeft:"1px"}} htmlFor="last_name">Last Name:</label>
            <input
              id="last_name"
              type="text"
              className='input'
              value={user.last_name}
              onChange={(e) => {setUser({ ...user, last_name: e.target.value })
                                localStorage.setItem('last_name', e.target.value);
                        }}
              
            />
          </div>

          <div className='input-fields'>
            <label style={{marginLeft:"40px"}} htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className='input'
              value={user.email}
              onChange={(e) => {setUser({ ...user, email: e.target.value })
                                localStorage.setItem('email', e.target.value);
                              }}
             
            />
          </div>

          <div className='input-fields'>
            <label style={{marginLeft:"33px"}} htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="tel"
              className='input'
              value={user.phone}
              onChange={(e) => {setUser({ ...user, phone: e.target.value })
                                localStorage.setItem('phone', e.target.value);
                        }}
              style={{marginBottom:"20px"}}
            />
          </div>
        </div>
       <div className='box'>
        <h1 className='sub-heading'>Low Balance Alert: </h1>
        <div className='input-fields'>
          <label style={{marginLeft:"-25px"}}>Balance Value:</label>
          <input
            id="balance"
            type="text"
            className='input'
            value={user.balance}
            onChange={(e) => setUser({ ...user, balance: e.target.value })}
            style={{ width:'15%', marginBottom:"20px"}}
          />
           <LowBalanceTrigger
           triggerType="Low Balance Alert"
           userData={user}
           onSuccess={onSuccess}
           onError={onError}
          />
        </div>
        </div>

        <div className='box'>
        <h1 className='sub-heading'>Missed Call Alert:</h1>
        <div className='input-fields'>
          <label style={{marginLeft:"-40px"}}>Missed call from:</label>
          <input
            id="missed_call_from"
            type="tel"
            value={user.missed_call_from}
            onChange={(e) => setUser({ ...user, missed_call_from: e.target.value })}
            className='input'
            style={{ marginBottom:"20px"}}
          />
          <MissedCallTrigger
           triggerType="Missed Call Alert"
           userData={user}
           onSuccess={onSuccess}
           onError={onError}
          />
        </div>
        </div>

        <div className='box' style={{marginBottom:"90px"}}>
        <h1 className='sub-heading'>Data Pack Expiry Alert </h1>
        <div className='input-fields'>
          <label style={{marginLeft:"-34px"}}>Pack expiring in </label>
          <input
            id="data_pack_expiry_duration"
            className='input'
            type="number"
            value={user.data_pack_expiry_duration}
            onChange={(e) => setUser({ ...user, data_pack_expiry_duration: e.target.value })}
            style={{ width:'15%', marginBottom:"20px"}}
          />
          <label style={{marginLeft:'15px'}}>days</label>
         <DataExpiryTrigger
         triggerType="Data Pack Expiry Alert"
         userData={user}
         onSuccess={onSuccess}
         onError={onError}
         />
        </div>
        </div>
      </div>
    </div>
  );
};

export default TriggerGenerator;
