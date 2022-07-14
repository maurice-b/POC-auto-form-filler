# Proof of Concept - Auto form filler

## Install
Run the following script: `npm install`
Be sure you can/have installed Cypress otherwise this will not work.

## Process
1. Convert input .csv file to .json file. All the rows were converted into a json object.
2. Start the Cypress GUI by starting: `npm run-script cy:open` A GUI will be opened.
3. Navigate in the opened Cypress GUI to the e2e test: `intermediair.cy.ts`. Double-click on it and the 2e2 is started.
4. Sit down and drink you coffee. Or if there were errors, you should now get up and fix it!!