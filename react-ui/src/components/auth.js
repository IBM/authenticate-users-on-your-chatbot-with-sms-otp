const myElement = {
    <html>
    <head>
        
    
    </head>
    
    <body>
        <nav class="bx--header">
            <a class="bx--header__name" href="javascript:void(0)" title="">
                <span class="bx--header__name--prefix">
                    IBM
                    &nbsp;
                </span> Code Pattern
            </a>
    
            <div class="bx--header__global">
                <button id="debugger" class="bx--header__menu-trigger bx--header__action" aria-label="Action 3" title="Action 3" data-navigation-menu-panel-label-expand="Action 3" data-navigation-menu-panel-label-collapse="Close menu" data-product-switcher-target="#switcher-bqavcareoq">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="bx--navigation-menu-panel-expand-icon"
                        width="20" height="20" viewBox="0 0 32 32">
                        <path
                            d="M8.24 25.14L7 26.67a13.79 13.79 0 004.18 2.44l.69-1.87A12 12 0 018.24 25.14zM4.19 18l-2 .41A14.09 14.09 0 003.86 23L5.59 22A12.44 12.44 0 014.19 18zM11.82 4.76l-.69-1.87A13.79 13.79 0 007 5.33L8.24 6.86A12 12 0 0111.82 4.76zM5.59 10L3.86 9a14.37 14.37 0 00-1.64 4.59l2 .34A12.05 12.05 0 015.59 10zM16 2V4a12 12 0 010 24v2A14 14 0 0016 2z">
                        </path>
                    </svg>
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        class="bx--navigation-menu-panel-collapse-icon" width="20" height="20" viewBox="0 0 32 32">
                        <path
                            d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z">
                        </path>
                    </svg>
                </button>
            </div>
        </nav>
    
        <aside style="width: 35%;" class="bx--panel--overlay" id="switcher-bqavcareoq" data-product-switcher>
            <h3 align="center" style="color: white;">View Application in Action</h3>
            <hr>
            <div class="bx--product-switcher" style="background-color: rgb(50, 50, 50);">
    
                <div class="custompanel">
                    <h4 class="bx--product-switcher__header">Start by Scanning the QR code in you Phone</h4>
                    <br>
                    <h5></h5>
                    <br>
                    <img src="static/images/join-twilio-sandbox.png">
                    <br>
                    <br>
                    <p class="bx--product-switcher__header">A WhatsApp chat will open up in your phone with a typed code
                        <code>join &lt;sandbox name&gt;</code><br>Replace the
                        <code>&lt;sandbox name&gt;</code> with your WhatsApp sandbox name. Click <a href="https://www.twilio.com/console/sms/whatsapp/sandbox">here</a> to know your twilio sandbox name.
                    </p>
                    <br>
                    <h4 class="bx--product-switcher__header">Unable to Scan the QR Code?</h4>
                    <br>
                    <p>Send a WhatsApp message manually to <strong>+14155238886</strong> with code
                        <code>join &lt;sandbox name&gt;</code>
                    </p>
                    <br>
                    <h4 class="bx--product-switcher__header">Go ahead and send messages from WhatsApp, and you can view the Sent and Received messages below</h4>
                    <br>
                    <ul data-accordion class="bx--accordion">
                        <li data-accordion-item class="bx--accordion__item">
                            <button class="bx--accordion__heading" aria-expanded="false" aria-controls="pane1" id="viewAction">
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                xmlns="http://www.w3.org/2000/svg" class="bx--accordion__arrow" width="16" height="16"
                                viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"></path>
                            </svg>
                            <div style="color:white;" class="bx--accordion__title">Show/Hide Incoming-Outgoing Messages</div>
                        </button>
                            <div id="pane1" class="bx--accordion__content">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <p>Message Received<br><br>
                                            <div class="bx--tile">
                                                <h5 style="color: rgb(9,93,248);" id="receivedMsg"></h5>
                                            </div>
                                        </p>
                                        <br>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <p>Message Sent<br><br>
                                            <div class="bx--tile">
                                                <h5 style="color: rgb(9,93,248);" id="sentMsg"></h5>
                                            </div>
                                        </p>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    
        <div class="custom-container">
            <div class="bx--grid">
                <div class="bx--row">
                    <div class="bx--col-lg-8">
                        <div class="outside">
                            <div class="inside">
                                <h1>Augment IBM Watson services to WhatsApp</h1>
                                <br>
                                <div data-tabs class="bx--tabs">
                                    <div class="bx--tabs-trigger" tabindex="0">
                                        <a href="javascript:void(0)" class="bx--tabs-trigger-text" tabindex="-1"></a>
                                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                                        </svg>
                                    </div>
                                    <ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
                                        <li class="bx--tabs__nav-item bx--tabs__nav-item--selected" data-target=".tab-1-container" role="tab" aria-selected="true">
                                            <a tabindex="0" id="tab-link-1-container" class="bx--tabs__nav-link" href="javascript:void(0)" role="tab" id="setupButton" aria-controls="tab-panel-1-container">Setup the Application</a>
                                        </li>
                                        <li class="bx--tabs__nav-item bx--tabs__nav-item--disabled" id="deployModelTab" data-target=".tab-2-container" role="tab">
                                            <a tabindex="0" id="tab-link-2-container" class="bx--tabs__nav-link" href="javascript:void(0)" role="tab" id="deployModelButton" aria-controls="tab-panel-2-container">Deploy Model</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- The markup below is for demonstration purposes only -->
                                <div class="bx--tab-content">
                                    <div id="tab-panel-1-container" class="tab-1-container" role="tabpanel" aria-labelledby="tab-link-1-container" aria-hidden="false">
                                        <div>
    
                                            <h5>1. Add Twilio service to the Application</h5>
                                            <br>
                                            <p>If you have created a twilio service, you can find the
                                                <code>ACCOUNT SID</code> and <code>AUTH TOKEN</code> here: <a href="https://www.twilio.com/console">https://www.twilio.com/console</a>.
                                            </p>
                                            <br>
                                            <button class="bx--btn bx--btn--primary" type="button" data-modal-target="#modal-twilio-credentials">
                                                Add Twilio Credentials
                                                <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                                                    style="will-change: transform;" xmlns="http://www.w3.org/2000/svg"
                                                    class="bx--btn__icon" width="16" height="16" viewBox="0 0 16 16"
                                                    aria-hidden="true">
                                                    <path d="M9 7L9 3 7 3 7 7 3 7 3 9 7 9 7 13 9 13 9 9 13 9 13 7z"></path>
                                                </svg>
                                            </button>
                                            <br>
                                            <br>
                                            <p><strong>Status: </strong> <code id="twilioStatus"></code></p>
                                            <br>
                                            <br>
                                            <p>If you have not created a twilio service, please create a service here: <a href="https://www.twilio.com/try-twilio">https://www.twilio.com/try-twilio</a>.
                                            </p>
                                            <hr>
                                            <h5>2. Add Watson services to the Application</h5>
                                            <br>
                                            <fieldset class="bx--fieldset">
                                                <div class="bx--form-item">
                                                    <div class="bx--radio-button-group ">
                                                        <div class="bx--radio-button-wrapper">
                                                            <input id="radio-wml" class="bx--radio-button" type="radio" value="radio-wml" name="radio-button" tabindex="0" checked>
                                                            <label for="radio-wml" class="bx--radio-button__label">
                                                                <span class="bx--radio-button__appearance"></span>
                                                                <span class="bx--radio-button__label-text">Watson Machine Learning</span>
                                                            </label>
                                                        </div>
                                                        <div class="bx--radio-button-wrapper">
                                                            <input id="radio-wa" class="bx--radio-button" type="radio" value="radio-wa" name="radio-button" tabindex="0">
                                                            <label for="radio-wa" class="bx--radio-button__label">
                                                                <span class="bx--radio-button__appearance"></span>
                                                                <span class="bx--radio-button__label-text">Watson Assistant</span>
                                                            </label>
                                                        </div>
                                                        <div class="bx--radio-button-wrapper">
                                                            <input id="radio-wnlu" class="bx--radio-button" type="radio" value="radio-wnlu" name="radio-button" tabindex="0">
                                                            <label for="radio-wnlu" class="bx--radio-button__label">
                                                                <span class="bx--radio-button__appearance"></span>
                                                                <span class="bx--radio-button__label-text">Watson Natural Language Understanding</span>
                                                            </label>
                                                        </div>
                                                        <div class="bx--radio-button-wrapper">
                                                            <input id="radio-wvr" class="bx--radio-button" type="radio" value="radio-wvr" name="radio-button" tabindex="0">
                                                            <label for="radio-wvr" class="bx--radio-button__label">
                                                                <span class="bx--radio-button__appearance"></span>
                                                                <span class="bx--radio-button__label-text">Watson Visual Recognition</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <button class="bx--btn bx--btn--primary" id="addwatsoncreds" type="button">
                                                Add Watson Credentials
                                                <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                                                    style="will-change: transform;" xmlns="http://www.w3.org/2000/svg"
                                                    class="bx--btn__icon" width="16" height="16" viewBox="0 0 16 16"
                                                    aria-hidden="true">
                                                    <path d="M9 7L9 3 7 3 7 7 3 7 3 9 7 9 7 13 9 13 9 9 13 9 13 7z"></path>
                                                </svg>
                                            </button>
                                            <br>
                                            <br>
                                            <p><strong>Configured Services: </strong>
                                                <ul id="wStatus"></ul>
                                            </p>
                                            <br>
                                            <br>
                                            <p>If you have not created a WML service, please create a service <a href="https://cloud.ibm.com/catalog/services/machine-learning">here</a> on IBM Cloud. </p>
                                            <br>
                                            <br>
                                            <div id="next-btn" style="display: none;">
                                                <button class="bx--btn bx--btn--tertiary bx--btn--sm disabled" type="button" onclick="document.getElementById('tab-link-2-container').click()">
                                                    Next
                                                    <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                                                        style="will-change: transform;" xmlns="http://www.w3.org/2000/svg"
                                                        class="bx--btn__icon" width="32" height="32" viewBox="0 0 16 16"
                                                        aria-hidden="true">
                                                        <path fill-rule="nonzero"
                                                            d="M11.95 5.997L7.86 2.092 9.233.639l6.763 6.356-6.763 6.366L7.86 11.91l4.092-3.912H-.003v-2h11.952z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab-panel-2-container" class="tab-2-container" role="tabpanel" aria-labelledby="tab-link-2-container" aria-hidden="true" hidden>
                                        <div>
    
                                            <h5>About the House Price Prediction Model</h5>
                                            <br>
                                            <p> <strong>Description: </strong> This is a sample Machine Learning model to predict House Prices in the city <i>Bengaluru, Karnataka, India.</i>
                                            </p>
                                            <br>
                                            <p> <strong>Input: </strong> <br>
                                                <i> Locality </i> - The locality where you want the house prices. <br>
                                                <i> Sq. Ft </i> - The carpet area of the house for which you want the predictions. <br>
                                                <i> BHK </i> - The number of Bedroom(s) in the house for which you want the predictions.
                                            </p>
                                            <br>
                                            <p> <strong>Output: </strong><br>
                                                 <i> Price </i> - The approximate house prices in the <i> Locality </i> based on <i> Sq. Ft </i> and <i> BHK </i>.
                                            </p>
                                            <br>
                                            <p><strong>Dataset Credits: </strong><a href="https://www.kaggle.com/amitabhajoy/bengaluru-house-price-data">Bengaluru
                                                    House price data</a> from Kaggle.
                                            </p>
                                            <br>
                                            <p><strong>License: </strong> CC0: Public Domain</p>
                                            <br>
                                            <button class="bx--btn bx--btn--primary" type="button" id="deployModeltoWML">
                                                Deploy the Model on WML
                                                <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                                                    style="will-change: transform;" xmlns="http://www.w3.org/2000/svg"
                                                    class="bx--btn__icon" width="16" height="16" viewBox="0 0 22 22"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M16.3 5.9c-2-1.1-4.3-1.5-6.5-.9-.3.1-.5.5-.4.8.1.3.4.5.8.4 1-.3 2.1-.3 3.1-.1-1.6.8-3.4 2.7-4.9 5.2-.5.9-1 1.9-1.3 2.9-.4-.4-.7-.8-1-1.2-.8-1.3-.9-2.4-.5-3.2.5-.8 1.6-1.3 3.2-1.2.3 0 .6-.3.7-.6
                    0-.3-.3-.6-.6-.7-2.1-.2-3.6.5-4.4 1.8-.7 1.2-.5 2.8.5 4.4.4.7 1 1.3 1.6 2-.1.5-.2 1-.3 1.4V18c-.7-.9-1.2-1.9-1.5-3-.1-.3-.4-.5-.8-.5-.3.1-.5.4-.5.8.6 2.3 2 4.3 4.1 5.5C9 21.6 10.5 22 12 22c3 0 5.9-1.5 7.5-4.3 2.4-4.1.9-9.4-3.2-11.8zm-6.9 6c2.2-3.8
                    5-5.6 6.2-4.9 3.5 2 4.7 6.6 2.7 10.1-1 1.7-4.8 1.5-8.3-.5-.8-.4-1.5-1-2.1-1.5.5-1 .9-2.1 1.5-3.2zm-1.1 7.9c-.6-.3-.9-1.3-.7-2.7 0-.2.1-.4.1-.6l1.8 1.2c2.1 1.2 4.2 1.8 6 1.8h.6c-2.2 1.5-5.3 1.7-7.8.3zM3.2 7.6L.9 6.3c-.3-.2-.6-.1-.8.2-.2.3-.1.7.2.8l2.3
                    1.3c.1.1.2.1.3.1.2 0 .4-.1.5-.3.2-.3.1-.7-.2-.8zM12 3.5c.3 0 .6-.3.6-.6V.6c0-.3-.3-.6-.6-.6s-.6.3-.6.6v2.2c0 .4.3.7.6.7zM17 4.8c.1.1.2.1.3.1.2 0 .4-.1.5-.3l1.2-2c.2-.3.1-.7-.2-.8-.3-.2-.7-.1-.9.2l-1.2 2c-.1.2 0 .6.3.8zM7 4.8c-.1 0-.2.1-.3.1-.2
                    0-.4-.1-.5-.3L5 2.6c-.1-.3 0-.7.3-.9.3-.2.7-.1.9.2l1.2 2c0 .3-.1.7-.4.9zM23.9 6.5c-.2-.3-.6-.4-.9-.2l-2.3 1.3c-.3.2-.4.6-.2.9.1.2.3.3.5.3.1 0 .2 0 .3-.1l2.3-1.3c.4-.2.5-.6.3-.9z" />
                                                </svg>
                                            </button>
                                            <br>
                                            <br>
                                            <p><strong>Status: </strong> <code id="wmlDeploymentStatus"></code></p>
                                            <p id="modelexists" style="display: none;"><strong>Model ID: </strong> <code id="wmlDeploymentStatus2"></code></p>
                                            <p id="modelexists2" style="display: none;"><strong>Model Name: </strong>
                                                <code id="wmlDeploymentStatus3"></code></p>
    
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <!-- TWILIO MODAL START-->
    
                <div data-modal id="modal-twilio-credentials" class="bx--modal" role="dialog" aria-modal="true" aria-labelledby="modal-twilio-credentials-label" aria-describedby="modal-twilio-credentials-heading" tabindex="-1">
                    <div class="bx--modal-container">
                        <div class="bx--modal-header">
                            <p class="bx--modal-header__label bx--type-delta" id="modal-twilio-credentials-label">Step 1: Add Twilio service to the Application</p>
                            <p class="bx--modal-header__heading bx--type-beta" id="modal-twilio-credentials-heading">
                                Twilio Credentials</p>
                            <button class="bx--modal-close" type="button" data-modal-close aria-label="close modal">
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                    xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z">
                                    </path>
                                </svg>
                            </button>
                        </div>
    
                        <!-- Note: Modals with content that scrolls, at any viewport, requires `tabindex="0"` on the `bx--modal-content` element -->
    
                        <div class="bx--modal-content bx--modal-content--with-form">
                            <div class="bx--form-item">
                                <label for="account_sid" class="bx--label">Account SID</label>
                                <input id="account_sid" type="text" class="bx--text-input" placeholder="Enter Account SID" data-modal-primary-focus>
                            </div>
                            <br>
                            <div class="bx--form-item">
                                <label for="auth_token" class="bx--label">Auth Token</label>
                                <input id="auth_token" type="text" class="bx--text-input" placeholder="Enter Auth Token">
                            </div>
                            <br>
                        </div>
                        <div class="bx--modal-content--overflow-indicator"></div>
    
                        <div class="bx--modal-footer">
                            <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>Cancel</button>
                            <button class="bx--btn bx--btn--primary" id="twilio-cred-submit" type="button" data-modal-close>Submit</button>
                        </div>
                    </div>
                    <!-- Note: focusable span allows for focus wrap feature within Modals -->
                    <span tabindex="0"></span>
                </div>
    
                <!-- TWILIO MODAL END-->
    
                <!-- Watson Services MODAL START-->
    
                <div data-modal id="modal-credentials" class="bx--modal" role="dialog" aria-modal="true" aria-labelledby="modal-credentials-label" aria-describedby="modal-credentials-heading" tabindex="-1">
                    <div class="bx--modal-container">
                        <div class="bx--modal-header">
                            <p class="bx--modal-header__label bx--type-delta" id="modal-credentials-label">Step 2: Add Watson service to the Application</p>
                            <p class="bx--modal-header__heading bx--type-beta" id="modal-credentials-heading">
                            </p>
                            <button class="bx--modal-close" type="button" data-modal-close aria-label="close modal">
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                    xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z">
                                    </path>
                                </svg>
                            </button>
                        </div>
    
                        <!-- Note: Modals with content that scrolls, at any viewport, requires `tabindex="0"` on the `bx--modal-content` element -->
    
                        <div class="bx--modal-content bx--modal-content--with-form">
                            <div class="bx--form-item">
                                <label for="apikey" class="bx--label">Credentials</label>
                                <textarea id="apikey" class="bx--text-area" rows="4" cols="50" placeholder="Enter the credentials here"></textarea>
                            </div>
                            <br>
                            <div class="bx--form-item">
                                <label for="cloudfunctionurl" class="bx--label">Cloud Function URL</label>
                                <input id="cloudfunctionurl" type="text" class="bx--text-input" placeholder="Enter cloud function URL here">
                            </div>
                            <br>
                        </div>
                        <div class="bx--modal-content--overflow-indicator"></div>
    
                        <div class="bx--modal-footer">
                            <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>Cancel</button>
                            <button class="bx--btn bx--btn--primary" id="cred-submit" type="button" data-modal-close>Submit</button>
                        </div>
                    </div>
                    <!-- Note: focusable span allows for focus wrap feature within Modals -->
                    <span tabindex="0"></span>
                </div>
    
                <!-- Watson Services MODAL END -->
    
                <!-- WML MODAL START-->
    
                <div data-modal id="modal-credentials-wml" class="bx--modal" role="dialog" aria-modal="true" aria-labelledby="modal-credentials-wml-label" aria-describedby="modal-credentials-wml-heading" tabindex="-1">
                    <div class="bx--modal-container">
                        <div class="bx--modal-header">
                            <p class="bx--modal-header__label bx--type-delta" id="modal-credentials-wml-label">Step 2: Add Watson Machine Learning service to the Application</p>
                            <p class="bx--modal-header__heading bx--type-beta" id="modal-credentials-wml-heading">
                            </p>
                            <button class="bx--modal-close" type="button" data-modal-close aria-label="close modal">
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                    xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16" viewBox="0 0 16 16"
                                    aria-hidden="true">
                                    <path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z">
                                    </path>
                                </svg>
                            </button>
                        </div>
    
                        <!-- Note: Modals with content that scrolls, at any viewport, requires `tabindex="0"` on the `bx--modal-content` element -->
    
                        <div class="bx--modal-content bx--modal-content--with-form">
                            <div class="bx--form-item">
                                <label for="wml_apikey" class="bx--label">Apikey (Generated from IAM)</label>
                                <input id="wml_apikey" type="text" class="bx--text-input" placeholder="Enter the apikey here">
                            </div>
                            <br>
                            <div class="bx--form-item">
                                <label class="bx--label">Region</label>
                                <div class="bx--select"></div>
                                <div class="bx--select-input__wrapper">
                                    <select id="wml_url" class="bx--select-input">
                                        <option value="https://eu-gb.ml.cloud.ibm.com">London</option>
                                        <option value="https://us-south.ml.cloud.ibm.com">Dallas</option>
                                        <option value="https://eu-de.ml.cloud.ibm.com">Frankfurt</option>
                                        <option value="https://jp-tok.ml.cloud.ibm.com">Tokyo</option>
                                    </select>
                                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                                    </svg>
                                </div>
                            </div>
                            <br>
                            <div class="bx--form-item">
                                <label for="wml_space_id" class="bx--label">Space ID</label>
                                <input id="wml_space_id" type="text" class="bx--text-input" placeholder="Enter the spaceID here">
                            </div>
                            <br>
                        </div>
                        <div class="bx--modal-content--overflow-indicator"></div>
    
                        <div class="bx--modal-footer">
                            <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>Cancel</button>
                            <button class="bx--btn bx--btn--primary" id="wml-cred-submit" type="button" data-modal-close>Submit</button>
                        </div>
                    </div>
                    <!-- Note: focusable span allows for focus wrap feature within Modals -->
                    <span tabindex="0"></span>
                </div>
    
                <!-- WML MODAL END -->
    
            </div>
        </div>
    </body>
    <script src="static/carbon-components/scripts/carbon-components.js"></script>
    <script src="static/javascript/script.js"></script>
    
    </html>
}
