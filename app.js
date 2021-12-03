const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const mongoURI = require('./config/keys').mongoURI;
const passport = require('passport');
const methodOverride =require('method-override')

require('dotenv').config();


const app = express();

app.use(compression());
app.use(methodOverride('_method'))


require('./config/passport')(passport);



mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
      
        useUnifiedTopology: true
    
    })
    .then(() => console.log("MONGO CONNETED"))
    .catch((err) => console.log("MONGO ERR:" + err));

app.use(cors());


app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "PROD") {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.use('/api/reviews',require('./routes/reviewuri.js'));
app.use('/api/auth', require('./routes/users.js'));
app.use('/api/tutoring-classes',require('./routes/tutoring-classes.js'));
app.use('/api/contact-request',require('./routes/contactrequest'));
///app.use('/api/tutoring-classes/:id/enroll',require('./routes/enrolment.js'));

const PORT = process.env.PORT;

https.createServer({
    key: fs.readFileSync(process.env.SSLKEY),
    cert: fs.readFileSync(process.env.SSLCERT),
}, app)
    .listen(PORT, function() {
        console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
    });


app.enable('trust proxy');

app.use(function(req, res, next) {
    if (req.secure) {
        return next();
      }
    res.redirect('https://' + req.headers.host + req.url);
})