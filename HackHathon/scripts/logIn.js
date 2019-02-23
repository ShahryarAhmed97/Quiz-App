
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB2JfRh7LHzqBC0SIE_WMJlHKzdOfSwQiQ",
    authDomain: "olx-shary.firebaseapp.com",
    databaseURL: "https://olx-shary.firebaseio.com",
    projectId: "olx-shary",
    storageBucket: "olx-shary.appspot.com",
    messagingSenderId: "110049738985"
  };
  firebase.initializeApp(config);

  function logFun(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;

    if( email!=undefined && password!=undefined &&  email!="" && password!="" &&  email!=" " && password!=" "){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success)=>{
        let userUid=firebase.auth().currentUser.uid;
        let userEmail=firebase.auth().currentUser.email;
        localStorage.setItem('currentUserData',userEmail);
        
        localStorage.setItem('currentUserUid',userUid);
        firebase.database().ref('allusers/'+userUid)
        .once('value',(data)=>{
          var userObj=data.val();
          localStorage.setItem('currentUserName',userObj.userName)

          location.href="../index.html";

        })

    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  else{
    alert('please Fill all fields Properly!!')
}

}



function logOutFun(){
  
  
  firebase.auth().signOut()
  .then(function() {
 localStorage.setItem('currentUserUid',null)
 localStorage.setItem('recieverId',null)
  localStorage.setItem('recieverEmail',null)
  localStorage.setItem('currentUserData',null);




 location.href="./index.html"
  }).catch(function(error) {
   alert(error.message)
  });    
}