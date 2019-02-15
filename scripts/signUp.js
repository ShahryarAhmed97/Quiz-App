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


  
function fbLogFun(){
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
      'display': 'popup'
    });



    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      localStorage.setItem('fbUser',JSON.stringify(user));
      localStorage.setItem('token',token)

      let userUid=firebase.auth().currentUser.uid;
      localStorage.setItem('currentUserUid',userUid);

     var uid=user.uid;
     var email=user.email;
     var displayName=user.displayName;
    

      let userObj={
        uid,
        email,
        displayName
      }
      
      firebase.database().ref('allusers/'+userUid)
      .update(userObj)
      .then((success)=>{
          window.location.href="../pages/userHome.html"

      }).catch((error)=>{
        var errorMessage = error.message;
alert(errorMessage)
      })
    

   

  


}).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;  
    var credential = error.credential;
    });
}
