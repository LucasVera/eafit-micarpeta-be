const multiparty = require('multiparty');
const FileType = require('file-type');
const fs = require('fs');
const { handleAndReturnError } = require('../services/errorService');
const { uploadFileToS3, uploadFileToS3Mocked, createDocument, getUserFiles } = require('../services/fileService');
const { authenticateDocument } = require("../services/govCarpetaService");
const { findUserByNationalId } = require('../services/userService');

module.exports = {
  GetUserFiles(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new Error('El id del usuario es requerido');
      }

      getUserFiles(userId).then(files => {
        res.json({
          success: true,
          data: { files }
        });
      }).catch(ex => handleAndReturnError(res, ex));
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  },

  UploadFile(req, res) {
    try {
      const {
        id
      } = req.params;
      console.log('id', id)
      const form = new multiparty.Form();
      console.log('after multiparty form')
      form.parse(req, (error, fields, files) => {
        console.log('form.parse', error, files)
        if (error) {
          return handleAndReturnError(res, error);
        }
        const { path } = files.file[0];
        fs.readFile(path, (err, buffer) => {
          console.log('after fs.readFile', err, buffer)
          if (err) {
            return handleAndReturnError(res, err);
          }
          FileType.fromBuffer(buffer).then(type => {
            console.log('after fromBuffer', type)
            const fileName = `test-${Date.now().toString()}` // Nombre del archivo aquí
            const {
              title,
              url,
            } = uploadFileToS3(file);
            console.log({ title, url, id })
            // 1. llamar endpoint de gov carpeta con title, url y id
            // 2. guardar en base de datos (importar modelo y File.create({...}))
          }).catch(ex => handleAndReturnError(res, ex));
        });
      })
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  },

  UploadFileMocked(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        url,
      } = uploadFileToS3Mocked();
      // 1. llamar endpoint de gov carpeta con title, url y id
      // 2. guardar en base de datos (importar modelo y File.create({...}))
      authenticateDocument(id, url, title).then(({ data, status, statusText }) => {
        console.log('after auth docu', data, status, statusText)
        if (status !== 200) {
          return handleAndReturnError(res, data, status);
        }
        findUserByNationalId(id).then(user => {
          createDocument(title, user.id, url, 'jpg', true).then(file => {
            res.json({
              success: true,
              data: { file }
            });
            res.end();
          }).catch(ex => handleAndReturnError(res, ex));
        }).catch(ex => handleAndReturnError(res, ex));
      }).catch(ex => handleAndReturnError(res, ex));
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  }
}
