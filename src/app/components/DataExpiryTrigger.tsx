import React from 'react';
import { toast } from 'react-hot-toast';

interface DataExpiryTriggerProps {
  triggerType: string;
  userData: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    data_pack_expiry_duration: string;
  };
  onSuccess: (triggerType: string) => void;
  onError: (triggerType: string, errorMessage: string) => void;
}

const DataExpiryTrigger: React.FC<DataExpiryTriggerProps> = ({
  userData,
  onSuccess,
  onError,
  triggerType,
}) => {
  const handleApiCall = async () => {
    try {
      const { email, phone, first_name, last_name, data_pack_expiry_duration } = userData;

      if (email || phone) {
        const event_Category = 'MOCKTEL_DATA_PACK_ALERT';
        const event_Action = 'MOCKTEL_DATA_PACK_ALERT';
        const event_Label = 'MOCKTEL_DATA_PACK_ALERT';
        const event_Type = 'web_push';

        const requestBody = {
          websiteid: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          web_subs_id: 'c22f66b0-fba7-11ed-b4b5-c9744cec19b9',
          authkey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlX2lkIjo2MDEsImlhdCI6MTY4NzM2MDQyMX0.-SJjlDL2kRhYSVsHQAmelmxoFBW4BPAHKoYJKxJyJwY',
          event: {
            eventcategory: event_Category,
            eventaction: event_Action,
            eventlabel: event_Label,
            event_type: event_Type,
            contact_variables: {
              'First Name': first_name,
              'Last Name': last_name,
              contactcode: '91',
              phone: phone,
              email: email,
              data_pack_expiry_duration: data_pack_expiry_duration,
            },
          },
        };

        const response = await fetch(
          'https://mdm.mobilytixdigital.com/api/v1/registerwebcustomevent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          onSuccess('Data Pack Expiry Alert');
        } else {
          onError('Data Pack Expiry Alert', 'Form submission failed.');
        }
      } else {
        toast.error('Either Email or Phone is required.');
      }
    } catch (error) {
      onError(triggerType, `Error occurred during form submission: ${error}`);
    }
  };

  return (
    <button className='button' style={{ marginLeft: '187px' }} onClick={handleApiCall}>
      Initiate the trigger
    </button>
  );
};

export default DataExpiryTrigger;
