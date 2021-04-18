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
        
    }

);
schema.index({createdAt: 1},{expireAfterSeconds: 172800});

schema.plugin(mongoosePaginate)
const Msg = mongoose.model('chatData', schema);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = Msg
