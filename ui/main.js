// Counter code 
var button = document.getElmentById('button');

// Creat a request
var request= new XMLHttprequest();

//Make a request
request.open('GET', 'htttp://http://sid18996.imad.hasura-app.io/counter', true);
request.send(null);

//Capture he responce ina variable
request.onreadystatechange = function(){
    if(request.readtState == XMLHttprequest,DONE){
    //Take some action
        if(request.status == 200)
        {
             var counter= request.responseText;
             var span= document.getElementById('count');
             span.innerHTML = counter.toString();
        }
    }
    // No do noting     
    
}


