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


//Submit name

var submit = document.getElementById('submit_btn');
submit.onclick = function(){    
    //Make request to the server
    //Capture all list of name
    var nameInput = document.getElementById('name');
    var name=nameInput.value;

      // Creat a request
    var request= new XMLHttpRequest();

    //Capture he responce ina variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
        //Take some action
            if(request.status === 200)
            {
                var names = request.responseText;
                names=JSON.parse(names);
                var list = '';
                for(var i=0;i<names.length;i++){
                    list += '<li>'+ names[i]+'</li>';
                }
                var ul= document.getElementById('namelist');
                ul.innerHTML = list;
   
            }
        }
        // No do noting  
    };
    
   
    //Make a request to submit end point
    request.open('GET', 'http://sid18996.imad.hasura-app.io/submit-name?name='+ name, true);
    request.send(null);

    
    
};


