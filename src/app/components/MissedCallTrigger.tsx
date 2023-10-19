import React from 'react';
import { toast } from 'react-hot-toast';

interface MissedCallTriggerProps {
  triggerType: string;
  userData: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    missed_call_from: string;
  };
  onSuccess: (triggerType: string) => void;
  onError: (triggerType: string, errorMessage: string) => void;
}

const MissedCallTrigger: React.FC<MissedCallTriggerProps> = ({ userData, onSuccess, onError, triggerType }) => {
  const handleApiCall = async () => {
    try {
      const {
        email,
        phone,
        first_name,
        last_name,
        missed_call_from,
      } = userData;

      if (!(email || phone)) {
        toast.error('Either Email or Phone is required.');
      } else if (!missed_call_from) {
        toast.error('Missed Call Number is required.');
      } else {
        const event_Category = 'MOCKTEL_MISSED_CALL_ALERT';
        const event_Action = 'MOCKTEL_MISSED_CALL_ALERT';
        const event_Label = 'MOCKTEL_MISSED_CALL_ALERT';
        const event_Type = 'web_push';

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
              "contactcode": "91",
              "phone": localStorage.getItem('phone'),
              "email": localStorage.getItem('email'),
              "missed_call_from": missed_call_from
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
          onSuccess('Missed call Alert');
        } else {
          onError('Missed call Alert', 'Form submission failed.');
        }
      }
    } catch (error) {
      onError(triggerType, `Error occurred during form submission: ${error}`);
    }
  };

  return (
    <button className='button' style={{ marginLeft: "88px" }} onClick={handleApiCall}>Initiate the trigger</button>
  );
};

export default MissedCallTrigger;
