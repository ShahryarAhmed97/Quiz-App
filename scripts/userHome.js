 
var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);


  
  

function loadFun(){
  var allQuizesDiv=document.getElementById('allQuizesDiv');
  var fbUser=localStorage.getItem('fbUser')
  var fbUserObj=JSON.parse(fbUser);
   console.log(fbUserObj)

  var currentUserName=fbUserObj.displayName;
document.getElementById('userHead').innerHTML="Welcome "+currentUserName+" !";

  firebase.database().ref(`allQuizes/`)
  .once('value',(data)=>{
    var allQuizes=data.val()

    for(var key in allQuizes){
      allQuizesDiv.innerHTML+=
        `
        <div>
        <button class="btn btn-warning" id="showSubBtn" onclick='showSubQuizes("${key}")'>${key}</button>
       <br>
        </div>
        `

    }

  })
}

function showSubQuizes(qName){

  var subQuizesDiv=document.getElementById('subQuizesDiv');
  subQuizesDiv.innerHTML=''
  firebase.database().ref(`allQuizes/${qName}/`)
  .once('value',(data)=>{
    var allQuizNames=data.val()

    for(var key in allQuizNames){
      subQuizesDiv.innerHTML+=
        `
        <div >

        <button class="btn btn-warning" id="showSubOptions" style="margin-top:5px !important;"  onclick='showSubQuizDetails("${qName}","${key}")'>${key}</button>
        </div>
        <br>
        `

    }

  })


}

function showSubQuizDetails(qName,qTitle){

  
  var quizDetailsDiv=document.getElementById('quizDetailsDiv');
  quizDetailsDiv.innerHTML=''
  firebase.database().ref(`allQuizes/${qName}/${qTitle}/`)
  .once('value',(data)=>{
    var allQuizNames=data.val()

    // for(var key in allQuizNames){
      quizDetailsDiv.innerHTML+=
        
        `

        <div class="col-md-6 col-md-offset-3">
        <h1>Quiz Details</h1>
<br>
        <table>
        <tr> <th>Quiz Name</th><td> ${allQuizNames.quizName}</td>  </tr>
        <tr>  <th>Quiz Title</th><td> ${allQuizNames.quizTitle}</td>  </tr>

        <tr> <th>Quiz Details</th><td>${allQuizNames.quizDetails} </td>  </tr>
        <tr> <th>Total Marks</th><td> ${allQuizNames.ttlMarks}</td>  </tr>
        <tr> <th>Total Ques</th><td> ${allQuizNames.ttlQues}</td>  </tr>
        <tr><th>Total Time</th> <td>${allQuizNames.ttlTime} </td>  </tr>
        <tr> <th>Passing Marks</th><td>${allQuizNames.passMarks} </td>  </tr>

        </table>
        <br>
        <br>
        <button class='btn btn-primary' onclick='startQuiz("${qName}","${qTitle}")'>Start Quiz</button>

        </div>
        
        
        <div class="col-md-2" style='margin-top:10px;'>
        

        
        </div>
        
        `

    // }

  })


}

function startQuiz(qName,qTitle){
  localStorage.setItem('qName',qName)
  localStorage.setItem('qTitle',qTitle)
  var userUid=localStorage.getItem('currentUserUid')
  firebase.database().ref(`allusers/${userUid}/allQuiz/`)
  .once('value',(data)=>{
    var preQuizObj=data.val();
    for(var key in preQuizObj){
      if(key==qTitle){
        alert('You have Already given This Quiz')
        location.href="../pages/userHome.html"
      }
    }
  
  })
  document.getElementById('hideDiv').style.display='none'
  document.getElementById('quizKeyDiv').style.display='block'

 

  
  
}

function quizKeyFun(){

  var quizKey=document.getElementById('quizKey').value;
var qName=localStorage.getItem('qName')
var qTitle=localStorage.getItem('qTitle')
firebase.database().ref(`allQuizes/${qName}/${qTitle}/`)
.once('value',(data)=>{
  var quizObj=data.val();

  if(quizKey==quizObj.quizKey){
   
    location.href='../pages/startQuiz.html'

  }

  else{
    alert('Invalid Quiz Key')
  }
})


  
}


function logOutFun(){

    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserId',null)

   localStorage.setItem('fbUser',null)
    localStorage.setItem('token',null)
    localStorage.setItem('qName',null)
    localStorage.setItem('qTitle',null)
  
   location.href="../pages/signUp.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }
  