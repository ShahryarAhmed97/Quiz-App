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






  
function userDetails(){
    var userName=document.getElementById('userName').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var gender;
   
if(userName!=undefined && email!=undefined && password!=undefined  && userName!="" && email!="" && password!="" &&   userName!=" " && email!=" " && password!=" " ){
    var emailCheck=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(email.match(emailCheck)){
    
    let userObj={
        userName,
        email,
        password,
   
    

    }

    return userObj
}
                    else{
                        alert('email is badly formatted !!')
                }
}

else{
    alert('please Fill all fields Properly!!')
}
}

function signFun(){

    var userObj=userDetails();
console.log(userObj.email)
    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .then((success)=>{

        let userUid=firebase.auth().currentUser.uid;
        // localStorage.setItem('currentUserUid',userUid);

        userObj.userUid=userUid;

        firebase.database().ref('allusers/'+userUid).set(userObj)
        .then((success)=>{

window.location.href="../pages/logIn.html"
        })
        .catch((error)=>{
alert(error.message)
        })

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
    


}


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
        .set(userObj)
        .then((success)=>{
            window.location.href="./pages/home.html"

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