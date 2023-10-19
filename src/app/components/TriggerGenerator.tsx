"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './TriggerGenerator.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LowBalanceTrigger from './LowBalanceTrigger';
import MissedCallTrigger from './MissedCallTrigger';
import DataExpiryTrigger from './DataExpiryTrigger';
import DailyPickerTrigger from './DailyPickerTrigger';
import AnniversaryDayTrigger from './AnniversaryDayTrigger';

interface User {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    balance: string;
    missed_call_from: string;
    data_pack_expiry_duration: string;
    notification_day: string;
    anniversary_date: Date | null; 
}

const TriggerGenerator = () => {
    const [user, setUser] = useState<User>({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        balance: '',
        missed_call_from: '',
        data_pack_expiry_duration: '',
        notification_day:'',
        anniversary_date: null,
    });

    const [loading, setLoading] = useState(true);

    const onSuccess = (triggerType: string) => {
        toast.success(`Trigger initiated: ${triggerType}`, {duration:5000, style:{padding:"30px"}});
        setLoading(false);
    };

    const onError = (triggerType: string, errorMessage: string) => {
        toast.error(`Trigger initiation failed (${triggerType}): ${errorMessage}`, {duration:5000, style:{padding:"30px"}});
        setLoading(false);
    };

    useEffect(() => {
        const storedFirstName = localStorage.getItem('first_name') || '';
        const storedLastName = localStorage.getItem('last_name') || '';
        const storedEmail = localStorage.getItem('email') || '';
        const storedPhone = localStorage.getItem('phone') || '';
    
        setUser((prevUser) => ({
          ...prevUser,
          first_name: storedFirstName,
          last_name: storedLastName,
          email: storedEmail,
          phone: storedPhone,
        }));
      }, []);

    const resetUserData = () => {
        setUser((prevUser) => ({
            ...prevUser,
            balance: '',
            data_pack_expiry_duration: '',
            missed_call_from: '',
            notification_day: '',
            anniversary_date: null,
        }));
    }

    return (
        <div>
            <h1 className='heading'>
                MobiLytix Trigger Generator
            </h1>
            <div >
                <div className='box'>
                    <h1 className='sub-heading'>Contact Details</h1>

                    <div style={{ marginLeft: "200px" }}>
                        <label htmlFor="first_name">First Name:</label>
                        <input
                            id="first_name"
                            type="text"
                            className='input'
                            value={user.first_name}
                            onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setUser({ ...user, first_name: trimmedValue });
                                localStorage.setItem('first_name', trimmedValue);
                            }}

                        />
                    </div>

                    <div className='input-fields'>
                        <label style={{ marginLeft: "1px" }} htmlFor="last_name">Last Name:</label>
                        <input
                            id="last_name"
                            type="text"
                            className='input'
                            value={user.last_name}
                            onChange={(e) => {
                                const trimmedValue = e.target.value.trim(); 
                                setUser({ ...user, last_name: trimmedValue });
                                localStorage.setItem('last_name', trimmedValue);
                            }}

                        />
                    </div>

                    <div className='input-fields'>
                        <label style={{ marginLeft: "40px" }} htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="text"
                            className='input'
                            value={user.email}
                            onChange={(e) => {
                                const trimmedValue = e.target.value.trim(); 
                                setUser({ ...user, email: trimmedValue });
                                localStorage.setItem('email', trimmedValue);
                            }}

                        />
                    </div>

                    <div className='input-fields'>
                        <label style={{ marginLeft: "33px" }} htmlFor="phone">Phone:</label>
                        <input
                            placeholder='9999999999'
                            id="phone"
                            type="tel"
                            className='input'
                            value={user.phone}
                            onChange={(e) => {
                                const trimmedValue = e.target.value.trim(); 
                                setUser({ ...user, phone: trimmedValue });
                                localStorage.setItem('phone', trimmedValue);
                            }}
                            style={{ marginBottom: "20px" }}
                        />
                    </div>
                </div>
                <div className='box'>
                    <h1 className='sub-heading'>Low Balance Alert </h1>
                    <div className='input-fields'>


                        <label style={{ marginLeft: "-25px" }}>Balance Value:</label>

                        <input

                            id="balance"
                            type="text"
                            className='input'
                            value={`$${user.balance}`}
                            onChange={(e) => {
                                const balance = e.target.value.replace('$', '');
                                setUser({ ...user, balance });
                                
                            }}
                            style={{ width: '15%', marginBottom: "20px" }}
                        />

                        <LowBalanceTrigger
                            triggerType="Low Balance Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                </div>

                <div className='box'>
                    <h1 className='sub-heading'>Missed Call Alert</h1>
                    <div className='input-fields'>
                        <label style={{ marginLeft: "-40px" }}>Missed call from:</label>
                        <input
                            placeholder='9999999999'
                            id="missed_call_from"
                            type="tel"
                            value={user.missed_call_from}
                            onChange={(e) =>  {const trimmedValue = e.target.value.trim(); 
                                setUser({ ...user, missed_call_from: trimmedValue });
                            }}
                            className='input'
                            style={{ marginBottom: "20px" }}
                        />
                        <MissedCallTrigger
                            triggerType="Missed Call Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                </div>

                <div className='box'>
                    <h1 className='sub-heading'>Data Pack Expiry Alert </h1>
                    <div className='input-fields'>
                        <label style={{ marginLeft: "-34px" }}>Pack expiring in </label>
                        <input
                            id="data_pack_expiry_duration"
                            className='input'
                            type="text"
                            value={user.data_pack_expiry_duration}
                            onChange={(e) => setUser({ ...user, data_pack_expiry_duration: e.target.value })}
                            style={{ width: '15%', marginBottom: "20px" }}
                        />
                        <label style={{ marginLeft: '15px' }}>days</label>
                        <DataExpiryTrigger
                            triggerType="Data Pack Expiry Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                </div>

                <div className='box' style={{height:"140px !important"}}>
                <h1 className='sub-heading'>Anniversary Date Alert</h1>
                <div className='input-fields'>
                    <label style={{ marginLeft: "-34px" }}>Pick a date </label>
                    
                    <div className="input-date-picker-container" style={{ marginTop: "-30px", width: "fit-content", marginLeft: "55px"}}>
                        <DatePicker
                            selected={user.anniversary_date}
                            onChange={(date) => {
                                setUser({ ...user, anniversary_date: date });
                            }}
                            dateFormat="MM/dd/yyyy"
                            className='input-date-picker'
                            showYearDropdown 
                            yearDropdownItemNumber={10} 
                        />
                        <AnniversaryDayTrigger
                            triggerType="Daily Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                    
                    </div>
                    </div>

                <div className='box' style={{ marginBottom: "90px" }}>
                    <h1 className='sub-heading'>Daily Alert </h1>
                    <div className='input-fields'>
                        <label style={{ marginLeft: "-34px" }}>Pick a day </label>
                        <select
                            id="notification_day"
                            className='input'
                            value={user.notification_day}
                            onChange={(e) => setUser({ ...user, notification_day: e.target.value })}
                            style={{ width: '25%', marginBottom: "20px" }}
                        >
                            <option value="">Select a day</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                        <label style={{ marginLeft: '15px' }}>days</label>
                        <DailyPickerTrigger
                            triggerType="Daily Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TriggerGenerator;
