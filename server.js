require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    app = express();


var router = express.Router();

//Express config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// mailgun config
var domain = 'www.dungeondesign.space';
// var mailcomposer = require('mailcomposer');
var mailgun = require('mailgun-js')({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: domain
});

// ROUTES
router.post('/mail',function(req,res){
    
	console.log("does this work?")
	var emailTemplate = 'hello email';
	var emailData={
		from: 'Steven.a.Trumble@gmail.ca',
		to: 'Steven.a.trumble@gmail.ca',
		subject: 'Bundle of Sticks Receipt',
		text: emailTemplate
    };
    
	mailgun.messages().send(emailData, function(error,body){
        console.log(error);
		console.log(body);
	});
    res.json({ error: false});
    
});

router.get('/test',(req, res) => res.send('Hello World!'))


app.use('/', router)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))