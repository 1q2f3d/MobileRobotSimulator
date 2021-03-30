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