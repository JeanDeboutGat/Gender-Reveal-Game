const mongoose = require("mongoose")

const firstNameSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },

})
module.exports = mongoose.model('firstName', firstNameSchema);
