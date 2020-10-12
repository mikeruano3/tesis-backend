require('dotenv').config();

const credentials = {
    "type": "service_account",
    "project_id": "yoentroalau-data",
    "private_key_id": process.env.GOOGLEDRIVE_PRIVATEKEYID,
    "private_key": process.env.GOOGLEDRIVE_PRIVATEKEY,
    "client_email": "nodejs-server@yoentroalau-data.iam.gserviceaccount.com",
    "client_id": process.env.CLIENTID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.GOOGLEDRIVE_CERT_URL
}  

const { google } = require('googleapis');
const fs = require('fs')
const os = require('os');
const readline = require('readline');
const stream = require('stream');
const { Duplex } = stream;
const fsprom = fs.promises
const scopes = [
    'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });
const mimeTypes = require('mime-types')

/** CREATE FOLDER */
async function createFolder(req, res) {
    const fileMetadata = {
        'name': req.body.name,
        'mimeType': 'application/vnd.google-apps.folder'
    };
    const data = await drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    }).catch(
        (err) => { return res.status(400).json(err) }
    )
    return res.status(200).json({ folderId: data.data.id })
}

async function bufferToStream(buffer) {
    const duplexStream = new Duplex();
    duplexStream.push(buffer);
    duplexStream.push(null);
    return duplexStream;
}

/** CREATE FILE */
async function createFile(req, res) {
    try{
        const base64File = req.body.uploadFileBase64.split(';base64,').pop();
        const path = `/tmp/${Date.now()}`
        const fileWriteErr = await fsprom.writeFile(path, base64File, {encoding: 'base64'})
        if(fileWriteErr){
            return res.status(400).json('File saving Error!');
        }
        const file = await fsprom.readFile(path)
        .catch(function(error) { 
            return res.status(400).json('File reading Error!');
        }) 
        let fileMimeType = mimeTypes.lookup(path)
        if(!fileMimeType){
            fileMimeType = 'text/plain'
        }
        const fileBody = await bufferToStream(file)
        await fsprom.unlink(path)
        .catch(function(error) { 
            return res.status(400).json('File deleting Error!');
        })
        const folderId = req.body.folderId;
        const fileMetadata = {
            'name': req.body.name,
            parents: [folderId]
        };
        const media = {
            mimeType: fileMimeType,
            body: fileBody
        };
        
        const fileData = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: ['id']
        }).catch( err => { return res.status(400).json(err) } )

        if (fileData.status !== 200) {
            return res.status(400).json(fileData)
        }
        const fileId = fileData.data.id
        
        await drive.permissions.create({
            fileId: fileId,
            requestBody:
            {
                "role": "writer",
                "type": "anyone"
            }
        }).catch(
            (error) => { return res.status(400).json(error) }
        )
        return res.status(200).json({ fileId: fileId })
    }catch(err){
        return res.status(400).json(err)
    }
}

/*** GET FILE  */
async function getFileData(req, res) {
    const fileId = req.params.id;
    const data = await drive.files.get({
        fileId: fileId
    }).catch(
        (err) => { return res.status(400).json(err) }
    )
    return res.json(data.data)
}

/*** DELETE FILE  */
async function deleteFile(req, res) {
    const fileId = req.params.id;
    const deleteData = await drive.files.delete({
        fileId: fileId
    }).catch(
        (err) => { return res.status(400).json(err) }
    )
    return res.json(deleteData.data)
}

/*** LIST FILE  */
async function listFiles(req, res) {
    const data = await drive.files.list({}).catch(
        (err) => { return res.status(400).json(err) }
    )
    const files = data.data.files;
    if (files.length) {
        await files.map((file) => {
            //console.log(file);
        });
    } else {
        console.log('No files found');
    }
    return res.json(files)
}

//createFolder()
//createFile()
//donwloadFile()

module.exports = {
    listFiles,
    createFolder,
    createFile,
    getFileData,
    deleteFile
}