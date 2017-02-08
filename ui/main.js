// Counter code 
var button = document.getElmentById('counter');
button.onclick = function(){
     // Creat a request
    var request= new XMLHttpRequest();

    //Make a request
    request.open('GET', 'htttp://http://sid18996.imad.hasura-app.io/counter', true);
    request.send(null);

    //Capture he responce ina variable
    request.onreadystatechange = function(){
        if(request.readytState == XMLHttpRequest.DONE){
        //Take some action
            if(request.status == 200)
            {
                 var counter= request.responseText;
                 var span= document.getElementById('count');
                 span.innerHTML = counter.toString();
            }
        }
        // No do noting  
    };
    
};


