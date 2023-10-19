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
  onResetUserData: () => void;
}

const DataExpiryTrigger: React.FC<DataExpiryTriggerProps> = ({
  userData,
  onSuccess,
  onError,
  triggerType,
  onResetUserData,
}) => {
  const handleApiCall = async () => {
    try {
      const { email, phone, first_name, last_name, data_pack_expiry_duration } = userData;

      if (!(email || phone)) {
        toast.error("Either Email or Phone is required.", { duration: 5000, style: { padding: "30px" } });
      } else if (!data_pack_expiry_duration) {
        toast.error("Number of pack expiry days is required.", { duration: 5000, style: { padding: "30px" } });
      } else {
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
              "First Name": localStorage.getItem('first_name'),
              "Last Name": localStorage.getItem('last_name'),
              "contactcode": "91",
              "phone": localStorage.getItem('phone'),
              "email": localStorage.getItem('email'),
              "data_pack_expiry_duration": data_pack_expiry_duration,
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
          onResetUserData();
        } else {
          onError('Data Pack Expiry Alert', 'Trigger Initiation Failed');
        }
      }
    } catch (error) {
      onError(triggerType, `Error occurred during Trigger Initiation: ${error}`);
    }
  };

  return (
    <button className='button' style={{ marginLeft: '187px' }} onClick={handleApiCall}>
      Initiate trigger
    </button>
  );
};

export default DataExpiryTrigger;
