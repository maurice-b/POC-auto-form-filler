import {defineConfig} from "cypress";
import {ConvertCsvToJsonUtil} from "./cypress/shared/utils/convert-csv-to-json.util";
const { isFileExist, findFiles } = require('cy-verify-downloads');

export default defineConfig({
    experimentalInteractiveRunEvents: true,

    e2e: {
        setupNodeEvents(on, _config) {
            // implement node event listeners here
            on('before:spec', async (_spec) => {
                // Convert csv file into json
                return await ConvertCsvToJsonUtil.convert('input-data.csv', 'input-data.json');
            }),
            on('after:spec', async (_spec) => {
                // Convert csv file into json
                debugger;
            }),
          on('task', { isFileExist, findFiles });
        },
    },
});
