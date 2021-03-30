function addWall(value){
    var div = document.createElement('div');
    div.style = 'position:absolute'
    document.body.appendChild(div);
    document.getElementById('mapWallArea').appendChild(div);
    if(value==1){
        div.innerHTML = '<img onmousedown="startDrag(event,this);" style="position:relative;" class="wall" src="image/mapWallLong.png"></img>';
    }
    else if(value==2){
        div.innerHTML = '<img onmousedown="startDrag(event,this);" style="position:relative;" class="wall" src="image/mapWallShort.png"></img>';
    }
    else if(value==3){
        div.innerHTML = '<img onmousedown="startDrag(event,this);" style="position:relative; height:'+(document.getElementById('wallMakeSize').value.split(',')[0]*2)+'px;width:'+(document.getElementById('wallMakeSize').value.split(',')[1]*2)+'px" class="wall" src="image/mapWallLong.png"></img>';
    }
}
function removeWall(obj){
    var $elem = $('.'+obj.getAttribute('class'));
    var index=$elem.index(obj);
    $elem[index].remove();
}
document.oncontextmenu = function() {
    return false;
}