# [Title]

In this code pattern, we will [create something] using [technologies] and [components]. [Explain briefly how things work]. [Give acknowledgements to others if necessary]

When you have completed this code pattern, you will understand how to:

* [goal 1]
* [goal 2]
* [goal 3]
* [goal 4]

![architecture](doc/source/images/architecture.png)

## Flow

1. Step 1.
2. Step 2.
3. Step 3.
4. Step 4.
5. Step 5.

# Watch the Video

[![video](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg)

# Steps

1. [Clone the repo](#1-clone-the-repo).
2. [Create Watson services](#2-create-watson-services).
3. [Import the Watson Assistant workspace](#3-import-the-watson-assistant-workspace).
4. [Configure credentials](#4-configure-credentials).
5. [Run the application](#5-run-the-application).

### 1. Clone the repo

Clone the `watson-banking-chatbot` repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/watson-banking-chatbot
```

We’ll be using the file [`data/assistant/workspaces/banking.json`](data/assistant/workspaces/banking.json) and the folder
[`data/assistant/workspaces/`](data/assistant/workspaces/)

### 2. Create Watson services

Create the following services:

* [**Watson Assistant**](https://cloud.ibm.com/catalog/services/assistant)
* [**Watson Discovery**](https://cloud.ibm.com/catalog/services/discovery)
* [**Watson Tone Analyzer**](https://cloud.ibm.com/catalog/services/tone-analyzer)
* [**Watson Natural Language Understanding**](https://cloud.ibm.com/catalog/services/natural-language-understanding)

### 3. Import the Watson Assistant workspace

* Find the Watson Assistant service in your IBM Cloud Dashboard.
* Select the service, and then click **Launch tool**.
* Go to the **Skills** tab.
* Click **Create skill**.
* Click the **Import skill** tab.
* Click **Choose JSON file**, go to your cloned repo dir, and `Open` the workspace.json file in `data/conversation/workspaces/banking.json` (or the old full version in `full_banking.json`).
* Select **Everything**, and click **Import**.

To find the `WORKSPACE_ID` for Watson Assistant:

* Go back to the **Skills** tab.
* Click the three dots in the upper-right corner of the **watson-banking-chatbot** card, and select **View API Details**.
* Copy the `Workspace ID` GUID.
  ![view_api_details](doc/source/images/view_api_details.png)

*Optionally*, to view the assistant dialog, select the workspace and choose the
**Dialog** tab. Here's a snippet of the dialog:

![dialog](doc/source/images/dialog.PNG)


### 4. Configure credentials


### 5. Run the application

1. Install [Node.js](https://nodejs.org/en/) runtime or NPM.
1. Start the app by running `npm install`, followed by `npm start`.
1. Use the chatbot at `localhost:3000`.

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.

# Sample output

## Questions
If you have any questions or issues you can create a new [issue here][issues].

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
