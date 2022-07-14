/// <reference types="cypress" />

import {FormModelInterface} from "../../../shared/interfaces/form-model.interface";
const _inputData: FormModelInterface[] = require('../../fixtures/input-data');

describe("Fill in forms for all Intermediairs", function() {

    _inputData.forEach((item: FormModelInterface, index: number) => {
        debugger;

        it(`[${index} : ${item.name}] Step 1: Validate data`, () => {
            // Validation of the model
            expect(item.name).not.to.empty;
            expect(item.email).not.to.empty;
            expect(item.loonSom).not.to.empty;
        })

        it(`[${index} : ${item.name}] Step 2: Fill in the form and submit`, () => {
            cy.visit('http://localhost:8080/');

            // Search for the input fields and fill in the data
            cy.get('[data-cy=name]').type(item.name);
            cy.get("[data-cy=email]").type(item.email);
            cy.get("[data-cy=loonSom]").type(item.loonSom);

            // Click on the submit button
            cy.get("[data-cy=submit]").click();
        });

        it(`[${index} : ${item.name}] Step 3: Download PDF file and store in folder`, () => {
            // Click on the download link. This will start a download and the data is placed in the folder: download
            cy.get("[data-cy=download-link]").click();

            // Read the file name.
            cy.get("[data-cy=download-link]")
                .invoke('data', 'cy-file-name')
                .then((fileName)=> {
                    expect(fileName).not.to.empty;

                    // @ts-ignore
                    cy.verifyDownload(fileName);
                });
        });
    });
});