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
            },first_mm[lines.length-n-1]*3);
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