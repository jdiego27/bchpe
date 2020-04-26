const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null); //This is to prevent to add an "S" in a new collection

const CvSchema = new Schema({
    name: String,
    lastname: String,
    cellphone: String,
    district: String,
    available_date: String,   
});

module.exports = mongoose.model('taxis',CvSchema); //Here we pass the collection name (created) and the Schema above