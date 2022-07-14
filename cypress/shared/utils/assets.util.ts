import path from "path";
import fs from "fs";

export class AssetsUtil {

    public static clearDownloadFolder() {
        const downloadFolder = Cypress.config('downloadsFolder');
        cy.task('clearFolder', downloadFolder);
    }

    public static deleteFolderRecursive(directoryPath: string) {
        if (fs.existsSync(directoryPath)) {
            fs.readdirSync(directoryPath).forEach((file, _index) => {
                const curPath = path.join(directoryPath, file);
                console.log(curPath);

                if (fs.lstatSync(curPath).isDirectory()) {
                    // recurse
                    AssetsUtil.deleteFolderRecursive(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(directoryPath);
        }
    }
}