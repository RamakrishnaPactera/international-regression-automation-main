<p align="center">
  <a href="https://www.cypress.io"><img src="https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png"/></a>
</p>
<p align="center">
  <a href="https://on.cypress.io">Documentation</a> |
  <a href="https://on.cypress.io/changelog">Changelog</a> |
  <a href="https://on.cypress.io/roadmap">Roadmap</a>
</p>

## What is Cypress?

<p align="center">
  <a href="https://player.vimeo.com/video/237527670">
    <img alt="Why Cypress Video" src="https://user-images.githubusercontent.com/1271364/31739717-dbdff0ee-b41c-11e7-9b16-bfa1b6ac1814.png" width="75%" height="75%" />
  </a>
</p>

## Installing

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=9.5.4&x2=0)](https://badge.fury.io/js/cypress)

Install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

```bash
npm install cypress --save-dev
```

![installing-cli e1693232](https://user-images.githubusercontent.com/1271364/31740846-7bf607f0-b420-11e7-855f-41c996040d31.gif)

## How to Execute

To run a command, you'll need to prefix each command in order to properly locate the cypress executable

```bash
$(npm bin)/cypress run
```

...or...

```bash
./node_modules/.bin/cypress run
```

Want to run tests from a single spec file and record the results on the Dashboard, the command should be:

```bash
npm run cy:run -- --record --spec "cypress/e2e/my-spec.cy.js"
```

If you are using npx tool, you can invoke the locally installed Cypress tool directly:

```bash
npx cypress run --record --spec "cypress/e2e/my-spec.cy.js"
```

## Commands

cypress run

Runs Cypress tests to completion. By default, cypress run will run all tests headlessly.

```bash
cypress run
```

cypress run --browser <browser-name-or-path>

```bash
cypress run --browser chrome
```

The "browser" argument can be set to chrome, chromium, edge, electron, firefox to launch a browser detected on your system. Cypress will attempt to automatically find the installed browser for you.
  
cypress run --headed
  
By default, Cypress will run tests headlessly during cypress run.

Passing --headed will force the browser to be shown. This matches how you run any browser via cypress open.
  
```bash
cypress run --headed
```
  
cypress run --no-exit

To prevent the Cypress App from exiting after running tests in a spec file, use --no-exit.

You can pass --headed --no-exit in order to view the command log or have access to developer tools after a spec has run
  
```bash
cypress run --headed --no-exit
```
  
cypress run --parallel
  
Run recorded specs in parallel across multiple machines.  

```bash
cypress run --record --parallel
```  
cypress run --spec <spec>
  
Run tests specifying a single test file to run instead of all tests. The spec path should be an absolute path or can relative to the current working directory.
  
```bash
cypress run --spec "cypress/e2e/examples/actions.cy.js"
```   
  
Run tests within the folder matching the glob (Note: Using double quotes is strongly recommended).
 
```bash
cypress run --spec "cypress/e2e/login/**/*"
```
  
Run tests specifying multiple test files to run.
  
```bash
cypress run --spec "cypress/e2e/examples/actions.cy.js,cypress/e2e/examples/files.cy.js"
```
  
cypress open
  
Opens the Cypress App.
  
 ```bash
cypress open
```

## Setting Up Dashboard
  
Click on the Runs tab of your project within the Cypress App.
Click Connect to Dashboard.
You will need to log in to record your tests, so you'll be prompted to log in to the Cypress Dashboard here if you haven't already done so.

![image](https://user-images.githubusercontent.com/100849764/174281192-e3af6e54-1637-48de-9b05-59399512e4ca.png)

Choose who owns the project. You can personally own it or select an organization you're a member of. If you don't have any organizations, click Create organization. Organizations work just like they do in GitHub and enable you to separate your personal and work projects.

![image](https://user-images.githubusercontent.com/100849764/174281266-30276776-0e94-4913-8ca6-eac5ecc72b4c.png)

If you don't have any existing projects, you'll have the opportunity to create a new one here. If you have existing projects and want to create a new one, you can click "Create a new project" to make a new one.
Fill in the name of your project (this is only for display purposes and can be changed later).
Choose whether this project is Public or Private.
    A.  A public project can have its recordings and runs seen by anyone. Typically these are open source projects.
    B.  A private project restricts its access to only users you invite.

![image](https://user-images.githubusercontent.com/100849764/174281590-0b333785-b204-4505-83f2-ab2192c6ccf8.png)

Alternatively, if you've already created a project in the Dashboard, you can link your project by selecting it from the dropdown. Make sure to select a clean project that has not previously been linked to an existing project.

![image](https://user-images.githubusercontent.com/100849764/174282067-7612cf20-7581-401d-92b4-a230033b32d4.png)

Click Setup Project.
Now you should see a view explaining how to record your first run with your record key.

![image](https://user-images.githubusercontent.com/100849764/174282175-adb87e51-5721-4502-9f47-df0a51477b74.png)

After setting up your project, Cypress inserts a unique projectId into your Cypress configuration file. If you're using source control, we recommend that you check your configuration file, including the projectId, into source control.

## Recording Test Runs to Dashboard
  
Firstly, Cypress will, by default, auto-populate your cypress.json file with a unique project ID as seen above. You can check your cypress.json file to verify this.
  
Secondly, we are going to set the record key as an environmental variable in the project’s repository on Github. Click on the Settings button.
  
![image](https://user-images.githubusercontent.com/100849764/174294695-b38ba85d-0bdb-4398-8621-650cb22cb8a2.png)

Click on the Secrets tab on the left hand menu to navigate to the Secrets page then click on New secret button on the right hand side of the screen.
  
![image](https://user-images.githubusercontent.com/100849764/174294895-81370ae0-c19d-4033-9ce6-49fdbf093ddb.png)

You should see a screen as shown below. Type in the name of your secret then copy the value of your record key from the runs tab of your test runner and paste it in the value field then click the Add secret button.

![image](https://user-images.githubusercontent.com/100849764/174295204-fab978be-d7ce-4054-b58d-be0aec314b30.png)
  
Update your workflow configuration to include a record field and a CYPRESS_RECORD_KEY env variable.
  
![image](https://user-images.githubusercontent.com/100849764/174297160-d747cfdc-38e5-44bc-8a42-fdd17f90970d.png)

record: This tells Cypress to take video recording, screenshots and logs of all our test runs.
We are also passing our dashboard record key as an environment variable here. Cypress action by default runs the cypress run command for us. In addition to that if it sees a CYPRESS_RECORD_KEY and a record property set to true, it will automatically start recording the test.

Now we are all set!! Push to GitHub and as soon as the tests finish running, you should be able to see the details of the tests on the dashboard.

![image](https://user-images.githubusercontent.com/100849764/174297395-309208dd-e9e0-44a9-853a-50201de6604e.png)
  
  
## Execution Results
  
All Execution Results are stored in [Cypress Dashboard](https://dashboard.cypress.io/projects/scty4f/runs). 

## Test Data Management Framework:

TDM is the Test Data Management framework used for this Regression Automation for handling 
dynamic test data creation. This can be run in any environment by changing the 'environment' parameter  
in 'cypress.config.js' file. The valid environements are 'test', 'dev' and 'td'.

All test data scenarios are defined in 'cypress\tdm\dataReqTemplate'. New test data requirement can be added 
as new scenario in data requirement templates.

Basic assets (customer, carrier and facility) in a data scenario should be parameterized with staic asset key from 'cypress\tdm\globalData\staticAssets.js'.

To generate testdata within Cyrpess test, call 'getTestData' function from 'cypress\utilities\tdmUtils\tdmUtils.js'. 
The parameters for 'getTestData' method are
dataType: load/carrier/customer/facility
dataCondition: Name of the data requirement template(csv file) from 'cypress\tdm\dataReqTemplate'
dataScenario: Name of the scenario to be executed from data requirement template

'getTestData' function will return a data object in key, value format including
- a flag named 'isDataCreationSuccessful' to represent if the data has been created successfully or not. The expected value is either 'true' or'false'.
- data that has been created if successful
- relevant details associated with the data
- inputs that had been supplied in the scenario to create the data

The newly created data and relevant information can be accessed using the keys from the returned data object for further use inside the test.

## Code Commit Checklist:
1. Redundant utilities should not be added. Before adding any new utilities, it must be checked if the step could be performed using any existing utilities or by enhancing any existing utilities.
2. All application specific utilities should go under 'appSpecificUtils' and general utilities should go under 'commonUtils'.
3. All test case specific data should go under 'testData > dynamicData'. All static data like dropdown values, col name etc. should go under 'testData > staticData'.
4. All test cases should be created under 'e2e' folder grouped by module / functionality name.
5. Update 'dataSourceConfig' to configure if the test should run on TDM or hard-coded data from datafile under 'testData > dynamicData'.
6. The coding standard and naming convention must be followed as explained in 
    https://masterysys.atlassian.net/wiki/spaces/EN/pages/1977582018/Cypress+Automation+Best+Practices
    https://masterysys.atlassian.net/wiki/spaces/EN/pages/1984921793/Test+Data+Management+for+Automation
