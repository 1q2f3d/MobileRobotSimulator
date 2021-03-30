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