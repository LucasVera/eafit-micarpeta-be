const multiparty = require('multiparty');
const FileType = require('file-type');
const fs = require('fs');
const { handleAndReturnError } = require('../services/errorService');
const { uploadFileToS3 } = require('../services/fileService');

module.exports = {
  UploadFile(req, res) {
    try {
      const form = multiparty.Form();
      form.parse(req, (error, fields, files) => {
        if (error) {
          return handleAndReturnError(res, error);
        }
        const { path } = files.file[0];
        fs.readFile(path, (err, buffer) => {
          if (err) {
            return handleAndReturnError(res, err);
          }
          FileType.fromBuffer(buffer).then(type => {
            const fileName = `test-${Date.now().toString()}` // Nombre del archivo aquí
            uploadFileToS3(buffer, fileName, type).then(result => {
              // upload to s3 in service, get url here and save to DB. Lookup in 
              // db/models/File.js for the schema to save to db
            }).catch(ex => handleAndReturnError(res, ex));
          }).catch(ex => handleAndReturnError(res, ex));
        });
      })
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  }
}
