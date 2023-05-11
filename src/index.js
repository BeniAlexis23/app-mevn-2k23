const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//mongoose.connect('mongodb://127.0.0.1/mevn-database')
mongoose.connect('mongodb+srv://balh201317:k0WowdF6NtExbUuB@cluster0.ztd5zkf.mongodb.net/?retryWrites=true&w=majority')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/tasks', require('./routes/tasks'))

//Static files
app.use(express.static(__dirname + '/public'))

//Server is Listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

