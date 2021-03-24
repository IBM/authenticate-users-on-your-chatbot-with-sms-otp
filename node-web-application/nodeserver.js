/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();
// require('./config/express')(app);
var bodyParser = require('body-parser')
var fs = require('fs');
const AssistantV2 = require('ibm-watson/assistant/v2');
const uuid = require('uuid');
const NodeCache = require('node-cache');
const { IamAuthenticator } = require('ibm-watson/auth');
const myCache = new NodeCache();

app.use(bodyParser.json())
app.use(cors())
app.use('/', express.static('./build'));
app.use('/auth', express.static('./public'));

var assistant=''
// declare Watson Assistant service


initAssist = ()=>{
  fs.readFile('WatsonCredentials.json', (err, data) => {
      let creds = JSON.parse(data);
      success = myCache.set( "creds", creds);
      console.log(success)
      assistant = new AssistantV2({
        version: '2021-03-04',
        authenticator: new IamAuthenticator({
          apikey: myCache.get( "creds" ).assistant_key || '<assistant-key>',
        }),
        url: myCache.get( "creds" ).assistant_url || '<assistant-url>',
      });
      console.log( myCache.get( "creds" ).assistant_key || '<assistant-key>')
      console.log( 'init ')
      //file exists
  });
}

if (fs.existsSync('WatsonCredentials.json')) {
  initAssist()
 }


const date = new Date();
date.setMonth(date.getMonth() + 1);

app.get('/auth', (req, res) => {
  res.render('./public/index.html');
});

app.get('/getTwilioCredentials', (req, res) => {
  fs.readFile('WatsonCredentials.json', (err, data) => {
    if (err){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(JSON.stringify({"status": "Not Configured"}));
      res.end();
      console.log(err)
    } else {
      let creds = JSON.parse(data);
      console.log(creds)
      res.writeHead(200, {'Content-Type': 'text/html'});
      // if(creds)
      res.write(JSON.stringify({"status": "Configured"}));
      res.end();
    }
  });
});

app.get('/dbUrl',(req,res)=>{
  res.write(myCache.get('creds').api_url);
  res.end();
})

app.post('/storeWatsonCredentials', (req, res) => {
  let textIn = {
    assistant_id: req.body.assistant_id,
    assistant_url: req.body.assistant_url,
    assistant_key: req.body.assistant_key,
    api_url: req.body.api_url
  };
  
  console.log(req.body)
  fs.writeFile('WatsonCredentials.json', JSON.stringify(req.body), function (err) {
    if (err) throw err;
      console.log('Saved!');
      return res.json('ok')
      // return res.redirect(`http://${req.headers.host}:${req.headers.port}/`)
  });
  success = myCache.set( "creds", req.body);
  initAssist();
});

app.post('/api/message', async (req, res) => {
  // check for assistant id and handle null assistant env variable
//   console.log(process.env.ASSISTANT_ID)
  const assistantId = myCache.get( "creds" ).assistant_id || '<assistant-id>';
  if (!assistantId || assistantId === '<assistant-id>') {
    return res.json({
      output: {
        code: '404',
        text: 'The app has not been configured with a ASSISTANT_ID environment variable.',
      },
    });
  }

  let textIn = '';

//   console.log(req.body)

  if (req.body.input) {
    textIn = req.body.input.text;
  }

  // assemble assistant payload
  const payload = {
    assistantId,
    sessionId: req.body.session_id,
    input: {
      message_type: 'text',
      text: textIn,
    },
  };
  console.log(payload)

  if (req.body.isFirstCall || req.body.context) {
    payload.context = req.body.context || initContext;
  }


  return assistant.message(payload)
    .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
        // setSearchItems(data);
        return res.json(response)
    })
    .catch(err => {
      console.log(err);
      return res.status(err.code || 500).json(err);
    });

    // return res.json(response)
//   send payload to Conversation and return result
//   return assistant.message(payload, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(err.code || 500).json(err);
//     }
//     console.log(data)
//     setSearchItems(data);
//     return res.json(data);
//   });
});

app.get('/api/session', (req, res) => {
//   console.log(process.env.ASSISTANT_ID)
//   console.log(process.env.ASSISTANT_ID)
    assistant.createSession({
        assistantId: myCache.get( "creds" ).assistant_id || '{assistant_id}',
      })
        .then(response => {
          console.log(JSON.stringify(response.result, null, 2));
          return res.send(response);
          
        })
        .catch(err => {
        return res.status(error.code || 500).send(error);
        console.log(err);
    });

    // assistant.createSession(
    //     {
    //       assistantId: process.env.ASSISTANT_ID || '{assistant_id}',
    //     },
    //     (error, response) => {
    //       if (error) {
    //         console.log(error);
    //         return res.status(error.code || 500).send(error);
    //       }
    //       return res.send(response);
    //     },
    //   );
});


app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

module.exports = app;
