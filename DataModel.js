const uri = process.env.DB.MONGODB;
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
        'Media': {
            type: Boolean
        },
        
    },
    {
        timestamps: true
    }

);
schema.index({
    createdAt: 1
}, {
    expireAfterSeconds: 172800
});

schema.plugin(mongoosePaginate);
const Msg = mongoose.model('ffb005', schema);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = Msg