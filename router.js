const express = require('express');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const chalk = require('chalk');
const router = new express.Router();
const ErrorC = chalk.red.inverse;
const sucU = chalk.blue;
const sucM = chalk.yellow;
//Endpoint for Adding Normal user
router.post('/*', (req, res) => {
    console.log(sucU("New User is beeing processed"))
    try {
        let Responce = DataManupulation.userData(req, (responce, status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})

module.exports = router;