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

    var quizesTable=document.getElementById('quizesTable');

  
  firebase.database().ref('allQuizes/')
  .once('value',(data)=>{
      var allQuizs=data.val();

          for(var key in allQuizs){
            quizesTable.innerHTML+=
      `
      <tr>
          <td style="font-size:1.7em;">
          ${key}

          </td>
      </tr>
      

      `
      for(var key2 in allQuizs[key]){
        quizesTable.innerHTML+=
          `
      <tr>
          <td  style="text-align:center">
              <button   class='btn btn-warning' style="font-size:1.3em" onclick='userGivenQuiz("${key}","${key2}")'>${key2}</button>
          </td>
      </tr>
      `

      }


      
  }
  })


  }

function userGivenQuiz(qName,qTitle){

var g;

var userInfoDiv=document.getElementById('userInfoDiv');
userInfoDiv.innerHTML=''

  firebase.database().ref(`allQuizes/${qName}/${qTitle}/allUsers/`)
  .once('value',(data)=>{

    var userObj=data.val();

    for(var key in userObj){

      for(var key2 in userObj[key]){
        g=userObj[key][key2].userResult;
  //       userInfoDiv.innerHTML+=
  //       `
  //       <div>
  //       <p><span class="bold">Marks:</span> ${userObj[key][key2].userResult}</p>
  // </div>
  //       `

      }

      firebase.database().ref(`allusers/${key}/`)
      .once('value',(data)=>{

          var userInfoObj=data.val();
          userInfoDiv.innerHTML+=
          `
          
          <div class="userInfo" style="box-shadow:">
              <p style="font-size:1.3em"> <span class="bold" style="font-size:1.4em !important">Name:</span> ${userInfoObj.displayName}</p>
              <p style="font-size:1.3em"><span class="bold" style="font-size:1.4em !important">Email:</span> ${userInfoObj.email}</p>
                <p style="font-size:1.3em"><span class="bold" style="font-size:1.4em !important">Marks:</span> ${g}</p>


            
                  
          </div>
      

          `



      })
      
     
     
      
    


    }



  })



}

