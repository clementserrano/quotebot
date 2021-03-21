import * as fs from 'file-system';

export function getQuotePath(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readdir('./quotes', (err, files) => {
            if (err) {
                reject(new Error('Error reading pictures folder: ' + err.message))
            }
            resolve('./quotes/' + files[random(files.length)]);
        })
    })

}

function random(max: number) {
    return Math.floor(Math.random() * Math.floor(max - 1));
}