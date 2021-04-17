//Creating mongoose model for Employee
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const schema = mongoose.Schema({
    'data': {
        type: String
    },
    'name': {
        type: String
    },
    'time': {
        type: String
    },
    'room':{
        type: String
    }
},
    {
        timestamps: true
    }
)
schema.plugin(mongoosePaginate)
const Msg = mongoose.model('Chat', schema);


module.exports = Msg;