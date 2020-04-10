const scriptName = "메인";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
var str;
function gdb(where) {
  return DataBase.getDataBase(where);
}
function sdb(where, what) {
  DataBase.setDataBase(where, what);
  return true;
}
function adb(where, what) {
  DataBase.appendDataBase(where, what);
  return true;
}
const ver = "w0";
const all = "​".repeat(500);
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var HC = java.lang.String(imageDB.getProfileImage()).hashCode();
  var timer = new Date();
  var day = timer.getDate();
  if (room.indexOf(".") == 0) {
    if (msg.indexOf("Nev") == 0) {
      var t = Date.now();
      try {
        evalso = eval(msg.substr(4));
        replier.reply(evalso);
        var i = Date.now();
        var me = (t - i) / 1000;
        replier.reply("소요시간: "+me);
      } catch (e) {
        replier.reply("이런! 에러가 발생했군요!\n\n"+e+"\n\n#"+e.lineNumber);
      }
    }
    if (gdb("내정보/" + sender + "/사용") == ".") 
      return;
    if (msg == "공식커플") 
      replier.reply("심리 조사단 ♡ 双葉町");
    if (msg.indexOf("쿵냥") == 0) {
      var cn = msg.replace("쿵냥", "");
      if (cn == "" || cn == " " || cn == "아" || cn == "이") {
        replier.reply(sender + "님 안녕하세요!\n쿵냥 " + ver + " 입니다!!\n쿵냥의 자세한 명령어를 보려면 아래를 눌러주세요!" + all + "\n\n\n" + gdb("설명"));
      } else if (cn.indexOf(" 따라하기") == 0) {
        str = cn.substr(6);
        replier.reply(str);
      } else if (cn.indexOf(" 랜덤박스") == 0) {
        if (gdb("내정보/" + sender + "/랜덤박스" + day) == "00000000000") 
          return;
        if (cn.indexOf(" 랜덤박스 추가") == 0) {
          var randomboxplus = cn.substr(9);
          DataBase.appendDataBase("랜덤박스", "\n&+&+\n"+randomboxplus);
          replier.reply("추가에 성공했어요!");
        } else if (cn.indexOf(" 랜덤박스 전적") == 0) {
          var rdj = gdb("내정보/" + sender + "/랜덤박스전적");
          if (rdj == null) 
            replier.reply("전적이 없네요!\n랜덤박스를 열어보세요!");
          else 
            replier.reply(sender + "님의 전적입니다" + all + "\n\n" + rdj);
        } else if(cn.indexOf(" 랜덤박스 초기화")==0) {
          sdb("랜덤박스","ㅔㅔㅔ");
          replier.reply("초기화 완료!");
        } else if(cn==" 랜덤박스 추가"||cn==" 랜덤박스 추가 "){
          replier.reply("내용을 쓰세요!");
        } else {
          if (DataBase.getDataBase("랜덤박스") == null) 
            DataBase.setDataBase("랜덤박스", "쓰레기가 튀어나왔다!!&+&+");
          var randombox = DataBase.getDataBase("랜덤박스").split("\n&+&+\n");
          var random = Math.floor(Math.random() * randombox.length);
          replier.reply(randombox[random]);
          adb("내정보/" + sender + "/랜덤박스" + day, 0);
          adb("내정보/" + sender + "/랜덤박스전적", randombox[random] + "\n");
        } 
      } else if (cn.indexOf(" 릴레이소설") == 0) {
        if (cn.indexOf(" 릴레이소설 추가") == 0) {
          str = cn.substr(10);
          if (gdb("소설/릴레이소설" == null)) 
            sdb("소설/릴레이소설", "");
          adb("소설/릴레이소설", str + "\n");
          replier.reply("륄 래이쇼셜 이 추 가됬어 오." + all + "\n\n" + gdb("소설/릴레이소설"));
        } else if (cn.indexOf(" 릴레이소설 초기화") == 0 && sender.indexOf("리프리티") != -1) {
          sdb("소설/릴레이소설", "");
          replier.reply("초기화 끄읕!");
        } else {
          if (gdb("소설/릴레이소설") == null) {
            replier.reply("릴레이소설이 없네요.");
            return;
          } else {
            replier.reply("릴레이소설이에요!" + all + "\n\n" + gdb("소설/릴레이소설"));
          }
        }
      } else if (cn.indexOf(" 불러오기") == 0) {
        Api.reload();
      } else if (cn.indexOf(" 검색") == 0) {
        str = cn.substr(4);
        var data = Utils.parse("http://api.cnapi.cf/search/?query=" + str + "&i=2");
        replier.reply("검색 결과입니다." + all + "\n\n" + data);
      } else if (cn.indexOf(" 종료") == 0) {
        replier.reply("쿵냥 시스템이 3초후 종료됩니다.\n시작은 시스템 관리자에게 문의하세요.");
        java.lang.Thread.sleep(3000);
        Api.off();
      } else if (cn.indexOf(" 해시코드") == 0) {
        replier.reply(sender + "님의 해시코드: " + HC);
      } else if (cn.indexOf(" 관리자확인") == 0) {
        if (HC == "-1834449321") 
          replier.reply("와! 관리자!");
        else 
          replier.reply("관리자가 아니군! 훠이훠이");
      }
      sdb("내정보/" + sender + "/사용", ".");
      java.lang.Thread.sleep(5000);
      sdb("내정보/" + sender + "/사용", "헿");
    }
  }
  if (room.indexOf("#") == 0) {
    if (msg.indexOf("말") == 0) 
      return;
    msg = msg.replace(/#0/g, (new Date()).getHours() + "시" + (new Date()).getMinutes());
    replier.reply(".에에b", msg + "\n" + msg);
  }
}
//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}
function onStart(activity) {
}
function onResume(activity) {
}
function onPause(activity) {
}
function onStop(activity) {
}
