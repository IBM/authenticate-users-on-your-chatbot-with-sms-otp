import React from 'react';
import {
  Form,
  Button,
  TextInput,
  Modal,
  Tile,
  UnorderedList,
  ListItem,
  Dropdown,
  ToastNotification,
} from 'carbon-components-react';

import {
  default as DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Loading
} from 'carbon-components-react';

import './_landing-page.scss'
import axios from 'axios';
import image from './../../assets/sampleImage1.jpg'
import ChatContainer from './../../components/ChatContainer/ChatContainer'
import trackEvent from '../../utils';
import {
  IDLE, IN_PROGRESS, COMPLETED, FAILED,
} from '../../constants';
import { fetchMessage, executeClientAction, executeWorkspaceAction } from '../../conversation';

require('smoothscroll-polyfill').polyfill();

// import PropTypes from 'prop-types'
// require('./../../smoothscroll-polyfill').polyfill();


class LandingPage extends React.Component {
  constructor() {
    super()

    this.firstCallVal = null;
    this.section1 = React.createRef()
    this.section2 = React.createRef()
    this.section3 = React.createRef()
    this.state = {
      messages: [{
        type: 'bot',
        content: 'Hello, I\'m your personal Insurance Assistant. How can I help you?'
      },
      {
        type: 'option',
        title: 'User Type',
        content: [
          {
            "label": "New User",
            "value": {
              "input": {
                "text": "New User"
              }
            }
          },
          {
            "label": "Existing User",
            "value": {
              "input": {
                "text": "Existing User"
              }
            }
          },
          {
            "label": "Display Users",
            "value": {
              "input": {
                "text": "Display Users"
              }
            }
          }
        ]
      }],
      name: "",
      phone: "",
      policy: "",
      address: "",
      modalOpen: false,
      payment: "monthly",
      dateAdd: 1,
      amount: "",
      policy: "",
      invalidAddress: false,
      invalidName: false,
      invalidPhone: false,
      loading: true,
      success: false,
      code: "91",
      table: false,
      sameNumber: false
    }

  }

  componentDidMount() {
    axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/dbUrl`).then(res=>{
      var url = ''
      if(res.data.slice(-1) === '/'){
        url = res.data.slice(0, -1)
        this.setState({dbUrl: url})
      }
      else {
        url = res.data
        this.setState({dbUrl: url})
      }
      this.getTable()
    }).catch(err=>{
      alert('Authentication is required to continue')
      window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth`)
      console.log(err)
    })
  }

  getTable = ()=>{
    axios.get(`${this.state.dbUrl}/api/v1.0/listusers`).then(res => {
      // console.log(res.data)
      const headers = Object.keys(res.data[0])
        .filter((key) => key !== 'id')
        .map((key) => {
          if (key === "premium_date") {
            res.data = res.data.map(item => {
              const darr = item[key].split('/')
              const date = new Date(darr[2], darr[1], darr[0])
              console.log(date)
              item[key] = date.getDate() + "/XX/" + date.getFullYear()
              return item
            })
          }
          if (key === "policy_no" || key === "phone_no" || key === "address") {
            res.data = res.data.map(item => {
              console.log(item[key])
              if (key === "phone_no")
                item[key] = item[key].toString()
              item[key] = item[key].slice(0, 5) + "XXXXX"
              return item
              // console.log(item[key])
            })
            // console.log(res.data)
          }
          var separateWord = key.split('_');
          for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
              separateWord[i].substring(1);
          }
          return separateWord.join(' ');
        })
      this.setState({ data: res.data, headers, loading: false, table: true })
    }).catch(err => {
      this.setState({ loading: false, table: false })
      console.log("error", err)
    })
  }


  handleChange = (e) => {
    // console.log(e)

    if (this.state['invalid' + e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)] === true) {
      this.setState({ ['invalid' + e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)]: false })
    }
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    if (this.state.name === "" || this.state.phone === "" || this.state.address === "") {
      if (this.state.name === "") this.setState({ invalidName: true })
      if (this.state.phone === "") this.setState({ invalidPhone: true })
      if (this.state.address === "") this.setState({ invalidAddress: true })
      return
    }
    this.setState({ loading: true })
    const random = Math.floor(Math.random() * 10)
    const start = random < this.state.phone.length - 3 ? random : random - 3
    const policy = this.state.name.substring(0, 3).toUpperCase() + this.state.phone.substring(start, start + 3) + (new Date()).getTime() % 100000
    const date = new Date()
    const curDate = new Date(date.setMonth(date.getMonth() + this.state.dateAdd));
    const premiumDate = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' + date.getFullYear()
    this.setState({ policy, premiumDate })
    console.log(policy, premiumDate)


    var axios = require('axios');

    const data = JSON.stringify({
      "name": this.state.name,
      "phone_no": Number(this.state.code + this.state.phone),
      "policy_no": policy,
      "premium_date": premiumDate,
      "premium_amount": this.state.amount * this.state.dateAdd,
      "address": this.state.address
    })


    var config = {
      method: 'post',
      url: `${this.state.dbUrl}/api/v1.0/registeruser`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then((res) => {
      console.log(res)
      if(res.data.flag === true)
        this.setState({ loading: false, success: true, sameNumber:false, modalOpen: false })
      else 
        this.setState({ loading: false, success: true, sameNumber:true, modalOpen: false })
      this.getTable()
      this.section1.current.scrollIntoView()
    }).catch(err => {
      console.log('error', err)
    })
  }

  initBot = () => {
    this.updateMessageStatus(IN_PROGRESS);
    fetchMessage("", "", this.firstCallVal, false, (err, data) => {
      // data.code is set for an error response
      console.log(data)

      if (err || data === undefined) {
        this.updateMessageStatus(FAILED);

        this.updateChatList({
          type: 'bot',
          content: 'I\'m having trouble connecting to the server, please refresh the page.',
        });

        const errorMsg = (err) || data;

        throw new Error(errorMsg);
      }
      // update message status
      this.updateMessageStatus(COMPLETED);
      console.log('here')
      // render appropriate data
      this.botMessageHandler(data.data);

      // send stringified JSON to sidebar
      this.updateOptionsSidebar(JSON.stringify(data.data));

      // update context
      this.updateConversationContext(data.data.result.context);
    });
  }

  userMessageHandler(type, text) {
    trackEvent('Sent Message', 'TextInput', 'Chat TextInput');
    // do not accept empty inputs
    if (text.trim() !== '') {
      // add user message to state
      if (type !== 'option') {
        this.updateChatList({
          type: 'user',
          content: text,
        });
      }
      if (text === 'New User') {
        // this.section2.current.scrollIntoView()
        window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}#section2`);
        this.initBot()
        // console.log('yes')
        return
      }
      if (text === 'Existing User') {
        // console.log('yes')
        // return
        this.initBot()
        return
      }
      if (text === 'Display Users') {
        if (this.state.table === true){
          // this.section3.current.scrollIntoView()
          window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}#section3`);
          // console.log('yes')
        } else {
            var obj = this.state.messages
            const message = {
              type: 'bot',
              content: 'Sorry, No users are registered at the moment.'
            }
            this.updateChatList(message)
        }
        this.initBot()
        return
      }
      this.sendMessageToConversation(text, this.state.lastMessageContext);
    }
  }

  updateConversationContext(lastMessageContext) {
    this.setState({ lastMessageContext });
  }

  updateMessageStatus(botMessageStatus) {
    this.setState({ botMessageStatus });
  }

  sendMessageToConversation(text, context = null) {
    this.updateMessageStatus(IN_PROGRESS);
    fetchMessage(text, context, this.firstCallVal, false, (err, data) => {
      // data.code is set for an error response
      console.log(data)

      if (err || data === undefined) {
        this.updateMessageStatus(FAILED);

        this.updateChatList({
          type: 'bot',
          content: 'I\'m having trouble connecting to the server, please refresh the page.',
        });

        const errorMsg = (err) || data;

        throw new Error(errorMsg);
      }
      // update message status
      this.updateMessageStatus(COMPLETED);
      console.log('here')
      // render appropriate data
      this.botMessageHandler(data.data);

      // send stringified JSON to sidebar
      this.updateOptionsSidebar(JSON.stringify(data.data));

      // update context
      this.updateConversationContext(data.data.result.context);
    });
  }

  parseNonGenericResponsesFromBotOutput = (genericObj) => {
    const responses = [];
    genericObj.forEach((response) => {
      if (response.response_type === 'title') {
        responses.push({
          type: 'bot',
          content: response.text,
        });
      } else if (response.response_type === 'option') {
        responses.push({
          type: 'bot',
          content: response.title,
        });

        let preference = 'text';
        if (response.preference !== undefined) {
          preference = response.preference;
        }

        const res = {
          type: 'option',
          display: 'list',
          content: response.options,
        };

        if (preference === 'button') {
          res.display = 'button';
        }
        responses.push(res);
      } else if (response.response_type === 'pause') {
        responses.push({
          type: response.response_type,
          time: response.time,
          typing: response.typing,
        });
      } else if (response.response_type === 'text') {
        if (response.text !== '') {
          responses.push({
            type: 'bot',
            content: response.text,
          });
        }
      } else if (response.response_type === 'image') {
        responses.push({
          type: 'image',
          content: response.source,
        });
      } else if (response.response_type === 'search') {
        responses.push({
          type: 'bot',
          content: response.header,
        });
        responses.push({
          type: response.response_type,
          content: response.results,
        });
      }
    });
    return responses;
  };

  botMessageHandler(fullOutputObj) {
    // console.log(fullOutputObj)
    const outputObj = fullOutputObj.result;
    console.log(outputObj)
    let isNotificationPresent = false;
    let responses = [];
    // check for chat options in generic options object
    if (outputObj.output.generic !== undefined) {
      responses = responses.concat(this.parseNonGenericResponsesFromBotOutput(outputObj.output.generic));
    }

    // execute client programmatic actions if they exist
    if (outputObj.output.actions
      && outputObj.output.actions.length > 0) {
      console.log(JSON.stringify(outputObj.actions, null, 2));
      const { actions } = outputObj.output;
      actions.forEach((act) => {
        executeClientAction(act)
          .then((result) => {
            if (outputObj.context === undefined) {
              this.sendMessageToConversation(result.result);
            } else if (result.result === 'statement') {
              const action = executeWorkspaceAction({ statement_display: result.dates });
              responses.push(action);
            }
          });
      });
    }

    // execute standard workspace actions if they exist
    if (outputObj.output.user_defined !== undefined
      && outputObj.output.user_defined.action !== undefined) {
      const actionResponseArray = executeWorkspaceAction(outputObj.output.user_defined.action);

      actionResponseArray.forEach((actionResponse) => {
        if (actionResponse.type !== 'notification') {
          responses.push(actionResponse);
        } else {
          isNotificationPresent = true;
          this.displayNotification(actionResponse.text, actionResponse.link);
        }
      });
    }

    // execute standard workspace UI Action if they exist
    if (outputObj.output.user_defined !== undefined
      && outputObj.output.user_defined.ui_action !== undefined) {
      const actionResponseArray = executeWorkspaceAction(outputObj.output.user_defined.ui_action);

      actionResponseArray.forEach((actionResponse) => {
        if (actionResponse.type !== 'notification') {
          console.log(JSON.stringify(actionResponse));
          responses.push(actionResponse);
        } else {
          isNotificationPresent = true;
          this.displayNotification(actionResponse.text, actionResponse.link);
        }
      });
    }
    // serve notification if digression occured
    if (!isNotificationPresent && 'context' in outputObj && 'system' in outputObj.context && 'digressed' in outputObj.context.system) {
      this.displayNotification('The virtual assistant is able to answer an unrelated question and return back to the original flow using the Digressions feature.');
    }

    this.iterateResponese(responses, 0);
  }

  updateOptionsSidebar(lastMessageJson) {
    this.setState({ lastMessageJson });
  }

  iterateResponese(responses, index) {
    if (index < responses.length) {
      const res = responses[index];
      if (res.type !== 'pause') {
        this.updateChatList(res);
        this.iterateResponese(responses, index + 1);
      } else {
        const inputField = document.getElementById('input_field');
        if (res.typing) {
          inputField.placeholder = 'Watson is typing...';
        }
        setTimeout(() => {
          inputField.placeholder = 'Type here...';
          this.iterateResponese(responses, index + 1);
        }, res.time);
      }
    }
  }

  updateChatList(messageObj) {
    const chatList = document.getElementById('chat-list');
    this.setState({ messages: [...this.state.messages, messageObj] }, () => {
      // only scroll when watson responds
      if (messageObj.type !== 'user') {
        setTimeout(() => {
          // scroll to bottom of #chat-list on each update
          chatList.scroll({ top: chatList.scrollHeight, behavior: 'smooth' });
          // IBM Firefox ignores previous scroll()
          // this works. uses scroll-behavior: smooth in css for smooth scrolling
          chatList.scrollTop = chatList.scrollHeight - chatList.clientHeight;
        }, 100);
      }
    });
  }

  render() {
    const paymentOptions = [
      {
        id: 'option-0',
        text: 'Monthly',
        option: 'monthly',
        dateAdd: 1
      },
      {
        id: 'option-1',
        text: 'Quarterly',
        option: 'quarterly',
        dateAdd: 3
      },
      {
        id: 'option-2',
        text: 'Semi-Annually',
        option: 'semiAnnually',
        dateAdd: 6
      },
      {
        id: 'option-3',
        text: 'Annually',
        option: 'annually',
        dateAdd: 12
      }
    ]

    const cardOptions = [
      {
        id: 'option-0',
        text: 'Health Insurance',
        base: '4500',
        policy: 'healthInsurance'
      },
      {
        id: 'option-1',
        text: 'Car Insurance',
        base: '5500',
        policy: 'carInsurance'
      },
      {
        id: 'option-2',
        text: 'Property Insurance',
        base: '6500',
        policy: 'propertyInsurance'
      }
    ]

    return (
      this.state.loading ?
        <div>
          <Loading />
        </div>
        :
        <div className="bx--grid bx--grid--full-width landing-page" style={{ padding: "0", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(38,38,38)" }}>
          <div className="bx--row landing-page__banner" id="section1" ref={this.section1} style={{ padding: "2rem", justifyContent: "center", height: "10rem", backgroundColor: "rgb(61,61,61)" }}>
            <div className="bx--col-lg-10 bx--offset-lg-2">
              <h1 className="landing-page__heading" style={{ color: "white" }} >
                Welcome to Sample Insurance Company
                        </h1><br />
              <p style={{ color: "white" }}>
                Interact with the Watson Assistant to know details about your policy.
              </p><br />
            </div>
            <div className="bx--col-lg-4 " style={{ paddingTop: "0" }} >
              <div style={{ display: this.state.success ? "" : "none" }}>
                <ToastNotification
                  lowContrast={false}
                  kind={this.state.sameNumber?"error":"success"}
                  iconDescription="Close"
                  caption={this.state.sameNumber?"Kindly use another number. ":"To know more about policy, ask Watson Assistant."}
                  style={{ minWidth: '25rem', marginBottom: '1rem' }}
                  subtitle={this.state.sameNumber?<span kind='success'>This phone number already exists.</span>:<span kind='success'>An SMS has been sent to your registered phone number with policy details. </span>}
                  title={this.state.sameNumber?"Error while Registering":"Successfully Registered"}
                />
              </div>
            </div>
          </div><br />
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--offset-lg-2" style={{ maxHeight: "60rem" }}>
              <ChatContainer
                messages={this.state.messages}
                chatOptions={this.state.chatOptions}
                onUserInput={(type, text) => { this.userMessageHandler(type, text); }}
                botMessageStatus={this.state.botMessageStatus}
              />
            </div>
          </div><br /><br />
          <div style={{padding: "3rem"}}>

          </div>
          <div id="section2" ref={this.section2}  style={{ height: "100vh", paddingTop:"3rem" }}>
            <div className="bx--row landing-page__banner" style={{ padding: "2rem", justifyContent: "center", height: "10rem", backgroundColor: "rgb(61,61,61)" }}>
              <div className="bx--col-lg-10 bx--offset-lg-2">
                <h1 className="landing-page__heading" style={{ color: "white" }} >
                  Buy a new Policy
                  </h1>
                <p style={{ color: "white" }}>
                  Choose from the options available below.
                </p>
              </div>
              <div className="bx--col-lg-4 " style={{ paddingTop: "0" }} >
              </div>
            </div><br />

            <div className="bx--row" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

              <Modal

                open={this.state.modalOpen}
                modalHeading="New User"
                modalLabel="Register"
                primaryButtonText="Submit"
                onRequestSubmit={this.handleSubmit}
                onRequestClose={() => { this.setState({ modalOpen: false }) }}
                onSecondarySubmit={() => { this.setState({ modalOpen: false }) }}
                secondaryButtonText="Cancel"
                size='sm'>
                <div>
                  <Form >
                    {this.state.loading ?
                      <Loading
                        withOverlay={true}
                      />
                      :
                      <>
                      </>
                    }
                    <TextInput
                      id="name"
                      invalidText="A valid value is required"
                      invalid={this.state.invalidName}
                      labelText="Name"
                      placeholder="John Doe"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /><br />

                    <div className="bx--form-item bx--text-input-wrapper">
                      <label for="phone" class="bx--label">Phone</label>
                    </div>
                    <div class="bx--text-input__field-wrapper">
                      <input className="bx--text-input bx--text__input" placeholder="+91" style={{ maxWidth: "12%" }} name="code" onChange={this.handleChange} value={this.state.code} />
                      <span style={{ width: "3%" }}> - </span>
                      <input className="bx--text-input bx--text__input" placeholder="9876543210" style={{ maxWidth: "85%" }} name="phone" onChange={this.handleChange} value={this.state.phone} />
                    </div><br />

                    <TextInput
                      id="address"
                      invalidText="A valid value is required"
                      invalid={this.state.invalidAddress}
                      labelText="Address"
                      placeholder="Random Address"
                      name="address"
                      onChange={this.handleChange}
                      value={this.state.address}
                    /><br />
                    <Dropdown
                      id="default"
                      titleText="Dropdown label"
                      helperText="Kindly select premium payment method"
                      label="Monthly"
                      direction="top"
                      items={paymentOptions}
                      light={true}
                      itemToString={(item) => (item ? item.text : '')}
                      onChange={(e) => {
                        this.setState({ payment: e.selectedItem.option, dateAdd: e.selectedItem.dateAdd })
                      }}
                    /><br />

                    <TextInput
                      disabled
                      id="amount"
                      labelText={`Amount payable ${this.state.payment}`}
                      placeholder="Amount"
                      name="address"
                      onChange={this.handleChange}
                      value={this.state.amount * this.state.dateAdd}
                    /><br />
                  </Form>

                </div>
              </Modal>

              <div className="bx--col-lg-4 bx--offset-lg-2" >
                <Tile style={{ color: "white", backgroundColor: "rgb(61,61,61)" }}>
                  <img src={image} style={{ maxWidth: "-webkit-fill-available" }} /><br /><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}>
                    <h1 className="landing-page__heading" style={{ paddingBottom: "1rem" }}>
                      {cardOptions[0].text}
                    </h1>
                  </div>
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <h2>{cardOptions[0].base}</h2>
                    <span style={{ display: "inline-block" }}>
                      <sup style={{ position: "relative", display: "block", lineHeight: "1.2" }}>Rs</sup>
                      <sub style={{ position: "relative", display: "block", lineHeight: "2" }}>/mo</sub>
                    </span>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <UnorderedList>
                      <ListItem style={{ color: "white" }}>
                        Full Life Coverage
                                      </ListItem>
                      <ListItem style={{ color: "white" }}>
                        Payable Monthly / Quarterly
                                      </ListItem>
                      <ListItem style={{ color: "white" }}>
                        Unordered list level 1
                                      </ListItem>

                    </UnorderedList>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <Button
                      kind="primary"
                      size='small'
                      onClick={() => {
                        this.setState({ modalOpen: true, selected: cardOptions[0], amount: cardOptions[0].base })
                      }}
                    >
                      Buy now
                                  </Button><br />
                  </div>
                </Tile>
              </div>
              <div className="bx--col-lg-4" >
                <Tile style={{ color: "white", backgroundColor: "rgb(61,61,61)" }}>
                  <img src={image} style={{ maxWidth: "-webkit-fill-available" }} /><br /><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}>
                    <h1 className="landing-page__heading" style={{ paddingBottom: "1rem" }}>
                      {cardOptions[1].text}
                    </h1>
                  </div>
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <h2>{cardOptions[1].base}</h2>
                    <span style={{ display: "inline-block" }}>
                      <sup style={{ position: "relative", display: "block", lineHeight: "1.2" }}>Rs</sup>
                      <sub style={{ position: "relative", display: "block", lineHeight: "2" }}>/mo</sub>
                    </span>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <UnorderedList>
                      <ListItem style={{ color: "white" }}>
                        Full Life Coverage
                                      </ListItem>
                      <ListItem style={{ color: "white" }}>
                        Payable Monthly / Quarterly
                                      </ListItem>

                      <ListItem style={{ color: "white" }}>
                        Unordered list level 1
                                      </ListItem >
                    </UnorderedList>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <Button
                      kind="primary"
                      size='small'
                      onClick={() => {
                        this.setState({ modalOpen: true, selected: cardOptions[1], amount: cardOptions[1].base })
                      }}
                    >
                      Buy now

                      </Button><br />
                  </div>
                </Tile>
              </div>
              <div className="bx--col-lg-4" >
                <Tile style={{ color: "white", backgroundColor: "rgb(61,61,61)" }}>
                  <img src={image} style={{ maxWidth: "-webkit-fill-available" }} /><br /><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}>
                    <h1 className="landing-page__heading" style={{ paddingBottom: "1rem" }}>
                      {cardOptions[2].text}
                    </h1>
                  </div>
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <h2>{cardOptions[2].base}</h2>
                    <span style={{ display: "inline-block" }}>
                      <sup style={{ position: "relative", display: "block", lineHeight: "1.2" }}>Rs</sup>
                      <sub style={{ position: "relative", display: "block", lineHeight: "2" }}>/mo</sub>
                    </span>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <UnorderedList>
                      <ListItem style={{ color: "white" }}>
                        Full Life Coverage
                                      </ListItem>
                      <ListItem style={{ color: "white" }}>
                        Payable Monthly / Quarterly
                                      </ListItem>
                      <ListItem style={{ color: "white" }}>
                        Unordered list level 1
                                      </ListItem>

                    </UnorderedList>
                  </div><br />
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <Button
                      kind="primary"
                      size='small'
                      onClick={() => {
                        this.setState({ modalOpen: true, selected: cardOptions[2], amount: cardOptions[2].base })
                      }}
                    >
                      Buy now

                                  </Button><br />
                  </div>
                </Tile>
              </div>
            </div>

          </div>
          
          {
            this.state.table ?
              <div>
                <div id="section3" ref={this.section3} style={{ paddingTop: "3rem" }}>

                </div>
                <div style={{ height: "100vh" }}>
                  <div className="bx--row landing-page__banner" style={{ padding: "2rem", justifyContent: "center", alignItems: "center", height: "10rem", backgroundColor: "rgb(61,61,61)" }}>
                    <div className="bx--col-lg-10 bx--offset-lg-2">
                      <h1 className="landing-page__heading" style={{ color: "white" }} >
                        View our Clients
                                </h1><br />
                      <p style={{ color: "white" }}>

                      </p><br />
                    </div>
                    <div className="bx--col-lg-4 " style={{ paddingTop: "0" }} >
                    </div>
                  </div><br />

                  <div className="bx--row" style={{ padding: "2rem", paddingBottom: "6rem", margin: "0" }}>
                    <div className="bx--col-lg-12 bx--offset-lg-2">
                      <Table>
                        <TableHead>
                          <TableRow>
                            {this.state.headers.map((header) => (
                              <TableHeader key={header}>{header}</TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.data.map((row) => (
                            <TableRow key={row.id}>
                              {Object.keys(row)
                                .filter((key) => key !== 'id')
                                .map((key) => {
                                  return <TableCell key={key}>{row[key]}</TableCell>;
                                })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

              </div>
              : <div></div>
          }

        </div>
    );
  }
};

export default LandingPage;