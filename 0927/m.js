(function() {


  var httpRequest;

  function makeRequest(url) {

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
    
    httpRequest.onreadystatechange = loadNew;
    httpRequest.open('GET', url);
    httpRequest.send();
  } // MDN 예제 참조 


  function loadNew() { // 책 더보기 
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        document.getElementById("swipe").innerHTML = httpRequest.responseText;
      } else {
        alert('There was a problem with the request.');
      }
    }
  }





var obj = document.getElementById('swipe');
obj.addEventListener('touchmove', function(event) {

makeRequest(best.html);

}, false);

var start;

var obj = document.getElementById('swipe');
obj.addEventListener('touchstart', function(event) {
    


}, false);




})();