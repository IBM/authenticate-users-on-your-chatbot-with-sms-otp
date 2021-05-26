<html>
<style>
    .boxed {
        border: 1px solid blue ;
    }
    .btn {
        border: 2px solid gray;
        background-color: #202020;
        color: white;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
    }
    .info {
        border-color: gray;
        color: gray;
    }
    html,div,body{
        background-color:#1a1a1a;
        font-family: 'IBM Plex Sans', sans-serif;
    }
    .content p{
        font-family: 'IBM Plex Sans', sans-serif;  
        font:15px;
        color: #fff;
    }
    pre{
        background-color:#d9dbde;
        color:#000;
        font-family: 'IBM Plex Sans', sans-serif;
        font:12px;
    }
    .content h4{
        color:#fff;
    }
    .content h6{
        font-family: 'IBM Plex Sans', sans-serif;
        background-color:#1a1a1a;
        color:#fff;
    }
    .content h3{
        font-family: 'IBM Plex Sans', sans-serif;
        color: #2a67f5;
        background-color:#1a1a1a;
    }
    .h3{
        font-family: 'IBM Plex Sans', sans-serif;
        color: #2a67f5;
        background-color:#1a1a1a;
    }
    ul, ol,b{ 
        font-family: 'IBM Plex Sans', sans-serif;
        color: #fff;
    }
    #ul1{
    font-family: 'IBM Plex Sans', sans-serif;
        color: #fff;
    }
    .button.is-dark.is-medium {
        font-family: 'IBM Plex Sans', sans-serif;
        background-color: #1a1a1a;
        border-color: white;
        color: #fff;
    }
    .button.is-dark.is-medium:hover {
        font-family: 'IBM Plex Sans', sans-serif;
        background-color: #2a67f5;
        border-color: white;
        color: #fff;
    }
    .title.is-3{
        font-family: 'IBM Plex Sans', sans-serif;
        color:#fff;
    }
    .subtitle.is-4{
        font-family: 'IBM Plex Sans', sans-serif;
        color:#fff;
    }
</style>
<body style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
    <div style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
        <h2 class="title is-3 ">OTP Auth on Watson Assistant</h2>
            <p> This a code pattern which introduces OTP Authentication using watson assistant.</p>
            <h3> Getting Started</h3></span>
            <span style="color:grey">
                <h2>1. Clone the Repository</h2>
            </span>
            Click the button below to fetch the repository to your playground instance.<br /><br />
            <a class="button is-dark is-medium" href='didact://?commandId=vscode.didact.sendNamedTerminalAString&text=terminal$$git%20clone%20https%3A%2F%2Fgithub.com%2FIBM%2Fauthenticate-users-on-your-chatbot-with-sms-otp.git%20%26%26%20cd%20authenticate-users-on-your-chatbot-with-sms-otp%2F%20%26%26%20cd%20custom-apis-for-authentication%20%26%26%20pip3%20install%20-r%20requirements.txt%20%26%26%20cd%20..%20%26%26%20cd%20node-web-application%20%20%26%26%20npm%20install%20%26%26%20cd%20..' title='Clone the Repo'>Clone the Repo</a>
            <br/><br/>
            <span style="color:grey"><h2>2. Start and Configure Custom DB API</h2></span>
            <p>Start the API and configure with your twilio credentials.</p>
            <a class="button is-dark is-medium" title="Start" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=python$$cd%20custom-apis-for-authentication%20%26%26%20python3%20app.py">Start API</a><br /><br />
            <span style="color:grey"><h2>3. Start and Configure Web App</h2></span>
            <p>Start the Web App and configure with your Watson Assistant credentials.</p>
            <a class="button is-dark is-medium" title="Build the App" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs$$cd%20node-web-application%20%26%26%20node%20server.js">Start Web App</a><br>
</body>
</html>