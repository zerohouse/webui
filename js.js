document.body.addEventListener('click', clickEvents); // 바디에 걸어서 델리게이션..

var littlemenu = document.getElementById('littlemenu');
var morewrap = document.getElementById('morewrap');

function clickEvents(e){ // 클릭부
  switch (e.target.id){
    case 'genre' :
      toggle(littlemenu);
    break;

    case 'more' :
      toggle(morewrap);
    break;

    case 'sm1' :
      getResponse('books.json', changeBooks);
    break;

    case 'sm2' :
      getResponse('books.json', changeBooks);
    break;

    case 'sm3' :
      getResponse('books.json', changeBooks);
    break;

    case 'bestbtn':
      getResponse('books.json', changeAll);
    break;

    default:
      hide(littlemenu);
      hide(morewrap);
    break;
  }
}

function toggle(element){
  var elStyle = window.getComputedStyle(element, null);
  if (elStyle.display === 'none') {
    element.style.display = 'block';
   return;
  }
  element.style.display = 'none';
}

function hide(element){
  element.style.display = 'none';
}


function getResponse(url, dosomething){

  document.getElementById("loading").style.display='block'; //로딩이미지

  var request = new XMLHttpRequest();
  request.open("GET" , url , true);
  request.send(null);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);
      setTimeout(function(){
        document.getElementById("loading").style.display='none';
        dosomething(result);
      }, 500);
  }
  }
}

function makeTemplete(data){
  var templete = document.getElementById('templete').innerHTML;
  var result = "";
  for(var i=0; i<data.length; i++){
    result += templete.replace('%image%', data[i].ImageLink)
                      .replace('%price%', data[i].Price)
                      .replace('%Name%', data[i].Name.substring(0,15))
                      .replace('%author%', data[i].Writer);
  }
  hide(littlemenu);
  return result;
}

function changeBooks(data){
    var container = document.getElementById('bookcontainer');
    container.innerHTML = makeTemplete(data);
}

function changeAll(data){
    var container = document.getElementById('container');
    var allbooks = document.getElementById('allbooks').innerHTML;
    allbooks = allbooks.replace('%bookcontents%', makeTemplete(data)+makeTemplete(data)+makeTemplete(data)+makeTemplete(data));
    container.innerHTML = allbooks;
}


  
// 여기부터 드래그해서 엘리먼트 순서 바꾸기
// 엘리먼트에 마우스다운하면 그 엘리먼트 드래그 에어리어(탑0;포지션앱솔루트)로 어펜드
// 마우스 무브할때 드래그 이벤트 걸어주고
// 마우스 업할떄 포인터 위치 계산해서 원래 리스트의 n번째 노드앞에 삽입.

var moreicon = document.getElementById('moreicon');

for(var i =1; i<10;i++){
  var drag = document.getElementById('m'+i);
  addDragEvent(drag);
}

function addDragEvent(dragable){
  dragable.addEventListener('mousedown', function(e){
    document.getElementById('dragarea').appendChild(dragable);
    dragable.style.position = 'absolute';
    dragable.style.top = e.clientY-54;
    dragable.style.left = e.clientX-44;
  });

  dragable.addEventListener('mousemove', function(e){
    console.log("move");
    if(dragable.style.position === 'absolute'){
      dragable.style.top = e.clientY-54;
      dragable.style.left = e.clientX-44;
      console.log("x", document.body.offsetWidth - e.clientX);
    }
  });

  dragable.addEventListener('mouseup', function(e){
    dragable.style.position = 'relative';
    dragable.style.top =0;
    dragable.style.left =0;
    var list=document.getElementById("moreicon");
    list.insertBefore(dragable, list.children[computePosition(e)-1]);
    console.log(computePosition(e));
  });


function computePosition(e){ //마우스 포인터 위치 감지하여 어떤거랑 바꿀지 확인 
  var x = document.body.offsetWidth - e.clientX;
  var y = e.clientY - 110;
    if (x>300){
          if (y>180){
            return 7;
          }

          else if (y>60){
            return 4;
          }

          else {
            return 1; 
          }

    }

    else if (x>200){
          if (y>180){
            return 8;
          }

          else if (y>60){
            return 5;
          }

          else {
            return 2;
          }

    }

    else {
          if (y>180){
            return 9;
          }

          else if (y>60){
            return 6;
          }

          else {
            return 3;
          }

    }
  }
}



