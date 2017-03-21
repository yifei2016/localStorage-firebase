let forget = document.getElementById('forget');
function submitMessage(){
  let firstN = document.getElementById('firstN');
  let lastN = document.getElementById('lastN');
  let fullName =  firstN.value + " "+ lastN.value;
  localStorage.setItem('whatever', fullName);
  if (localStorage.getItem('whatever') !== null) {
    let paragraf = document.getElementById("paragraf");
    paragraf.innerHTML = 'welcome: ' + localStorage.getItem('whatever'); // a.whatever
  } else {
    let paragraf = document.getElementById("paragraf");
    paragraf.innerHTML = 'please enter your name:';
  }
  //curl 'https://docs-examples.firebaseio.com/rest/saving-data/auth-example.json?auth=CREDENTIAL'
  let exampleTextarea = document.getElementById("exampleTextarea");
  let fb = firebase.database();
  // fb.ref().child('message/')
  //   .once('value')
  //   .then(function() {
  //
  //   })
  //   .then(function(){
  //
  //   })
  //   .then(function(){
  //
  //   })
  //   .catch(function(){
  //
  //   })
  //   .finally(function(){
  //
  //   })
  fb.ref().child('message/').once('value')
    .then(function(snapshot){
      let allMessages = snapshot.val();
      if(allMessages === null) {
        allMessages={}
      }
      let count = Object.keys(allMessages).length;
      let message = {
        name: fullName,
        text: exampleTextarea.value,
        time: moment().format('MM-DD-YYYY, h:mm:ss'),
        id: count+1,
        like: 0
      }
      return fb.ref('message/'+ message.id).set(message);
    })
    .then(function(){
      let table = document.getElementById("table");
      table.innerHTML = '';
      return listMessages();
    })
    .catch(function(err){

    })
  // fb.ref().child('message/').once('value', function(snapshot) {
  //  firebase.database().ref('message/').on('value', function(snapshot) { }// });
}

function updateLike(messageId, likePoints){
  firebase.database().ref('message/' + messageId + 'like/').set(likePoints)
}

//delete a record
//fb.ref().child("message").remove()

// fb.ref('message/').on('value', function(snapshot) {
//   let allMessages = snapshot.val();}

//update an existing record
// let messageId = "-Kfc5UVtW1hFT1Y36JTC"
// firebase.database().ref('message/' + messageId ).set(message);

// let messageId = "-Kfc5dxeIK0hwBauZ5-Z";
//  firebase.database().ref.child(messageId).remove();
//read a record
function animateInterval(percent){
  var myVar = setInterval(frame, 10);
  let progress = document.getElementsByClassName("progress-bar")[0];
  progress.style.width = `0%`;
  progress.style.display = "block";
  function frame(){
    if(percent == 100){
      progress.style.width = '100%';
      progress.style.display = 'none';
      clearInterval(myVar);
    }else{
      percent += 5;
      progress.style.width = `${percent}%`;
    }
  }
}

function listMessages(){
  let table = document.getElementById("table");
  table.innerHTML = '';
  let progress = document.getElementsByClassName("progress-bar")[0];
  animateInterval(0);
  firebase.database().ref('message/').once('value')
  .then(function(snapshot){
      let allMessages = snapshot.val();
      if(allMessages === null){
        allMessages={}
      }
      Object.keys(allMessages).reverse().forEach(function(key){
        let mes = allMessages[key];
        debugger
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${mes.name}</td>
        <td>${mes.text}
        <button style="border:none; background-color:Transparent;">
        <i class="fa fa-thumbs-up fa-2x" aria-hidden="true" style="color:pink;" id="upVote"></i>
        <p id="point"></p></button>
        <button  style="border:none; background-color:Transparent;">
        <i class="fa fa-thumbs-down fa-2x" aria-hidden="true" style="color:black;" id="downVote"></i>
        </button>
        </td>
        <td>${mes.time}</td>
        <td>${mes.id}</td>`;
        table.appendChild(tr);
        let upVote = document.getElementById("upVote");
        let downVote = document.getElementById("downVote");
        let point = document.getElementById("point");
        upVote.addEventListener("click",function(event){
          mes.like += 1;
          point.innerHTML = mes.like;
          updateLike(mes.id,mes.like);
        })
        let fa = function(event){
          mes.like -= 1;
          point.innerHTML = mes.like;
          updateLike(mes.id,mes.like);
        }
        downVote.addEventListener("click",fa)
        setTimeout(function(){
          animateInterval(100)
        }, 2000);
      });
  })
  .catch(function(err){
    debugger
  })
   // firebase.database().ref('message/').on('value', function(snapshot) {});
}

function forgetButton(){
  localStorage.removeItem('whatever'); // delete a["whatever"]
  let paragraf = document.getElementById("paragraf");
  paragraf.innerHTML="please enter your name";
}

window.onload = function(){


}

// submit.addEventListener('click', function() {
//   // a = {}          // localStorage = {}
//   // a.whatever = 2; // localStorage.setItem("whatever",2);
//   // a.wha = 3;      // localStorage.setItem("wha",3);
//   localStorage.setItem('whatever', firstN.value +lastN.value);
//   localStorage.setItem('wha', firstN.value +lastN.value);
//   localStorage.setItem('wh', firstN.value +lastN.value);
//    //diff key for diff value to save
// })
// console.log(localStorage.getItem('whatever'))
