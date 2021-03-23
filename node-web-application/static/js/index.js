const twilioCredSubmit = document.getElementById("twilio-cred-submit");
const twilioStatus = document.getElementById("twilioStatus");

twilioCredSubmit.onclick = () => storeCredentials();

const storeCredentials = async () => {
    var url = '/storeWatsonCredentials';
    var payload = {
        trial_number: document.getElementById('trial_number').value,
        account_sid: document.getElementById('account_sid').value,
        auth_token: document.getElementById('auth_token').value
    }
    console.log(payload)

    var options = {
        method: 'post',
        body: JSON.stringify(payload)
    }

    console.log(options);

    await fetch(url, options).then(async (response) => {
        data = await response.json();
        console.log(data);
        // getTwilioStatus();
    });
};

const getTwilioStatus = async () => {
    await fetch('/getTwilioCredentials').then(async (response) => {
        data = await response.json();
        console.log(data);
        twilioStatus.innerHTML = data.status;
    });
};

const initPrint = async () => {
    console.log('imported')
};

