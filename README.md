# MobileRobotSimulator

<img src="image/run.gif" height=300>

#

### 텍스트 입력창에서 모바일로봇 함수를 호출하여 로봇 제어

### 지원함수
    f_agl: 로봇이 바라보는 방향 (0~359)  
    f_speed: 로봇이 움직일 속도 (0~700)  
    mm: 로봇이 이동할 거리 
    value: 감지할 센서 종류 (0x01 or 0x08)
    degree: 회전할 각도
    stop: 미구현(시뮬레이터상 필요 X)

- hd(f_agl,f_speed,mm,stop)
- hs(f_agl,f_speed,value,stop)
- td2(f_agl,f_speed,mm,degree,stop)  