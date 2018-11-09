const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



function index(req, res) {
    res.format({
        html: function () {
            res.render('home/index')
        },
        json: function() {
            res.json({
                message: 'This is the home page. yay!'
            })
        }
    })

}

const HomeController = {
    index: index,


}

module.exports = HomeController;



const petSchema = mongoose.Schema({
    name: String,
    age: Number,
    species: {
        breed: String,
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };
