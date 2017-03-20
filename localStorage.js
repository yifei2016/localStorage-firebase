// let submit = document.getElementById('submit');

let forget = document.getElementById('forget');

function submitMessage(){
  let firstN = document.getElementById('firstN');
  let lastN = document.getElementById('lastN');
  let fullName =  firstN.value + lastN.value;
  localStorage.setItem('whatever', fullName);
  if (localStorage.getItem('whatever') !== null) {
    let paragraf = document.getElementById("paragraf");
    paragraf.innerHTML = 'welcome ' + localStorage.getItem('whatever'); // a.whatever
  } else {
    let paragraf = document.getElementById("paragraf");
    paragraf.innerHTML = 'please enter your name';
}
  let exampleTextarea = document.getElementById("exampleTextarea");
  let message = {
    name: fullName,
    text: exampleTextarea.value,
    time: moment().format('MM-DD-YYYY, h:mm:ss')
  }
  //update an existing record
  // let messageId = "-Kfc5UVtW1hFT1Y36JTC"
  // firebase.database().ref('message/' + messageId ).set(message);
  //creat a new record
  // firebase.database().ref('message/').push().set(message);
  let messageId = "-Kfc5dxeIK0hwBauZ5-Z";
   firebase.database().ref.child(messageId).remove();
}
//read a record

function animateInterval(percent){
  var myVar = setInterval(frame, 10);
  let progress = document.getElementsByClassName("progress-bar")[0];
  progress.style.width = `0%`;
  progress.style.display = "block";
  function frame(){
    if (percent == 100) {
      progress.style.width = `100%`;
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
  animateInterval(0)

  firebase.database().ref('message/').on('value', function(snapshot) {
    let allMessages = snapshot.val();
    Object.keys(allMessages).reverse().forEach(function(key){
      let message = allMessages[key];
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${message.name}</td>
      <td>${message.text}
      <button style="border:none; background-color:Transparent;"><i class="fa fa-thumbs-up fa-2x" aria-hidden="true" style="color:blue;"></i></button>
      <button style="border:none; background-color:Transparent;"><i class="fa fa-thumbs-down fa-2x" aria-hidden="true" style="color:red;"></i></button></td>
      <td>${message.time}</td>`;
      table.appendChild(tr);
      setTimeout(function(){
        animateInterval(100)
      }, 2000);
    });
  });
}
//delete a record

function forgetButton(){
    localStorage.removeItem('whatever'); // delete a["whatever"]
    let paragraf = document.getElementById("paragraf");
    paragraf.innerHTML="please enter your name";
}



window.onload = function(){


}
//
//   // submit.addEventListener('click', function() {
//   //   // a = {}          // localStorage = {}
//   //   // a.whatever = 2; // localStorage.setItem("whatever",2);
//   //   // a.wha = 3;      // localStorage.setItem("wha",3);
//   //   localStorage.setItem('whatever', firstN.value +lastN.value);
//   //   localStorage.setItem('wha', firstN.value +lastN.value);
//   //   localStorage.setItem('wh', firstN.value +lastN.value);
//   //    //diff key for diff value to save
//   // })
//
//   //
//   // }
//   // // console.log(localStorage.getItem('whatever'))
//
// }
