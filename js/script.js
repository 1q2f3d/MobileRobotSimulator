/*1cm -> 2px
 45cm -> 90px
*/
var first_x,first_y,first_w;
var angle;
var agl_flg=0;
var playing_flg=0;
var lines;
window.onload = function() {
    init_onmousedown();
    first_x=document.getElementById("robot").offsetLeft;
    first_y=document.getElementById("robot").offsetTop;
    getCurrentRotation("robot");
    first_w=angle;
    document.createElement;
}
var background=document.getElementById("background");

function startBtn(){
    if(document.getElementById('startBtn').textContent=="Start"){
        document.getElementById('startBtn').textContent="Stop";
        var el = document.getElementById("code");
        lines = el.value.split(";");
        // console.log(el.value.split("(")[3].split(';'));
        var first_mm = new Array();
        for (var i = 0; i < lines.length-1; i++) {
            first_mm[i]=lines[i].split(",")[2];
            if(first_mm[i]<=0x1c) first_mm[i]=300;
        }
        eval(lines[0]);
        run_function(lines.length-1);
        function run_function(n) {
            var set_time=setTimeout(function(){
                if(!playing_flg){
                    eval(lines[lines.length-n]);
                    playing_flg=1;
                    if(n == 1) {
                        clearTimeout(set_time);
                        return 0;
                    }
                    else run_function(n - 1);
                }
            },first_mm[lines.length-n-1]*2.7);
        }
    }
    else{
        document.getElementById('startBtn').textContent="Start";
        for (var i = 1; i < 999; i++) clearInterval(i);
    }
}
function clearBtn() {
    document.getElementById("code").innerHTML = "";
}
function resetBtn(){
    for (var i = 1; i < 999; i++) clearInterval(i);
    playing_flg=0;
    robot.setAttribute('style','transform:rotate('+first_w+'deg); top:'+first_y+'px; left:'+first_x+'px;');
    document.getElementById("wallCrash").innerHTML="";
    document.getElementById('startBtn').textContent="Start";
    document.getElementById("robotRotate").innerHTML="";
}
function hd(f_agl,f_speed,mm,stop){
    var robot=document.getElementById("robot");
    agl_flg=0;
    if(f_agl>=0 && f_agl<360) f_agl+=getCurrentDir();
    const x=robot.offsetTop;
    const y=robot.offsetLeft;
    const goal = mm*0.1*2;
    getCurrentRotation("robot");
    if(angle==360) angle=0;
    var Fx = x, Fy = y, Fw=angle;
    var first_angle=angle;
    playing_flg=1;
    if(first_angle==0 && f_agl<0) first_angle=360;
    var id=setInterval(hd_move,10);
    function hd_move(){
        var x1=robot.offsetTop, y1=robot.offsetLeft;
        wallCrash(id);
        circleCrash(id);
        if(Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y))>=goal){
            playing_flg=0;
            clearInterval(id);
        }
        else if(f_agl>=0 && f_agl<360 || agl_flg){
            Fx+=Math.sin(f_agl*0.017453);
            Fy+=Math.cos(f_agl*0.017453);
            robot.style.top = Fx + 'px';
            robot.style.left = Fy + 'px';
            x1=robot.offsetTop;
            y1=robot.offsetLeft;
        }
        else{
            if(f_agl<0) Fw--;
            else Fw++;
            robot.setAttribute('style','transform:rotate('+Fw+'deg); top:'+Fx+'px; left:'+Fy+'px;');
            getCurrentRotation("robot");
            if(Math.abs(angle-first_angle)>=mm) {
                playing_flg=0;
                clearInterval(id);
            }
        }
    }
}
function hs(f_agl,f_speed,value,stop){
    var robot=document.getElementById("robot");
    agl_flg=0;
    if(f_agl>=0 && f_agl<360) f_agl+=getCurrentDir();
    const x=robot.offsetTop;
    const y=robot.offsetLeft;
    getCurrentRotation("robot");
    if(angle==360) angle=0;
    var Fx = x, Fy = y, Fw=angle;
    var first_angle=angle;
    playing_flg=1;
    if(first_angle==0 && f_agl<0) first_angle=360;
    var id=setInterval(hd_move,10);
    function hd_move(){
        wallCrash(id);
        lineCrash(value,id)
        if(f_agl>=0 && f_agl<360 || agl_flg){
            Fx+=Math.sin(f_agl*0.017453);
            Fy+=Math.cos(f_agl*0.017453);
            robot.style.top = Fx + 'px';
            robot.style.left = Fy + 'px';
        }
        else{
            if(f_agl<0) Fw--;
            else Fw++;
            robot.setAttribute('style','transform:rotate('+Fw+'deg); top:'+Fx+'px; left:'+Fy+'px;');
            getCurrentRotation("robot");
        }
    }
}
function td(f_agl,f_speed,fw_speed,mm,degree,stop,wstop){
    alert("td");
}
function td2(f_agl,f_speed,mm,degree,stop){
    var robot=document.getElementById("robot");
    f_agl+=getCurrentDir();
    var x=robot.offsetTop;
    var y=robot.offsetLeft;
    var goal = mm*0.1*2;
    getCurrentRotation("robot");
    var Fx = x, Fy = y, Fw=angle;
    var first_angle=angle;
    var id=setInterval(td2_move,10);
    playing_flg=1;
    if (f_agl < 0)f_agl += 360;
    else if (f_agl >= 360)f_agl -= 360;
    function td2_move(){
        var x1=robot.offsetTop, y1=robot.offsetLeft;
        wallCrash(id);
        if(Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y))>=goal){
            playing_flg=0;
            clearInterval(id);
        }
        else{
            if(degree<0) Fw-=Math.abs(degree/mm*5);
            else Fw+=degree/mm*5;
            Fx+=Math.sin(f_agl*0.017453);
            Fy+=Math.cos(f_agl*0.017453);
            robot.setAttribute('style','transform:rotate('+Fw+'deg); top:'+Fx+'px; left:'+Fy+'px;');
            getCurrentRotation("robot");
            if(first_angle==180 && degree>=0) {
                angle=-angle;
            }
            else if(first_angle==-180 && degree<0) {
                angle=-angle;
            }
        }
    }
}
function getCurrentRotation( elid ) {
    var el=document.getElementById(elid);
    var st = window.getComputedStyle(el, null);
    var tr=st.getPropertyValue("transform");
    var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
    var a = values[0];
    var b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    if(angle<=0) angle=angle%360+360;
    else if(angle>=360) angle%=360;
}
function getCurrentDir(){
    getCurrentRotation("robot");
    agl_flg=1;
    if(angle>=180 && angle<=360){
        return angle-180;
    }
    else if(angle>0 && angle<180){
        return angle+180;
    }
}
function wallCrash(id){
    if(!id)return;
    var wall=document.getElementsByClassName("wall");
    var robot_front=document.getElementById("robotFront");
    var robot_body=document.getElementsByClassName("robotDot");
    var wall_left,wall_right,wall_top,wall_bottom,robot_left,robot_right,robot_top,robot_bottom;

    for (var i = 0; i < wall.length; i++) {
        wall_left=wall[i].getBoundingClientRect().left;
        wall_right=wall_left + wall[i].getBoundingClientRect().width;
        wall_top=wall[i].getBoundingClientRect().top;
        wall_bottom=wall_top+wall[i].getBoundingClientRect().height;
        robot_left=robot_front.getBoundingClientRect().left;
        robot_right=robot_left+robot_front.getBoundingClientRect().width;
        robot_top=robot_front.getBoundingClientRect().top;
        robot_bottom=robot_top+robot_front.getBoundingClientRect().height;
        if(robot_right>wall_left && robot_right<wall_right && robot_bottom>wall_top && robot_bottom<wall_bottom
            || robot_right>wall_left && robot_right<wall_right && robot_top>wall_top && robot_top<wall_bottom-3
    
            || robot_left<wall_right && robot_left>wall_left && robot_bottom>wall_top && robot_bottom<wall_bottom
            || robot_left<wall_right && robot_left>wall_left && robot_top>wall_top && robot_top<wall_bottom-3
            
            || robot_top<wall_bottom && robot_top>wall_top && robot_left<wall_left && robot_left<wall_right && robot_right>wall_left && robot_right>wall_right
            || robot_bottom<wall_bottom && robot_bottom>wall_top && robot_left<wall_left && robot_left<wall_right && robot_right>wall_left && robot_right>wall_right
            ){
            playing_flg=0;
            clearInterval(id);
            document.getElementById("wallCrash").innerHTML="Crash";
        }
    }

    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < wall.length; i++) {
            wall_left=wall[i].getBoundingClientRect().left;
            wall_right=wall_left + wall[i].getBoundingClientRect().width;
            wall_top=wall[i].getBoundingClientRect().top;
            wall_bottom=wall_top+wall[i].getBoundingClientRect().height;
            robot_left=robot_body[j].getBoundingClientRect().left;
            robot_right=robot_left+robot_body[j].getBoundingClientRect().width;
            robot_top=robot_body[j].getBoundingClientRect().top;
            robot_bottom=robot_top+robot_body[j].getBoundingClientRect().height;
            if(robot_right>wall_left && robot_right<wall_right && robot_bottom>wall_top && robot_bottom<wall_bottom
                || robot_right>wall_left && robot_right<wall_right && robot_top>wall_top && robot_top<wall_bottom-3

                || robot_left<wall_right && robot_left>wall_left && robot_bottom>wall_top && robot_bottom<wall_bottom
                || robot_left<wall_right && robot_left>wall_left && robot_top>wall_top && robot_top<wall_bottom-3
                
                || robot_top<wall_bottom && robot_top>wall_top && robot_left<wall_left && robot_left<wall_right && robot_right>wall_left && robot_right>wall_right
                || robot_bottom<wall_bottom && robot_bottom>wall_top && robot_left<wall_left && robot_left<wall_right && robot_right>wall_left && robot_right>wall_right
                ){
                playing_flg=0;
                clearInterval(id);
                document.getElementById("wallCrash").innerHTML="Crash";
            }
        }
    }
}
function lineCrash(value,id){
    if(!id)return;
    var metal=document.getElementsByClassName("metal");
    var nonMetal=document.getElementsByClassName("nonMetal");
    var robot_body=document.getElementsByClassName("robotDot");
    var metal_left,metal_right,metal_top,metal_bottom,robot_left,robot_right,robot_top,robot_bottom;
    var nonMetal_left,nonMetal_right,nonMetal_top,nonMetal_bottom,robot_left,robot_right,robot_top,robot_bottom;
    for (var i = 0; i < metal.length; i++) {
        metal_left=metal[i].getBoundingClientRect().left;
        metal_right=metal_left + metal[i].getBoundingClientRect().width;
        metal_top=metal[i].getBoundingClientRect().top;
        metal_bottom=metal_top+metal[i].getBoundingClientRect().height;
        robot_left=robot_body[0].getBoundingClientRect().left+4;
        if(angle<360 && angle>=180) robot_left-=8;
        robot_right=robot_left+robot_body[0].getBoundingClientRect().width;
        robot_top=robot_body[0].getBoundingClientRect().top+4;
        if(angle<360 && angle>=180) robot_top-=8;
        robot_bottom=robot_top+robot_body[0].getBoundingClientRect().height;
        getCurrentRotation("robot");
        // console.log("robot "+robot_left+","+robot_right+","+robot_top+","+robot_bottom);
        // console.log("metal "+ metal_left+","+metal_right+","+metal_top+","+metal_bottom);
        if(robot_right>metal_left && robot_right<metal_right && robot_bottom>metal_top && robot_bottom<metal_bottom
            || robot_right>metal_left && robot_right<metal_right && robot_top>metal_top && robot_top<metal_bottom-3
    
            || robot_left<metal_right && robot_left>metal_left && robot_bottom>metal_top && robot_bottom<metal_bottom
            || robot_left<metal_right && robot_left>metal_left && robot_top>metal_top && robot_top<metal_bottom-3
            
            || robot_top<metal_bottom && robot_top>metal_top && robot_left<metal_left && robot_left<metal_right && robot_right>metal_left && robot_right>metal_right
            || robot_bottom<metal_bottom && robot_bottom>metal_top && robot_left<metal_left && robot_left<metal_right && robot_right>metal_left && robot_right>metal_right
            ){
            if(value&0x01){
                playing_flg=0;
                clearInterval(id);
                return;
            }
        }
    }
    for (var i = 0; i < nonMetal.length; i++) {
        nonMetal_left=nonMetal[i].getBoundingClientRect().left;
        nonMetal_right=nonMetal_left + nonMetal[i].getBoundingClientRect().width;
        nonMetal_top=nonMetal[i].getBoundingClientRect().top;
        nonMetal_bottom=nonMetal_top+nonMetal[i].getBoundingClientRect().height;
        robot_left=robot_body[0].getBoundingClientRect().left+8;
        if(angle<360 && angle>=180) robot_left-=16;
        robot_right=robot_left+robot_body[0].getBoundingClientRect().width;
        robot_top=robot_body[0].getBoundingClientRect().top+8;
        if(angle<360 && angle>=180) robot_top-=16;
        robot_bottom=robot_top+robot_body[0].getBoundingClientRect().height;

        if(robot_right>nonMetal_left && robot_right<nonMetal_right && robot_bottom>nonMetal_top && robot_bottom<nonMetal_bottom
            || robot_right>nonMetal_left && robot_right<nonMetal_right && robot_top>nonMetal_top && robot_top<nonMetal_bottom-3
    
            || robot_left<nonMetal_right && robot_left>nonMetal_left && robot_bottom>nonMetal_top && robot_bottom<nonMetal_bottom
            || robot_left<nonMetal_right && robot_left>nonMetal_left && robot_top>nonMetal_top && robot_top<nonMetal_bottom-3
            
            || robot_top<nonMetal_bottom && robot_top>nonMetal_top && robot_left<nonMetal_left && robot_left<nonMetal_right && robot_right>nonMetal_left && robot_right>nonMetal_right
            || robot_bottom<nonMetal_bottom && robot_bottom>nonMetal_top && robot_left<nonMetal_left && robot_left<nonMetal_right && robot_right>nonMetal_left && robot_right>nonMetal_right
            ){
            if(value&0x1c){
                playing_flg=0;
                clearInterval(id);
                return;
            }
        }
    }
}
function circleCrash(id){
    if(!id)return;
    var redCircle=document.getElementsByClassName("redCircle");
    var blueCircle=document.getElementsByClassName("blueCircle");
    var robot_front=document.getElementById("robotFront");
    var redCircle_left,redCircle_right,redCircle_top,redCircle_bottom,robot_left,robot_right,robot_top,robot_bottom;
    var blueCircle_left,blueCircle_right,blueCircle_top,blueCircle_bottom,robot_left,robot_right,robot_top,robot_bottom;

    for (var i = 0; i < redCircle.length; i++) {
        redCircle_left=redCircle[i].getBoundingClientRect().left;
        redCircle_right=redCircle_left + redCircle[i].getBoundingClientRect().width;
        redCircle_top=redCircle[i].getBoundingClientRect().top;
        redCircle_bottom=redCircle_top+redCircle[i].getBoundingClientRect().height;
        robot_left=robot_front.getBoundingClientRect().left;
        robot_right=robot_left+robot_front.getBoundingClientRect().width;
        robot_top=robot_front.getBoundingClientRect().top;
        robot_bottom=robot_top+robot_front.getBoundingClientRect().height;
        // console.log("robot "+robot_left+","+robot_right+","+robot_top+","+robot_bottom);
        // console.log("metal "+ metal_left+","+metal_right+","+metal_top+","+metal_bottom);
        if(robot_right>redCircle_left && robot_right<redCircle_right && robot_bottom>redCircle_top && robot_bottom<redCircle_bottom
            || robot_right>redCircle_left && robot_right<redCircle_right && robot_top>redCircle_top && robot_top<redCircle_bottom-3
    
            || robot_left<redCircle_right && robot_left>redCircle_left && robot_bottom>redCircle_top && robot_bottom<redCircle_bottom
            || robot_left<redCircle_right && robot_left>redCircle_left && robot_top>redCircle_top && robot_top<redCircle_bottom-3
            
            || robot_top<redCircle_bottom && robot_top>redCircle_top && robot_left<redCircle_left && robot_left<redCircle_right && robot_right>redCircle_left && robot_right>redCircle_right
            || robot_bottom<redCircle_bottom && robot_bottom>redCircle_top && robot_left<redCircle_left && robot_left<redCircle_right && robot_right>redCircle_left && robot_right>redCircle_right
            ){
            redCircle[i].setAttribute('style','position:relative;cursor: pointer;visibility:hidden;top:'+redCircle_top+'px;left:'+redCircle_left+'px;');
        }
    }

    for (var i = 0; i < blueCircle.length; i++) {
        blueCircle_left=blueCircle[i].getBoundingClientRect().left;
        blueCircle_right=blueCircle_left + blueCircle[i].getBoundingClientRect().width;
        blueCircle_top=blueCircle[i].getBoundingClientRect().top;
        blueCircle_bottom=blueCircle_top+blueCircle[i].getBoundingClientRect().height;
        robot_left=robot_front.getBoundingClientRect().left;
        robot_right=robot_left+robot_front.getBoundingClientRect().width;
        robot_top=robot_front.getBoundingClientRect().top;
        robot_bottom=robot_top+robot_front.getBoundingClientRect().height;
        // console.log("robot "+robot_left+","+robot_right+","+robot_top+","+robot_bottom);
        // console.log("metal "+ metal_left+","+metal_right+","+metal_top+","+metal_bottom);
        if(robot_right>blueCircle_left && robot_right<blueCircle_right && robot_bottom>blueCircle_top && robot_bottom<blueCircle_bottom
            || robot_right>blueCircle_left && robot_right<blueCircle_right && robot_top>blueCircle_top && robot_top<blueCircle_bottom-3
    
            || robot_left<blueCircle_right && robot_left>blueCircle_left && robot_bottom>blueCircle_top && robot_bottom<blueCircle_bottom
            || robot_left<blueCircle_right && robot_left>blueCircle_left && robot_top>blueCircle_top && robot_top<blueCircle_bottom-3
            
            || robot_top<blueCircle_bottom && robot_top>blueCircle_top && robot_left<blueCircle_left && robot_left<blueCircle_right && robot_right>blueCircle_left && robot_right>blueCircle_right
            || robot_bottom<blueCircle_bottom && robot_bottom>blueCircle_top && robot_left<blueCircle_left && robot_left<blueCircle_right && robot_right>blueCircle_left && robot_right>blueCircle_right
            ){
            blueCircle[i].setAttribute('style','position:relative;cursor: pointer;visibility:hidden;top:'+blueCircle_top+'px;left:'+blueCircle_left+'px;');
        }
    }
}


var img_L = 0;
var img_T = 0;
var targetObj;

// 이미지 움직이기
function moveDrag(e){
    var e_obj = window.event? window.event : e;
    var dmvx = parseInt(e_obj.clientX + img_L);
    var dmvy = parseInt(e_obj.clientY + img_T);
    
    targetObj.style.left = dmvx +"px";
    targetObj.style.top = dmvy +"px";
    return false;
}

// 드래그 시작
function startDrag(e, obj) {
    targetObj = obj;
    var e_obj = window.event ? window.event : e;
    img_L = obj.offsetLeft - e_obj.clientX;
    img_T = obj.offsetTop - e_obj.clientY;
    if (e && (e.which == 2 || e.button == 4 )) {
        angleResizeSpeed+=9;
        if(angleResizeSpeed>=11) angleResizeSpeed=1;
    }
    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    if (e_obj.preventDefault) e_obj.preventDefault();
}

// 드래그 멈추기
function stopDrag(){
     document.onmousemove = null;
     document.onmouseup = null;
}
document.onkeydown = ShowKeyCode;

var key_flg=0;

function ShowKeyCode(evt) {
    var ang=0;
    getCurrentRotation("robot");
    ang=angle-1;
    if(key_flg) return;
    if(evt.keyCode==82){
        getCurrentRotation("robot");
        angle++;
        console.log(ang);
        robot.setAttribute('style','transform:rotate('+angle+'deg); top:'+document.getElementById("robot").offsetTop+'px; left:'+document.getElementById("robot").offsetLeft+'px;');
        document.getElementById("robotRotate").innerHTML=(ang)+"°";
    }
    else if(evt.keyCode==69){
        getCurrentRotation("robot");
        angle--;
        robot.setAttribute('style','transform:rotate('+angle+'deg); top:'+document.getElementById("robot").offsetTop+'px; left:'+document.getElementById("robot").offsetLeft+'px;');
        document.getElementById("robotRotate").innerHTML=(ang)+"°";
    }
    else if(evt.keyCode===27){
        document.getElementById("robotRotate").innerHTML="";
    }
}

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
var angleResizeSpeed=10;
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