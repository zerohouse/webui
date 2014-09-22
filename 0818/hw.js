
// 숙제 1
-1, 1, " "
값이 있는 것 중에서 false가 아닐때 조건문이 실행된다.

// 숙제 2
default value
a = 0이어서 false라서 default value 값이 출력된다.

// 숙제 3번
result =0;
var i = 0;
while(i<10) {
	result+=i;
	i++;
	}
console.log(result);


// 숙제 4번
var arr = [1,2,3,4,44,66,42,12,32,"234",33,98];
var even = 0;

for (var i =0; i<arr.length; i++){
	if (arr[i]%2==0) {
 		if (typeof arr[i] == "string") break; 
 		even++;
 	}
}

console.log(even);

// 숙제 5번
function printout(obj){
for (i in obj){
	console.log(obj[i]);
	}
	}

// 숙제 6번
function evenarr (arr) {
	var res = arr.filter(function(item){
	return item % 2 ===0;
	});
	return res
	}




