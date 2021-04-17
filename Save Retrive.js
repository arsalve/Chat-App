const uri = process.env.DB || "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Users?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const chalk = require('chalk');

const util = require('./util.js');
const catchHandler = util.catchHandler;
const ErrorC = chalk.red.inverse;

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
    'hash':{
        type: String
    }
}

);
schema.plugin(mongoosePaginate)
const Msg = mongoose.model('Chat2', schema);


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//following function finds an Msg based on given querry
async function fetchData(roomV,cbl,cb) {
    var query =  {'hash':roomV};
    var page = {limit: 100,  sort: {'date' : -1 }}
    try {
        var result = await Msg.paginate(query, page);
            return   cb.emit(cbl, result);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return "Error"
    }
}


//following function creates an Msg based on given data
async function savechat(obj) {
    try {
        var resp =new Msg({
            'data':obj.data.data,
            'name':obj.data.name,
            'hash':obj.hash,
            'time':obj.data.time
        }) ;
        await resp.save();
    } catch (err) {
        console.log(err);
        catchHandler("While conecting the DB", err, ErrorC);
        return err;

    }


}



module.exports = {
    'save': savechat,
    'fetchData': fetchData,
}
