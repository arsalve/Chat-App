//Comon Catch handdling function
const catchHandler = (location, message, color) => {
    var debug =true;
    if (debug == true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }

        console.error(color("error occured when " + location + "\n" + message))
    }
}

module.exports = {
    'catchHandler': catchHandler
};