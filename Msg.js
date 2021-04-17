//Creating mongoose model for Employee
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const schema = mongoose.Schema({

    'Name': {
        type: String
    },
    'Time': {
        type: String
    },
    'Mssage': {
        type: String
    }
   
})
schema.plugin(mongoosePaginate)
const EMP = mongoose.model('Employee', schema);


module.exports = EMP;