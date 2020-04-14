const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null); //This is to prevent to add an "S" in a new collection

const CvSchema = new Schema({
    name: String,
    lastname: String,
    location: String,
    position: String,
    email: String,
    resume: String,    
});

module.exports = mongoose.model('candidates',CvSchema); //Here we pass the collection name (created) and the Schema above