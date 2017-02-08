var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
function creatTemplate(data)
{
    var title1 = data.title;
    var heading = data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate = `<html>
        <head>
            <title>
                ${title1}
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
                   ${date}
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


app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
     res.send(creatTemplate(articles[articleName]));
});

var counter=0;
app.get('/counter', function(req,res){
    counter = counter +1;
   res.send(counter.toString()); 
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
