import {defineConfig} from "cypress";
import {ConvertCsvToJsonUtil} from "./cypress/shared/utils/convert-csv-to-json.util";
import fs from "fs";
import {AssetsUtil} from "./cypress/shared/utils/assets.util";

const {isFileExist, findFiles} = require('cy-verify-downloads');

export default defineConfig({
    experimentalInteractiveRunEvents: true,
    trashAssetsBeforeRuns: true,
    e2e: {
        // trashAssetsBeforeRuns: true,
        setupNodeEvents(on, _config) {
            // implement node event listeners here
            on('before:spec', async (_spec) => {
                // Convert csv file into json
                return await ConvertCsvToJsonUtil.convert('input-data.csv', 'input-data.json');
            })
            on('task', {
                isFileExist,
                findFiles,
                clearFolder(folderName) {
                    console.log('deleting folder %s', folderName)

                    return new Promise((resolve, _reject) => {
                        if (!fs.existsSync(folderName)) {
                            fs.mkdirSync(folderName);
                            resolve(null);
                        }

                        AssetsUtil.deleteFolderRecursive(folderName);

                        return resolve(null);
                    })
                },
            });
        },
    },
});
