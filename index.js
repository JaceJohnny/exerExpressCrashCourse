const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require ('./Members');

const app = express();


//Init middleware
// app.use(logger);

//Handlebars middleware
app.enginge('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App', 
    members,
}));

//set a static folder
app.use(exporess.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
