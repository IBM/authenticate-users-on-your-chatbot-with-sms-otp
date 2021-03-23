# Authenticate users on your chatbot with SMS one time passcode

Chatbots are prevelent everywhere. Some conversations are confidential and hence chatbots have to verify authenticity of users. Sending an OTP via SMS is a popular way to identify a user. 

In this code pattern we will provide steps to build a chatbot apllication that authenticates users through an SMS one time passcode (OTP). An insurance customer can use chatbot to get more information on his/her insurance policy. We will demonstate the usage of Watson Assistant, Cloud Functions and Custom APIs to build this application.

When you have completed this code pattern, you will understand how to:

* Build conversational interfaces into any application, device, or channel.
* Run your application code without servers.
* Build APIs to authenticate users on your chatbot.
* Make external API calls through Watson Assistant.

![architecture](doc/source/images/architecture.png)

## Flow

1. User registers themselves on the insurance portal
2. User data is stored in the database
3. The policy details are redirected to twilio
4. Twilio sends an SMS to the user’s phone number with the policy details
5. User asks confidential info related to the policy by entering the policy number
6. The Query is sent to watson assistant
7. Watson Assistant sends out the request to cloud functions
8. Cloud function makes an API call to the custom API
9. The user’s phone number is searched in the database and redirected to twilio
10. Twilio sends an SMS with OTP valid for 5 mins to the user
11. User enters the OTP
12. The OTP is sent to watson assistant
13. Watson assistant sends out the OTP to cloud functions
14. Cloud function makes an API call to the custom API with the user entered OTP
15. OTP is validated in the backend
16. If the OTP is valid, the user requested confidential info is fetched form the database 
17. Cloud function returns the confidential info to Watson Assistant
18. Watson Assistant displays the user requested confidential info
19. User can see the confidential info in the Web UI

# Watch the Video

Coming Soon.
<!-- [![video](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg) -->

# Steps

1. [Clone the repo](#1-clone-the-repo).
2. [Create a Twilio service](#2-create-a-twilio-service).
3. [Deploy Custom APIs on Cloud](#3-deploy-custom-apis-on-cloud).
4. [Create a Cloud Function Action](#4-create-a-cloud-function-action).
5. [Create Watson Assistant Services](#5-create-watson-assistant-services).
6. [Import the Watson Assistant workspace](#6-import-the-watson-assistant-workspace).
7. [Configure Watson Assistant with Cloud Function URL](#7-configure-watson-assistant-with-cloud-function-url).
8. [Run the Web Application](#8-run-the-web-application).

### 1. Clone the repo

Clone the `authenticate-users-on-your-chatbot-with-sms-otp` repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/authenticate-users-on-your-chatbot-with-sms-otp.git
```

### 2. Create Twilio service

Twlio is a SaaS offering that provides APIs to make and receive calls or text messages. As there are no APIs from WhatsApp directly availabe to send and receive WhatsApp messages programmatically, you will learn how to use Twilio's messaging service APIs that provides gateway to communicate with WhatsApp programmatically. Lets start by creating a free Twilio service.

- Create a free Twilio service here: <https://www.twilio.com/try-twilio>.

- Enter the your details to signup as shown.

    ![twilio-signup](doc/source/images/createTwilio.png)

- Once you create a twilio service, you will have to verify your email id as well as your phone number.

- To verify your email id, visit your registered email id and you will see a mail from twilio with a verification link, go ahead and verify.

    ![](doc/source/images/verifyTwilio.png)

- Once email id is verified you will be prompted to enter your phone number, submit that and you will get an OTP on your registered number, enter that back to verify.

    ![](doc/source/images/verifyMobileTwilio.png)

- On successful verification you should see a welcome greeting message, additionally you will see a question **Do you write code?**, select **Yes** to proceed.

    ![](doc/source/images/twilioWelcome.png)

- The second question asked to you would be **What is your preferred language?**, select **Python** to proceed.

    ![](doc/source/images/twilioWelcome2.png)

- Third question asked to you would be **What is your goal today?**, select **Use Twilio in a project** to proceed.

    ![](doc/source/images/twilioWelcome3.png)

- The final question asked to you would be **What do you want to do first?**, select **Skip to dashboard** to proceed.

    ![](doc/source/images/twilioWelcome4.png)
 
- You will need a twilio `Trial Number` to send messages through the OTP. Click on **Get a Trial Number** as shown.

    ![](doc/source/images/twilio-credentials-from-twilio-console.png)

- Click on **Choose this Number** to continue. 

    ![](doc/source/images/twilioNo.png)

- A confirmation will be displayed once the number is generated, click on **Done**.

    ![](doc/source/images/congrats.png)

- To establish connection between the APIs and Twilio we need to get the `trial_phone_number`, `account_sid` and `auth_token` from Twilio. 

- Visit <https://www.twilio.com/console> and expand the **Project Info** tab. You will see the `TRIAL NUMBER`, `ACCOUNT SID` and `AUTH TOKEN`, copy it in some notepad as it will be used in [Step 3](#3-deploy-custom-apis-on-cloud).

    ![](doc/source/images/credentials-twilio.png)

- At this point, you should have the `TRIAL NUMBER`, `ACCOUNT SID` and `AUTH TOKEN` from Twilio service.

- Now lets deploy the custom APIs and configure twilio credentials.

### 3. Deploy Custom APIs on Cloud

- Before you proceed, make sure you have installed [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started&locale=en-US) in your deployment machine.

- From the cloned repo, goto **custom-apis-for-authentication** directory in terminal, and run the following commands to deploy the Application to IBM Cloud Foundry.

    ```bash
    $ cd custom-apis-for-authentication/
    ```

* Log in to your IBM Cloud account, and select an API endpoint.
    ```bash
    $ ibmcloud login
    ```

>NOTE: If you have a federated user ID, instead use the following command to log in with your single sign-on ID.

    ```bash
    $ ibmcloud login --sso
    ```

* Target a Cloud Foundry org and space:
    ```bash
    $ ibmcloud target --cf
    ```

* From within the _custom-apis-for-authentication_ directory push your app to IBM Cloud.
    ```bash
    $ ibmcloud cf push otp-api
    ```

- The [manifest.yml](custom-apis-for-authentication/manifest.yml) file will be used here to deploy the application to IBM Cloud Foundry.

- On Successful deployment of the application you will see something similar on your terminal as shown.

    <pre><code>Invoking 'cf push'...

    Pushing from manifest to org manoj.jahgirdar@in.ibm.com / space dev as manoj.jahgirdar@in.ibm.com...

    ...

    Waiting for app to start...

    name:              otp-api
    requested state:   started
    routes:            <b>otp-api.xx-xx.mybluemix.net </b>
    last uploaded:     Sat 16 May 18:05:16 IST 2020
    stack:             cflinuxfs3
    buildpacks:        python

    type:            web
    instances:       1/1
    memory usage:    512M
    start command:   python app.py
        state     since                  cpu     memory           disk           details
    #0   <b>running</b>   2020-05-16T12:36:15Z   12.6%   116.5M of 512M   796.2M of 1
    </code></pre>

* Once the app is deployed you can visit the `routes` to launch the application.

>Example: http://otp-api.xx-xx.mybluemix.net

- At this point, you will have successfully deployed the framework on IBM Cloud. Now lets access it and see how it looks like.

- Visit the `URL` in your browser to access the framework.

    >Example: http://otp-api.xx-xx.mybluemix.net

    ![](doc/source/images/screenshot.png)

- Click on the **Add Twilio Credentials** button and enter the `TRIAL NUMBER`, `ACCOUNT SID` and `AUTH TOKEN` copied in the previous step.

    ![](doc/source/images/add-twilio.png)

- Once the credentials are entered you will see the status as `Configured` as shown.

    ![](doc/source/images/twilio-conf.png)

### 4. Create a Cloud Function Action
- Login to IBM Cloud, and create a [Create a cloud function action](https://cloud.ibm.com/functions/create/action).
* Enter a cloud function name and select Python 3.7 for runtime environment and press create.
![createCF](doc/source/images/createCF.png)

* You will see a hello world code in the canvas
![helloWorld](doc/source/images/helloWorld.png)

* Copy the code from [here](cloud-function-action/otp-auth.py) and replace it in the canvas as shown.
![cloudCode](doc/source/images/cloudCode.png)

* Replace the `APIENDPOINT` in the code with the URL that you copied to your notepad in [Step 5](#5-deploy-custom-apis-on-cloud).
>Example: APIENDPOINT = "http://158.123.197.53:32000"

* Click on **Endpoints** on the left panel and select **Enable as Web Action** finally click on **Save**.
![cfEnable](doc/source/images/cfEnable.png)

* Finally Copy the Public Link which is displayed.
![cfCopy](doc/source/images/cfCopy.png)
>NOTE: The Above URL should end with .json if it is not ending with .json please append .json at the end of the URL. 
**NOTE: This URL is Important, please save it in any notepad since it will be used in subsequent steps.**

### 5. Create Watson Assistant services

* Create a [Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant) service.
![createWA](doc/source/images/createWA.png)

* Click **Launch Watson Assistant** to launch console.
![launchWA](doc/source/images/launchWA.png)

### 6. Import the Watson Assistant workspace
* Inside Watson Assistant Console click **Skills icon** on the left panel and then click **Create skill**.
![createSkill](doc/source/images/createSkill.png)

* Select **Dialog Skill** and click next.
![dialogSkill](doc/source/images/dialogSkill.png)

* Select **Upload** and choose `watson-assistant-skills/skill-OTP-Authentication-New.json` from the project directory and click **Upload.**
![uploadSkill](doc/source/images/uploadSkill.png)

* After this you will see that a new Watson Assistant skill has been created.

* Click **Assistant icon** from left panel and click **Create Assistant.**
![createAssistant](doc/source/images/createAssistant.png)

* Enter a Name and description for the Assistant and click **Create.**
![nameAssist](doc/source/images/nameAssist.png)

* Click **Add dialog Skill.**
![clickDialog](doc/source/images/clickDialog.png)

* Select the **OTP Authentication New** skill that we just uploaded.
![selectSkill](doc/source/images/selectSkill.png)

* Now you can see that skill has been added to the assistant. Now navigate back to Assistants page by clicking the back button as shown below.
![showSkill](doc/source/images/showSkill.png)

* Click the three dots at the side of OTP Auth skill to see the dropdown menu and select **Settings**.
![getCredentials](doc/source/images/getCredentials.png)

* Copy the Assistant ID, Assistant URL and the API key and store them in a file as they will be used in subsequent steps.
![copyCreds](doc/source/images/copyCreds.png)
>Note: Copy only the hostname in Assiatant URL and not the complete path. eg-
`https://api.eu-gb.assistant.watson.cloud.ibm.com/`

### 7. Configure Watson Assistant with Cloud Function URL
* Go to the Watson Assistant skills and select **OTP Authentication New**
![chooseSkill](doc/source/images/chooseSkill.png)

* Select Options>Webhooks from the left panel and paste the URL copied in [Step 4](#4-create-a-cloud-function-action) in the text box.
![enterWebhook](doc/source/images/enterWebhook.png)

### 8. Run the Web Application
* Open the repository in your terminal and navigate to `node-web-application` directory.
* Start the app by running `npm install`, followed by `node server.js`.
* Open at `localhost:8080` in your browser. As the authentication has not been done yet, you will be redirected to `/auth`.
* Click Add Credentials and Enter the required credentials that you copied in [Step 6](#6-import-the-watson-assistant-workspace) and press **Submit**.
![auth](doc/source/images/auth.png)
* After successful authentication user will be redirected to the chatbot.
* Click on New User to start using the app.
![newUser](doc/source/images/newUser.png)
* Select Any Policy you like and click **Buy Now.**
![selectPolicy](doc/source/images/selectPolicy.png)
* Enter your details and click **Submit.**
![buyPolicy](doc/source/images/buyPolicy.png)
* After Successful registration you will see a success prompt and you will received the policy details on your registered mobile number.
![success](doc/source/images/success.png)
* You can now interact with chatbot and know your confidential information in a secure manner.
![chatFlow](doc/source/images/chatFlow.png)

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.

## Questions
If you have any questions or issues you can create a new [issue here](https://github.com/IBM/authenticate-users-on-your-chatbot-with-sms-otp/pulls).

Pull requests are very welcome! Make sure your patches are well tested.
Ideally create a topic branch for every separate change you make. For
example:

1. Fork the repo
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
