var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto'); 
 
var config = {
    user : 'sid18996',
    database : 'sid18996',
    host : 'db.imad.hasura-app.io.',
    port : '5432',
    password : process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash(input , salt){
     //jow do we creat hash?
     var hashed = crypto.pbkdf2Sync(input , salt,10000, 512 ,'sha512');
     return hashed.toString('hex');
 }
 
app.get('/hash/:input', function(req,res){
    var hashedString = hash(req.params.input , 'this-is-some-random-string');
    res.send(hashedString);
});
 



var pool = new Pool(config)
app.get('/test-db', function(req, res){
    // make a select request
    //return a responce with the result
    pool.query('SELECT * from test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter', function(req,res){
    counter = counter +1;
   res.send(counter.toString()); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var articles = { 
    'article-one' : {
        title:' Article-one | Sid',
        heading:'Article One',
        date:'Feb 5 2016',
        content: `  <p>
                        This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.
                    </p>
                    
                    <p>
                        This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.
                    </p>
                    
                    <p>
                        This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.This is content for my first Artical.
                    </p>`
                    
                    },
     'article-two': {
        title:' Article-two | Sid',
        heading:'Article Two',
        date:'Feb 15 2016',
        content: `  <p>
                        This is content for my second Artical.
                    </p>`
                    
                    
    },
    'article-three': {
        title:' Article-three | Sid',
        heading:'Article Three',
        date:'Feb 10 2016',
        content: `  <p>
                        This is content for my third Artical.
                    </p>`
                    
    }
};
function createTemplate(data)
{
    
    var title = data.title;
    var heading = data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate = `<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content"width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/> 
                <h3>
                    ${heading}
                </h3>
                <div>
                   ${date.toDateString()}
                </div>
                <div>
                  ${content}
                </div>
            </div>
        </body>
    
    </html>
     `;
     return htmlTemplate;
 }
 
 

var names =[];
app.get('/submit-name/', function(req,res){
    //Get the name form the request
    var name = req.query.name;
    names.push(name)  ;
    //JSON: Javascript Object Notetion
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
   // var articleName=req.params.articleName;
    
    pool.query("SELECT * From article WHERE title = $1" ,[req.params.articleName], function(err, result){
       if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send('Article not found');
            }
            else
            {
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
        }
    });
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
