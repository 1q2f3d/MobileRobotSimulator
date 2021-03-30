// 드래그 시작
function startDrag(e, obj) {
    targetObj = obj;
    var e_obj = window.event ? window.event : e;
    img_L = obj.offsetLeft - e_obj.clientX;
    img_T = obj.offsetTop - e_obj.clientY;
    // 마우스 가운데 버튼 클릭
    if (e && (e.which == 2 || e.button == 1 )) {
        angleResizeSpeed+=9;
        if(angleResizeSpeed>=11) angleResizeSpeed=1;
    }
    if(e.which==3){
        removeWall(obj);
    }
    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    if (e_obj.preventDefault) e_obj.preventDefault();
}
// 이미지 움직이기
function moveDrag(e){
    var e_obj = window.event? window.event : e;
    var dmvx = parseInt(e_obj.clientX + img_L);
    var dmvy = parseInt(e_obj.clientY + img_T);
    
    targetObj.style.left = dmvx +"px";
    targetObj.style.top = dmvy +"px";
    return false;
}
// 드래그 멈추기
function stopDrag(){
     document.onmousemove = null;
     document.onmouseup = null;
}

document.onkeydown = ShowKeyCode;
function ShowKeyCode(evt) {
    if(key_flg) return;
    if(evt.keyCode==82){
        getCurrentRotation("robot");
        angle++;
        document.getElementById("robotRotate").setAttribute('style','transform:rotate('+-angle+'deg); position: absolute; top:20px; left: 100px; font-size: 30px');
        document.getElementById("robotRotate").innerHTML=angle+"°";
        robot.setAttribute('style','transform:rotate('+angle+'deg); top:'+document.getElementById("robot").offsetTop+'px; left:'+document.getElementById("robot").offsetLeft+'px;');
    }
    else if(evt.keyCode==69){
        getCurrentRotation("robot");
        angle--;
        document.getElementById("robotRotate").setAttribute('style','transform:rotate('+-angle+'deg); position: absolute; top:20px; left: 100px; font-size: 30px');
        document.getElementById("robotRotate").innerHTML=angle+"°";
        robot.setAttribute('style','transform:rotate('+angle+'deg); top:'+document.getElementById("robot").offsetTop+'px; left:'+document.getElementById("robot").offsetLeft+'px;');
    }
    else if(evt.keyCode===27){
        document.getElementById("robotRotate").innerHTML="";
    }
}

function angleResize(id) {
    var count = 0;
    getCurrentRotation(id);
    event.preventDefault();
    if (event.wheelDelta >= 120) count+=angleResizeSpeed;
    else if (event.wheelDelta <= -120) count-=angleResizeSpeed;
    angle+=count;
    document.getElementById("robotRotate").setAttribute('style','transform:rotate('+-angle+'deg); position: absolute; top:20px; left: 100px; font-size: 30px');
    document.getElementById("robotRotate").innerHTML=angle+"°";
    robot.setAttribute('style','transform:rotate('+angle+'deg); top:'+document.getElementById("robot").offsetTop+'px; left:'+document.getElementById("robot").offsetLeft+'px;');
    return false;
}