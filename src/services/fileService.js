const multiparty = require('multiparty');

module.exports = {
  uploadFileToS3(file) {
    return {
      url: 'https://aceproject.org/ero-en/regions/americas/CO/materiales/Colombia%20%28Cedula%20%20de%20Identidad%20%20Amarilla%20de%20Hologramas%29.jpg',
      title: `cedula-${Date.now().toString()}`
    }
  }
}
