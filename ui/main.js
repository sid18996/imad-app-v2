// Counter code 
var button = document.getElementById('counter');
button.onclick = function(){
     // Creat a request
    var request= new XMLHttpRequest();

    //Capture he responce ina variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
        //Take some action
            if(request.status === 200)
            {
                 var counter= request.responseText;
                 var span= document.getElementById('count');
                 span.innerHTML = counter.toString();
            }
        }
        // No do noting  
    };
    
    //Make a request to counter end point
    request.open('GET', 'http://sid18996.imad.hasura-app.io/counter', true);
    request.send(null);

};


