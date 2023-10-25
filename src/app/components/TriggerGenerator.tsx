"use client";
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './TriggerGenerator.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input'
import LowBalanceTrigger from './LowBalanceTrigger';
import MissedCallTrigger from './MissedCallTrigger';
import DataExpiryTrigger from './DataExpiryTrigger';
import DailyPickerTrigger from './DailyPickerTrigger';
import AnniversaryDayTrigger from './AnniversaryDayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
interface User {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    balance: string;
    missed_call_from: string;
    countryCode: string;
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
        notification_day: '',
        anniversary_date: null,
        countryCode: '',
    });

    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');

    

    const openComponent = (option: string) => {
        setSelectedOption(option);
    };

    const closeComponent = () => {
        setSelectedOption('');
    }

    const onSuccess = (triggerType: string) => {
        toast.success(`Trigger initiated: ${triggerType}`, { duration: 5000, style: { padding: "30px" } });
        setLoading(false);

    };

    const onError = (triggerType: string, errorMessage: string) => {
        toast.error(`Trigger initiation failed (${triggerType}): ${errorMessage}`, { duration: 5000, style: { padding: "30px" } });
        setLoading(false);

    };



    useEffect(() => {
        const storedFirstName = localStorage.getItem('first_name') || '';
        const storedLastName = localStorage.getItem('last_name') || '';
        const storedEmail = localStorage.getItem('email') || '';
        const storedPhone = localStorage.getItem('phone') || '';
        const storedcountryCode = localStorage.getItem('countryCode') || '';


        setUser((prevUser) => ({
            ...prevUser,
            first_name: storedFirstName,
            last_name: storedLastName,
            email: storedEmail,
            phone: storedPhone,
            countryCode: storedcountryCode,
        }
        ));


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

    const renderSelectedComponent = () => {
        if (selectedOption === 'LowBalance') {
            return (
                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mt-10 mb-20'>
                    <div className="relative cursor-pointer text-2xl text-gray-500" onClick={closeComponent}>
                        <FontAwesomeIcon className="float-right" icon={faTimes} />
                    </div>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Low Balance Alert</h1>
                    <div className='relative flex flex-col' style={{ paddingLeft: "1rem" }}>
                        <div className="flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                            <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Balance Value:</label>

                            <input
                                id="balance"
                                type="text"
                                className='text-sm sm:text-base w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4'
                                value={`$${user.balance}`}
                                onChange={(e) => {
                                    const balance = e.target.value.replace('$', '');
                                    setUser({ ...user, balance });
                                }}
                                style={{ width: '20%', marginLeft: "20px" }}
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
                </div>
            );
        }

        if (selectedOption === "MissedCall") {
            return (
                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mt-10 mb-20'>
                    <div className="relative cursor-pointer text-2xl text-gray-500" onClick={closeComponent}>
                        <FontAwesomeIcon className="float-right" icon={faTimes} />
                    </div>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Missed Call Alert</h1>
                    <div className='relative flex flex-col' style={{ paddingLeft: "1rem" }}>
                        <div className="flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                        <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Missed call from:</label>
                        <MuiTelInput
                            placeholder='+91 9876543210'
                            value={user.missed_call_from}
                            defaultCountry='IN'
                            onChange={(e) => setUser({ ...user, missed_call_from: e })}
                            className='text-sm sm:text-base relative w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4'
                            inputProps={{
                                style: {
                                    backgroundColor: 'white',
                                    height: '15px',
                                     width: '100%' 
                                }
                            }}
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
                </div>
            );
        }

        if (selectedOption === "DataExpiry") {
            return (
                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mt-10 mb-20'>
                    <div className="relative cursor-pointer text-2xl text-gray-500" onClick={closeComponent}>
                        <FontAwesomeIcon className="float-right" icon={faTimes} />
                    </div>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Data Pack Expiry Alert </h1>
                    <div className='relative flex flex-col' style={{ paddingLeft: "1rem" }}>
                        <div className="flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                        <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Pack expiring in </label>
                        <input
                            id="data_pack_expiry_duration"
                            className='text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4'
                            type="text"
                            value={user.data_pack_expiry_duration}
                            onChange={(e) => setUser({ ...user, data_pack_expiry_duration: e.target.value })}
                            style={{ width: '15%', marginLeft:"10px" }}
                        />
                        <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" style={{ marginLeft: '15px' }}>days</label>
                        <DataExpiryTrigger
                            triggerType="Data Pack Expiry Alert"
                            userData={user}
                            onSuccess={onSuccess}
                            onError={onError}
                            onResetUserData={resetUserData}
                        />
                    </div>
                </div>
                </div>
            )
        }

        if (selectedOption === "AnniversaryAlert") {
            return (
                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mt-10 mb-20' style={{ height: "140px !important" }}>
                    <div className="relative cursor-pointer text-2xl text-gray-500" onClick={closeComponent}>
                        <FontAwesomeIcon className="float-right" icon={faTimes} />
                    </div>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Anniversary Date Alert</h1>
                    <div className='relative flex flex-col' style={{ paddingLeft: "1rem" }}>
                        <div className="flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                        <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Pick a date </label>

                        <span className="input-date-picker-container" style={{ paddingLeft: "13px" }}>
                            <DatePicker
                                selected={user.anniversary_date}
                                onChange={(date) => {
                                    setUser({ ...user, anniversary_date: date });
                                }}
                                dateFormat="MM/dd/yyyy"
                                className='text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4'
                                showYearDropdown
                                yearDropdownItemNumber={10}
                            />
                            <AnniversaryDayTrigger
                                triggerType="Anniversary Day Alert"
                                userData={user}
                                onSuccess={onSuccess}
                                onError={onError}
                                onResetUserData={resetUserData}
                            />
                        </span>

                    </div>
                    </div>
                </div>
            )
        }

        if (selectedOption === "DailyAlert") {
            return (
                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mt-10 mb-20' style={{ marginBottom: "90px" }}>
                    <div className="relative cursor-pointer text-2xl text-gray-500" onClick={closeComponent}>
                        <FontAwesomeIcon className="float-right" icon={faTimes} />
                    </div>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Daily Alert </h1>
                    <div className='relative flex flex-col' style={{ paddingLeft: "1rem" }}>
                        <div className="flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                        <label className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Pick a day </label>
                        <select
                            id="notification_day"
                            className='text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4'
                            value={user.notification_day}
                            onChange={(e) => setUser({ ...user, notification_day: e.target.value })}
                            style={{ width: '25%', marginLeft:"10px" }}
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
            )
        }
        return null;
    }

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-10 text-center">
                MobiLytix Trigger Generator
            </h1>
            <div >

                <div className='bg-slate-200 p-4 mx-10 sm:mx-20 md:mx-30 lg:mx-60 xl:mx-80 rounded-lg shadow-md mb-20'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-5 mx-5'>Contact Details</h1>

                    <div className="flex flex-col md:flex-row w-full max-w-screen-xl px-4 mb-2 mx-4">
                        <div className="w-full sm:w-1/2 p-2">
                            <label htmlFor="first_name" className="mb-2 sm:text-md tracking-wide text-black">
                                First Name:
                            </label>
                            <div className="relative">
                                <input
                                    id="first_name"
                                    type="text"
                                    value={user.first_name}
                                    onChange={(e) => {
                                        const trimmedValue = e.target.value.trim();
                                        setUser({ ...user, first_name: trimmedValue });
                                        localStorage.setItem('first_name', trimmedValue);
                                    }}
                                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4"
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 p-2">
                            <label htmlFor="last_name" className="mb-2 sm:text-md tracking-wide text-black">Last Name:</label>
                            <div className="relative">
                                <input
                                    id="last_name"
                                    type="text"
                                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4"
                                    value={user.last_name}
                                    onChange={(e) => {
                                        const trimmedValue = e.target.value.trim();
                                        setUser({ ...user, last_name: trimmedValue });
                                        localStorage.setItem('last_name', trimmedValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full max-w-screen-xl px-4 mb-2 mx-4">
                        <div className="w-full sm:w-1/2 p-2">
                            <label htmlFor="email" className="mb-2 sm:text-md tracking-wide text-black">Email:</label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="text"
                                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4"
                                    value={user.email}
                                    onChange={(e) => {
                                        const trimmedValue = e.target.value.trim();
                                        setUser({ ...user, email: trimmedValue });
                                        localStorage.setItem('email', trimmedValue);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 p-2">
                            <label htmlFor="phone" className="mb-2 sm:text-md tracking-wide text-black">Phone:</label>
                            <div className="relative">
                                <MuiTelInput
                                    placeholder='+91 9876543210'
                                    defaultCountry='IN'
                                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
                                    value={user.phone}
                                    onChange={(e) => {
                                        setUser({ ...user, phone: e });
                                        localStorage.setItem('phone', e);
                                    }}
                                    inputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                            height: '15px',
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full max-w-screen-xl px-4 mb-2 mx-4">
                        <div className="w-full sm:w-1/2 p-2">
                            <label htmlFor="selectedOption" className="mb-2 sm:text-md tracking-wide text-black">
                                Select the Trigger:
                            </label>
                            <div className="relative">
                                <select
                                    id="selectedOptione"
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-3 pr-2 pl-4"
                                >
                                    <option value="">Select a Trigger</option>
                                    <option value="LowBalance">Low Balance Alert</option>
                                    <option value="MissedCall">Missed Call Alert</option>
                                    <option value="DataExpiry">Data Expiry Alert</option>
                                    <option value="AnniversaryAlert">Anniversary Date Alert</option>
                                    <option value="DailyAlert">Daily Alert</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                {selectedOption && renderSelectedComponent()}
            </div>
        </div>
    );
};

export default TriggerGenerator;
