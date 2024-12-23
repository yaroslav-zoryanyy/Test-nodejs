const fs= require('node:fs/promises');
const path = require("node:path");

const dirNames = ['dir1','dir2','dir3','dir4','dir5']
const fileNames = ['file1.txt','file2.txt','file3.txt','file4.txt','file5.txt',]
const fn = async () => {
    const baseDir = path.join('hw2','baseFolder');
    await fs.mkdir(path.join(baseDir));

    for (const dir of dirNames) {
        let dirPath = path.join(baseDir,dir)
        await fs.mkdir(dirPath);

        for (const file of fileNames) {
            let filePath = path.join(dirPath, file);
            await fs.writeFile(filePath,'content');
            console.log(path.join(filePath));
            console.log((await fs.stat(filePath)).isDirectory())
        }
    }
}
void fn()