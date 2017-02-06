console.log('Loaded!');

//Chang the texr of main-text div

var element= document.getElementById( 'main-text');
element.innerHTML = 'New Value';


// Move the image
  

var madi= document.getElementById('madi');

var marginLeft = 0;
function moveRight(){
   marginLeft = marginLeft + 1;
   madi.style.marginLeft = marginLeft + 'px';
}

  madi.onclick= function(){
      var interval = setInterval(moveRight,50);
    
  };
    