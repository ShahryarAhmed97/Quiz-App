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