const multiparty = require('multiparty');
const FileType = require('file-type');
const fs = require('fs');
const { handleAndReturnError } = require('../services/errorService');
const { uploadFileToS3 } = require('../services/fileService');
const {authenticateDocument } = require("../services/govCarpetaService");

module.exports = {
  UploadFile(req, res) {
    try {
      const {
        id
      } = req.params;
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
            const {
              title,
              url,
              id
            } = uploadFileToS3(file);
            // 1. llamar endpoint de gov carpeta con title, url y id
            // 2. guardar en base de datos (importar modelo y File.create({...}))
          }).catch(ex => handleAndReturnError(res, ex));
        });
      })
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  }
}
