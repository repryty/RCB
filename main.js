const scriptName = "main";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
const version = "냐냔냐 C 0";
const all = "​".repeat(500);
function random(num, plus) {
  var rd = Math.floor(Math.random() * num) + plus;
  return rd;
}
var number = {};
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
    /*if (room.indexOf(".") == 0 && msg.indexOf("nev") == 0) {
      Bridge.getScopeOf("변수");
      let ev = msg.replace("nev ", "").replace(/while/g, "").replace(/for/g, "").replace(/eval/g, "").replace(/DataBase/g, "").replace(/FileStream/g, "").replace(/eval/g, "");
      let ev1 = eval(ev);
      replier.reply("< " + ev1);
    }*/

    if (room.indexOf(".") == 0) 
      DataBase.setDataBase("채팅기록/" + room, (new Date()) + " | " + sender + "\n" + msg + "\n\n" + DataBase.getDataBase("채팅기록/" + room));
    if (room.indexOf(".")==0&&msg.indexOf("냐냔냐") == 0) {
      level = DataBase.getDataBase("내정보/" + sender + "/lev");
      money = DataBase.getDataBase("내정보/" + sender + "/mon");
      exp = DataBase.getDataBase("내정보/" + sender + "/exp");
      if (level == null) 
        level = 0;
      if (exp == null) 
        exp = 0;
      if (money == null) 
        money = 0;
      let timer = new Date();
      let day = timer.getDate();
      let nnn = msg.replace("냐냔냐", "");
      if (parseInt(exp) > "0") 
        DataBase.setDataBase("내정보/" + sender + "/exp", parseInt(exp) - 1);
      if (nnn == "" || nnn == " " || nnn.indexOf(" 명령어") == 0) {
        const info = DataBase.getDataBase("설명/설명");
        replier.reply("안녕하세요.\n" + sender + "님, \n" + version + "입니다." + all + "\n\n" + info);
      } else if (nnn.indexOf(" 날씨") == 0 || nnn.indexOf(" 디지털시계") == 0) {
      } else if (nnn.indexOf(" 따라하기") == 0) {
        let retalk = nnn.replace(" 따라하기 ", "");
        replier.reply(sender + ":\n" + retalk);
      } else if (nnn.indexOf(" 내정보") == 0) {
        if (DataBase.getDataBase("출첵/" + sender + day) == "헿") {
          cc = "함";
        } else if (DataBase.getDataBase("출첵/" + sender + day) == null) {
          cc = "안함";
        }
        replier.reply(sender + "님의 프로필\n﹌﹌﹌﹌﹌﹌﹌﹌\n레벨: " + level + "\nexp: " + exp + "\n돈: " + money + "D\n플레이어 닉네임: " + sender + "\n오늘의 출췕: " + cc);
      } else if (nnn.indexOf(" 랜덤박스") == 0) {
        let ranbox = DataBase.getDataBase("랜덤박스/랜덤").split("#!");
        if (nnn.indexOf(" 랜덤박스 추가") == 0) {
          let randomplus = nnn.replace(" 랜덤박스 추가 ");
          DataBase.appendDataBase("#!" + randomplus);
          replier.reply("랜덤박스가 추가되었습니다.");
        } else if (nnn.indexOf(" 초기화") == 0 && sender.indexOf("리프리티") == 0) {
          DataBase.setDataBase("랜덤박스/랜덤", "에에ㅔ레엘#!이라어아아ㅓㅇ");
          replier.reply("랜덤박스가 초기화되었습니다.");
        } else {
          replier.reply(ranbox[ranbox.length]);
        }
      } else if (nnn == " 출첵" || nnn.indexOf(" 출첵 ") == 0) {
        if (DataBase.getDataBase("출첵/" + sender + day) == null) {
          replier.reply(sender + "님의 출췕이 완료되었습니다. +10D");
          DataBase.setDataBase("출첵/" + sender + day, "헿");
          DataBase.setDataBase("내정보/" + sender + "/mon", parseInt(money) + 10);
          if (DataBase.getDataBase("출첵목록/" + day) == null) {
            DataBase.setDataBase("출첵목록/" + day, "아래로갈수록 최근\n\n" + sender);
          } else {
            DataBase.appendDataBase("출첵목록/" + day, "\n" + sender);
          }
        } else {
          replier.reply("오늘 이미 출췕을 했습니다.");
        }
      } else if (nnn.indexOf(" 출첵목록") == 0) {
        replier.reply("출첵 목록입니다." + all + "\n\n" + DataBase.getDataBase("출첵목록/" + day));
      } else if (nnn.indexOf(" 랜덤박스") == 0) {
        let rb = DataBase.getDataBase("랜덤박스/랜덤").split("#!");
        let rbn = Math.floor(Math.random() * (rb.length));
        replier.reply(rb[rbn]);
      } else if (nnn.indexOf(" 코로나") == 0) {
        var data = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr").get().select("ul.liveNum").select("span");        ////ul=class의 liveNum에서 <span>선택
        var dis = data.get(0).text().replace("(누적)", "");
        var rel = data.get(4).text();        //<span> 다섯번째줄 가져옴
        var hos = data.get(7).text();        //<span> 여덟번째줄 가져옴
        var die = data.get(9).text();        //<span> 열번째줄 가져옴
        replier.reply("[실시간 - 국내 코로나 현황]" + "\n확진환자 수: " + dis + "\n완치 수: " + rel + "\n격리자 수" + hos + "\n사망자 수" + die);        //출력
      } else if (nnn.indexOf(" 뚫는법") == 0) {
      } else if (nnn.indexOf(" 소설") == 0) {
        var novelname = msg.replace("냐냔냐 소설 ", "");
        var novel = DataBase.getDataBase("소설/" + novelname);
        if (novel != null) {
          replier.reply(novelname + " 입니다." + all + novel);
        } else if (novel == null) {
          replier.reply("소설이 존재하지 않습니다.");
        }
      } else if (nnn.indexOf(" 숫자맞추기") == 0) {
        number[2] = msg.replace("냐냔냐 숫자맞추기 ", "");
        number[3] = number[2].split(" ");
        if (number[3][1] == null) 
          number[3][1] = 10;
        number[1] = random(number[3][1], 0);
        if (number[3][0] == number[3][1]) {
          replier.reply("축하합니다! 성공하셨습니다! \n숫자는 " + number[3][1]);
        } else {
          replier.reply("아.. 실패네요..\n숫자는 " + number[3][1]);
        }
      } else if (nnn.indexOf(" 불러오기") == 0) {
        Api.reload();
      } else if (nnn.indexOf(" sex")==0){
        replier.reply("안녕하세요 "+sender+"님,\n당신은 블랙리스트에 올라갔습니다.\n추후 이에애한 기능이 추가될 예정이랍니다!");
        DataBase.appendDataBase("블랙리스트",sender+"\n");
      } else if(nnn.indexOf(" ㄷㄱ라아ㅓㄴ")){}
    }
    if (room.indexOf("#") == 0) {
      if (msg.indexOf("말") == 0) {
      } else {
        replier.reply(".에에", msg.replace());
      }
    }
    if (room.indexOf(".") == 0 && msg == "안녕하세요") {
      replier.reply("아년ㅇ하세요");
    }
  }  catch (e) {
  replier.reply("에러가 발생했습니다!!\n" + e + "\n#" + e.lineNumber);
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
