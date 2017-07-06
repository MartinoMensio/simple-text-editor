const {ipcRenderer} = require('electron');
const loader = require('monaco-loader');
const fs = require('fs');

loader().then((monaco) => {
    let editor = monaco.editor.create(document.querySelector('#container'), {
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });

    // get informations from IPC
    ipcRenderer.on('open-file', (e, url) => {
        // now open this file
        fs.readFile(url.slice(7), 'utf-8', (err, data) => {
            // take the data from the read file and set to the editor
            editor.setModel(monaco.editor.createModel(data, 'javascript'));
        });
    })
});