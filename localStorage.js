window.onload = function(){
  var submit = document.getElementById('submit');
  var firstN = document.getElementById('firstN');
  var lastN = document.getElementById('lastN');
  var forget = document.getElementById('forget');
  var paragraf = document.getElementById("paragraf")
  submit.addEventListener('click', function() {
    // a = {}          // localStorage = {}
    // a.whatever = 2; // localStorage.setItem("whatever",2);
    // a.wha = 3;      // localStorage.setItem("wha",3);
    // a.whatever = 4; // localStorage.setItem("whatever",4);
    localStorage.setItem('whatever', firstN.value +lastN.value);
    localStorage.setItem('wha', firstN.value +lastN.value);
    localStorage.setItem('wh', firstN.value +lastN.value);
     //diff key for diff value to save
  })
  if (localStorage.getItem('whatever') !== null) {
    paragraf.innerHTML = 'welcome ' + localStorage.getItem('whatever'); // a.whatever
    paragraf.innerHTML = 'welcome ' + localStorage.getItem('wh');       // a.wh
  } else {
    paragraf.innerHTML = 'please enter your name';
  }
  // console.log(localStorage.getItem('whatever'))
  forget.addEventListener('click', function() {
    localStorage.removeItem('whatever'); // delete a["whatever"]
    paragraf.innerHTML="please enter your name";
  })
}
