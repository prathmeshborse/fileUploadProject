const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {type: String, require: true},
    fileURL: {type: String, require: true},
    tags:{type: String},
    email: {type: String}
});

const File = mongoose.model("File", fileSchema);
module.exports = File;