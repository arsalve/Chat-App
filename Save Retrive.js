const chalk = require('chalk');
const Msg = require('./DataModel.js')
const util = require('./util.js');
const catchHandler = util.catchHandler;
const ErrorC = chalk.red.inverse;

//following function finds an Msg based on given querry
async function fetchData(roomV, cbl, cb) {
    var query = {
        'hash': roomV
    };
    var page = {
        limit: 100,
        sort: {
            'date': -1
        }
    }
    try {
        var result = await Msg.paginate(query, page);
        return cb.emit(cbl, result);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return "Error"
    }
}


//following function creates an Msg based on given data
async function savechat(obj) {
    try {
        var resp = new Msg({
            'data': obj.data,
            'name': obj.name,
            'hash': obj.hash,
            'time': obj.time
        });
        var a= await resp.save();
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