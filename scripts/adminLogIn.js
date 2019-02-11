// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);

  function signInFun(){

      let email=document.getElementById('email').value;
      let password=document.getElementById('password').value;
    

        firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then((success)=>{
          let userUid=firebase.auth().currentUser.uid
          console.log(userUid)

          localStorage.setItem('currentUserId',userUid)

        window.location.href="../pages/adminHome.html"
     

    })
    .catch((error)=>{
        var errMsg=error.message;
alert(errMsg)

    });

    } 


