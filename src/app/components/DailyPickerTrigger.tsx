import { Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';

interface DailyPickerTriggerProps {
  triggerType: string;
  userData: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    notification_day: string;
  };
  onSuccess: (triggerType: string) => void;
  onError: (triggerType: string, errorMessage: string) => void;
  onResetUserData: () => void;
}

const DailyPickerTrigger: React.FC<DailyPickerTriggerProps> = ({ userData, onSuccess, onError, triggerType,onResetUserData }) => {
  const handleApiCall = async () => {
    try {
      const { email, phone, first_name, last_name, notification_day } = userData;

      if (!(email || phone)) {
        toast.error('Either Email or Phone is required.', { duration: 5000, style: { padding: "30px" } });
      } else if (!notification_day) {
        toast.error('Pick a Day.', { duration: 5000, style: { padding: "30px" } });
      } else {
        const event_Category = 'MOCKTEL_DAILY_NOTIFICATION';
        const event_Action = 'MOCKTEL_DAILY_NOTIFICATION';
        const event_Label = 'MOCKTEL_DAILY_NOTIFICATION';
        const event_Type = 'web_push';

        const requestBody = {
          websiteid: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          web_subs_id: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          authkey: 'your_auth_key', 
          event: {
            eventcategory: event_Category,
            eventaction: event_Action,
            eventlabel: event_Label,
            event_type: event_Type,
            contact_variables: {
              "First Name": localStorage.getItem('first_name'),
              "Last Name": localStorage.getItem('last_name'),
              "contactcode": "91",
              "phone": localStorage.getItem('phone'),
              "email": localStorage.getItem('email'),
              "notification_day": notification_day,
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
          onSuccess('Daily Alert');
          onResetUserData();
        } else {
          onError('Daily Alert', 'Trigger Initiation Failed');
        }
      }
    } catch (error) {
      onError(triggerType, `Error occurred during Trigger Initiation: ${error}`);
    }
  };

  return (
    <span style={{paddingLeft:"70px"}}>
    <Button variant="contained" onClick={handleApiCall}   style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#1565c0',
    }} className="text-xs xs:text-base sm:text-xs md:text-lg lg:text-xl xl:text-2xl sm:pl-1 md:pl-4 lg:pl-6 xl:pl-8">Initiate trigger</Button>
    </span>
  );
};

export default DailyPickerTrigger;
