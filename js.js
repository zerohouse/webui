(function() {
  var httpRequest;
  var bestbtn = document.getElementById("bestbtn");
  var sm1 = document.getElementById("sm1");
  var sm2 = document.getElementById("sm2");
  var sm3 = document.getElementById("sm3");
  var genre = document.getElementById("genre");
  var more = document.getElementById("more");
  var littlemenu = document.getElementById("littlemenu");
  var morewrap = document.getElementById("morewrap");
  var moremore = document.getElementById("moremore");

  bestbtn.onclick = function() { makeRequest('best.html',1); };
  //bestbtn.addEventListener('onclick',makeRequest('best.html',1),false);
  sm1.onclick = function() { makeRequest('best.html',1); };
  sm2.onclick = function() { makeRequest('best.html',1); };
  sm3.onclick = function() { makeRequest('best.html',1); };
  moremore.onclick = function() { makeRequest('moremore.html',2); };

  genre.onclick = function() { toggleMenu(); };
  more.onclick = function() { toggleMore(); };

  littlemenu.style.display='none';
  morewrap.style.display='none';
  document.body.onclick = function() { hideMenu(); hideMore(); };
  

  function toggleMenu(){ //장르 클릭시 메뉴 토글 

    if(littlemenu.style.display=='none'){
    littlemenu.style.display='block';
    }
    else{
    littlemenu.style.display='none';
    }
    event.stopPropagation(); // 이벤트 스탑하여 바디 하이드 이벤트 방지 
  }

  function hideMenu(){ // 바디 클릭시 메뉴 하이드
    if(littlemenu.style.display=='block'){
    littlemenu.style.display='none';
    }
  }

  function toggleMore(){ // 더보기 (우상단 아이콘 클릭시 토글)
    if(morewrap.style.display=='none'){
    morewrap.style.display='block';
    }
    else{
    morewrap.style.display='none';
    }
    event.stopPropagation();
  }

  function hideMore(){ // 바디클릭시 토글
    if(morewrap.style.display=='block'){
    morewrap.style.display='none';
    }
  }




  function makeRequest(url, reqtype) {
    
    var loading = document.getElementById("loading");

    if (reqtype==1){ // 아약스 타입 1 = 책 더보기
    loading.style.display='block'; // 로딩이미지 보여줌
    }
    if (reqtype==2){ // 아약스 타입 2 = 메뉴 더 부르기
    event.stopPropagation(); // 메뉴 더부를때 바디이벤트때문에 자동으로 하이드 되므로 이벤트 스탑 
    }


    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    
    if (reqtype==1){
    httpRequest.onreadystatechange = loadNew;} // 로드뉴 = 책 더보기
    else if (reqtype==2){
    httpRequest.onreadystatechange = loadMenu;} // 메뉴 더보기 
    httpRequest.open('GET', url);
    httpRequest.send();
  } // MDN 예제 참조 

  function loadNew() { // 책 더보기 
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        setTimeout(function(){
        document.getElementById("loading").style.display='none';
        document.getElementById("container").innerHTML = httpRequest.responseText;
        }, 500);// 데이터가 적어 로딩 이미지 안보임 보이게 하려고 임의로 시간 셋팅
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

  function loadMenu() { // 메뉴 더보기 
    var moreicon = document.getElementById("moreicon");
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        moreicon.innerHTML += httpRequest.responseText; // 리스폰스 더해주고
        moreicon.style.height=720; //메뉴 높이 조절해줌
        moremore.remove(); // 더보기는 삭제 
      } else {
        alert('There was a problem with the request.');
      }
    }
  }







// 여기서 부터 소팅

var clicked='';
var before='';

for (var i = 1; i<10;i++){
    document.getElementById("m"+i).addEventListener('mousedown', mouseDown, false);
} // 리스너 추가


// 리스너 추가 문자열 파라미터 추가 때문에 포문 안되는데.. 이유를 잘..
  document.getElementById("m1").onmousedown = function() { selectThis('m1'); };
  document.getElementById("m2").onmousedown = function() { selectThis('m2'); };
  document.getElementById("m3").onmousedown = function() { selectThis('m3'); };
  document.getElementById("m4").onmousedown = function() { selectThis('m4'); };
  document.getElementById("m5").onmousedown = function() { selectThis('m5'); };
  document.getElementById("m6").onmousedown = function() { selectThis('m6'); };
  document.getElementById("m7").onmousedown = function() { selectThis('m7'); };
  document.getElementById("m8").onmousedown = function() { selectThis('m8'); };
  document.getElementById("m9").onmousedown = function() { selectThis('m9'); };
 

    window.addEventListener('mouseup', mouseUp, false);


function selectThis(selector){
  //alert();
  clicked = selector;
  before = selector;
  document.getElementById('tmp').innerHTML = document.getElementById(selector).innerHTML;
}

function mouseUp()
{
    event.stopPropagation();
    window.removeEventListener('mousemove', divMove, true); //드래그 종료시 리스너 제거 
}

function mouseDown(e){
  window.addEventListener('mousemove', divMove, true); //드래그 시작시 리스너 추가 
}


function divMove(e){ //마우스 포인터 위치 감지하여 어떤거랑 바꿀지 확인 

  var x = document.body.offsetWidth - e.clientX;
  var y = e.clientY - 110;
    // document.getElementById('username').innerHTML = 'x:' + x + ' y:' + y;


  if (x>280){
        if (y>180){
        switchDiv('m7');
        }

        else if (y>60){
        switchDiv('m4');
        }

        else {
        switchDiv('m1');
        }

  }

  else if (x>180){
        if (y>180){
        switchDiv('m8');
        }

        else if (y>60){
        switchDiv('m5');
        }

        else {
        switchDiv('m2');
        }

  }

  else {
            if (y>180){
        switchDiv('m9');
        }

        else if (y>60){
        switchDiv('m6');
        }

        else {
        switchDiv('m3');
        }

  }
}

function switchDiv(div){ //DIV 임시 저장소에 저장해두고 바꿈 opacity 0으로 지정된 임시저장소.
  // 디스플레이 논으로 지정하니까 innerhtml변경시에 디스플레이 속성 자동으로 바뀜.. 이유를 잘 모르겠음..
  document.getElementById(before).innerHTML = document.getElementById('tmp2').innerHTML;
  document.getElementById('tmp2').innerHTML = document.getElementById(div).innerHTML;
  before = div;
  document.getElementById(clicked).innerHTML = document.getElementById(div).innerHTML;
  document.getElementById(div).innerHTML = document.getElementById('tmp').innerHTML; 
}



})();