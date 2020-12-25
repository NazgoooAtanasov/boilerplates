const { exec } = require('child_process');

const fs = require('fs');

const projectConsts = require('./constants/projectCreationConsts.json');
const fileStreamConsts = require('./constants/fileStreamsConsts.json');

const createDir = () => {
    return new Promise((resolve) => {
        exec(projectConsts.project_dir, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    })
};

const startProcess = () => {
    createDir().then(() => {
        exec(projectConsts.yarn_dependancies, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            console.log(stdout);
        });
    
        exec(fileStreamConsts.project_navigate, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            console.log(stdout);
        });
    
        const stream = fs.createWriteStream(fileStreamConsts.project_dir);
        stream.write(fileStreamConsts.node_express_server_file);    
    });
};

module.exports = startProcess;