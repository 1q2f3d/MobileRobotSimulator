window.onload = function() {
    init_onmousedown();
    first_x=document.getElementById("robot").offsetLeft;
    first_y=document.getElementById("robot").offsetTop;
    getCurrentRotation("robot");
    first_w=angle;
    document.createElement;
}

function init_onmousedown(){
    for (var i = 4; i < document.getElementsByClassName('wall').length; i++) {
        document.getElementsByClassName('wall')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
    for (var i = 0; i < document.getElementsByClassName('metal').length; i++) {
        document.getElementsByClassName('metal')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
    for (var i = 0; i < document.getElementsByClassName('nonMetal').length; i++) {
        document.getElementsByClassName('nonMetal')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
    for (var i = 0; i < document.getElementsByClassName('prop').length; i++) {
        document.getElementsByClassName('prop')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
    for (var i = 0; i < document.getElementsByClassName('blueCircle').length; i++) {
        document.getElementsByClassName('blueCircle')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
    for (var i = 0; i < document.getElementsByClassName('redCircle').length; i++) {
        document.getElementsByClassName('redCircle')[i].setAttribute('onmousedown','startDrag(event,this);');
    }
}