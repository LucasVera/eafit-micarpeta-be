module.exports = {
  addIdFieldToSchema(schema) {
    schema.virtual('id').get(function() {
      return this._id.toString();
    });
    
    schema.set('toObject', { virtuals: true });
    schema.set('toJSON', { virtuals: true });
  },

  hidePassword(doc) {
    doc.password = null;
  }
}
