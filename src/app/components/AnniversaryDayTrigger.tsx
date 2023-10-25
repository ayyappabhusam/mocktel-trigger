import { Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';

interface AnniversaryDayTriggerProps {
  triggerType: string;
  userData: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    anniversary_date: Date | null;
  };
  onSuccess: (triggerType: string) => void;
  onError: (triggerType: string, errorMessage: string) => void;
  onResetUserData: () => void;
}

function formatDateToMMDDYYYY(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${month}-${day}-${year}`;
  }

const AnniversaryDayTrigger: React.FC<AnniversaryDayTriggerProps> = ({ userData, onSuccess, onError, triggerType, onResetUserData }) => {
  const handleApiCall = async () => {
    try {
      const { email, phone, first_name, last_name, anniversary_date} = userData;

      const isEmailValid = email ? /^\S+@\S+\.\S+$/.test(email) : true;
      const isFirstValid = first_name ? /^[A-Za-z\s]+$/.test(first_name) : true;
      const isLastValid = last_name ? /^[A-Za-z\s]+$/.test(last_name) : true;
      

      if (!isEmailValid) {
          toast.error('Enter a valid email address.', { duration: 5000, style: { padding: "30px" } });
      } else if (!(email || phone)) {
        toast.error('Either Email or Phone is required.', {duration:5000, style:{padding:"30px"}});
      } else if (!isFirstValid) {
          toast.error('First Name should contain only alphabets.', { duration: 5000, style: { padding: "30px" } });
      } else if (!isLastValid) {
        toast.error('Last Name should contain only alphabets.', { duration: 5000, style: { padding: "30px" } });
      } else if (!anniversary_date) {
          toast.error('Pick a Date.', { duration: 5000, style: { padding: "30px" } });
      } else {
        const formattedAnniversaryDate = anniversary_date instanceof Date ? formatDateToMMDDYYYY(anniversary_date) : '';
        const event_Category = 'MOCKTEL_ANNIVERSARY_NOTIFICATION';
        const event_Action = 'MOCKTEL_ANNIVERSARY_NOTIFICATION';
        const event_Label = 'MOCKTEL_ANNIVERSARY_NOTIFICATION';
        const event_Type = 'web_push';

        var PhoneString = userData.phone
        var countryCode = PhoneString.split(" ")[0]
        var phoneNumber = PhoneString.split(" ").slice(1).join(" ")
        countryCode = countryCode.substring(1)
        phoneNumber = phoneNumber.replace(/\s/g, "");

        const requestBody = {
          websiteid: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          web_subs_id: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          authkey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlX2lkIjo2MDEsImlhdCI6MTY4NzM2MDQyMX0.-SJjlDL2kRhYSVsHQAmelmxoFBW4BPAHKoYJKxJyJwY',
          event: {
            eventcategory: event_Category,
            eventaction: event_Action,
            eventlabel: event_Label,
            event_type: event_Type,
            contact_variables: {
              "First Name": localStorage.getItem('first_name'),
              "Last Name": localStorage.getItem('last_name'),
              "contactcode": countryCode,
              "phone": phoneNumber,
              "email": localStorage.getItem('email'),
              "anniversary_date": formattedAnniversaryDate,
            },
          },
        };

        const response = await fetch('https://mdm.mobilytixdigital.com/api/v1/registerwebcustomevent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          onSuccess('Anniversary Day Alert');
          onResetUserData();
        } else {
          onError('Anniversary Day Alert', 'Trigger Initiation Failed');
        }
      }
    } catch (error) {
      onError(triggerType, `Error occurred during Trigger Initiation: ${error}`);
    }
  };

  return (
    <span className="xs:pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-14">
    <Button variant="contained" style={{padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#1565c0', 
    minWidth: '100px'
    }}
    className="text-xs xs:text-base sm:text-xs md:text-lg lg:text-xl xl:text-2xl sm:pl-1 md:pl-4 lg:pl-6 xl:pl-8"
     onClick={handleApiCall}>
      Initiate trigger
    </Button>
    </span>
  );
};

export default AnniversaryDayTrigger;
