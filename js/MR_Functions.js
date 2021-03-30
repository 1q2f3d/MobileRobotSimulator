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