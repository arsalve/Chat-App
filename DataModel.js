const uri = process.env.DB || "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Users?retryWrites=true&w=majority";
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
        'hash': {
            type: String
        },
        'createdAt': {
            type: Date,
            expires: 86400000 ,
            default: Date.now 
        }
    }, {
        timestamps: true
    }

);
schema.plugin(mongoosePaginate)
const Msg = mongoose.model('ChatData', schema);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = Msg