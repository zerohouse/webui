document.body.addEventListener('click', clickEvents); // 바디에 걸어서 델리게이션..

var littlemenu = document.getElementById('littlemenu');
var morewrap = document.getElementById('morewrap');
var body = document.querySelector('#container');

addSwipeListener(body);

var page = 1;
function addSwipeListener(obj){

    var startX;
    var startY;
    var isMoving;

    obj.addEventListener('touchstart', touchStart, false);
    obj.addEventListener('cancelTouch', cancelTouch, false);

    function touchStart(e){
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        isMoving = true;
        obj.addEventListener('touchmove', touchMove, false);
    }

    function cancelTouch() {
        obj.removeEventListener('touchmove', touchMove);
        startX = null;
        isMoving = false;
    }

    function touchMove(e) {
             if(isMoving) {
                 var x = e.touches[0].pageX;
                 var y = e.touches[0].pageY;
                 var dx = startX - x;
                 var dy = startY - y;
                 if(Math.abs(dx) >= 20) {
                    cancelTouch();
                    if(dx > 0) {
                        page++;
                        if(page>3)
                          page=1;
                        left(page);
                    }
                    else {
                        page--;
                        if(page<1)
                          page=3;
                        right(page);
                    }
                 }
             }
         }

    function left(i){
      getResponse('book'+i+'.json', changeBooks);
    }

    function right(i){
      getResponse('book'+i+'.json', changeBooks);
    }
}


function clickEvents(e){ // 클릭부
  switch (e.target.id){
    case 'bestbtn':
      getResponse('books.json', changeAll);
    break;
  }
}


function getResponse(url, dosomething){

  var request = new XMLHttpRequest();
  request.open("GET" , url , true);
  request.send(null);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);
       dosomething(result);
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
  return result;
}

function changeBooks(data){
    var container = document.getElementById('swipe');
    container.innerHTML = makeTemplete(data);
}

function changeAll(data){
    var container = document.getElementById('container');
    var allbooks = document.getElementById('allbooks').innerHTML;
    allbooks = allbooks.replace('%bookcontents%', makeTemplete(data)+makeTemplete(data)+makeTemplete(data)+makeTemplete(data));
    container.innerHTML = allbooks;
}