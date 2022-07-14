import fs from 'fs';
import csv from "csvtojson";

export class ConvertCsvToJsonUtil{
    public static async convert(inputFileName: string, exportFileName: string){
        const rawCSVData = fs.readFileSync(`cypress/fixtures/${inputFileName}`, 'utf8');
        const resultData = await csv({
            delimiter: ','
        }).fromString(rawCSVData);

        const json = JSON.stringify(resultData);

        fs.writeFileSync(`cypress/fixtures/${exportFileName}`, json, 'utf8');
    }
}