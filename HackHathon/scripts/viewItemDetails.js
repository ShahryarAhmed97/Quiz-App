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


  function loadFun(){
 var userUid=localStorage.getItem('currentUserUid')

    var mainDiv=document.getElementById('mainDiv')
      var keys=localStorage.getItem('keysObj');
      var keysObj=JSON.parse(keys)


      if(keysObj.key2==userUid){


      }
     firebase.database().ref(`allusers/${keysObj.key2}/`)
     .once("value",(data)=>{
         var userDetails=data.val();

         console.log(userDetails)
         localStorage.setItem('adUploaderUser',JSON.stringify(userDetails))
         userDiv.innerHTML+=
         
         `
         <div class="col-md-12" style='border: 2px solid white'>
     
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <div class="col-md-8">
          <div class="userInfo">
              <p style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Name:</span> ${userDetails.userName}</p>
              <p style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Email:</span> ${userDetails.email}</p>
           
                  
          </div>
       </div>
       </div>
       
       <br><br><br>
       
       `
       
         

     })




      firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/`)
      .once("value",(data)=>{
          var itemObj=data.val();
          console.log(itemObj)



     

mainDiv.innerHTML+=

                    `
  <div class="col-md-12" style='border: 2px solid white;box-shadow:0px 0px 20px gray;' >
<div class="col-md-4 text-center" style="box-shadow:0px 0px 20px gray;margin-top:20px;">
   <img src="${itemObj.itemImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:250px;width:250px;">
  
   </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="col-md-1"></div>
<div class="col-md-7" >
   <div class="userInfo">
       <p style="font-size:1.3em;"><span class="bold"  style="font-size:1.5em !important;">Name:</span> ${itemObj.itemName}</p>
       <p style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Year:</span> ${itemObj.year}</p>
       <p  style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Model:</span> ${itemObj.model}</p>
       <p  style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Category:</span> ${itemObj.category}</p>
       <p  style="font-size:1.3em;"><span class="bold" style="font-size:1.5em !important;">Description:</span> ${itemObj.itemDesc}</p>
       <p  style="font-size:2em;"><span class="bold" style="font-size:1.5em !important;">Price:</span> ${itemObj.itemPrice}</p>
    
           
   </div>
</div>
</div>

<br><br><br>

`

    })
  }



  function logOutFun(){
  
  
    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserUid',null)
   localStorage.setItem('recieverId',null)
    localStorage.setItem('recieverEmail',null)
    localStorage.setItem('currentUserData',null);
  
  
  
  
   location.href="../index.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }


    
//   function logOutFun(){
    
    
//     firebase.auth().signOut()
//     .then(function() {
//    localStorage.setItem('currentUserUid',null)
//    localStorage.setItem('recieverId',null)
//     localStorage.setItem('recieverEmail',null)
//     localStorage.setItem('currentUserData',null);
//     localStorage.setItem('fbUser',null);
  
  
  
  
//    location.href="../pages/logIn.html"
//     }).catch(function(error) {
//      alert(error.message)
//     });    
//   }




function showMsgDiv(){
  var homeDiv=document.getElementById('homeDiv');
  homeDiv.style.display='block'

  
  var userUid=localStorage.getItem('currentUserUid')
  var allKeys=localStorage.getItem('keysObj');
  var keysObj=JSON.parse(allKeys);
  
var exContacts=[]


  if(keysObj.key2!=userUid){

        firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/contactsOnAd/${userUid}/`)
        .once('value',(data)=>{
          var allContactsInAd=data.val();

          for(var key in allContactsInAd){

          exContacts.push(allContactsInAd[key])
          console.log(allContactsInAd[key])
          }
          if(exContacts.includes(keysObj.key2)===false){
          console.log("2nd console",exContacts.includes(keysObj.key2)===false)
          
         
            firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/contactsOnAd/${userUid}/`)
            .push(keysObj.key2)
            .then((success)=>{
          // console.log(success)
            })
            .catch((error)=>{
          alert(error)
            })


            firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/contactsOnAd/${keysObj.key2}/`)
            .push(userUid)
            .then((success)=>{
              console.log(success)
            })
            .catch((error)=>{
              alert(error)

            })


          
        }

          
       })   
       


   firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/contactsOnAd/${userUid}/`)
   .on("value",(data)=>{
      var allContsOnAd=data.val();
var adUploaderUser=localStorage.getItem('adUploaderUser');
var adUploaderUserObj=JSON.parse(adUploaderUser);
    var allContacts=document.getElementById('allContacts');
    allContacts.innerHTML=""
    localStorage.setItem('recieverUserName',adUploaderUserObj.userName)

for(var key in allContsOnAd){

  allContacts.innerHTML+=
  `
  
  <tr>
  <button class='btn btn-success' style="width:300px; font-size:1.3em;background-color:transparent;color:green" onclick='contactIdFun("${adUploaderUserObj.email}","${adUploaderUserObj.userUid}")'>${adUploaderUserObj.userName}</button>
  </td>
  </tr>
  <br>
  `
}
  
})



        


 }
  else{

    alert('You have iploaded This AD')
    firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/contactsOnAd/${userUid}/`)
    .on("value",(data)=>{
       var allContsOnAd=data.val();
//  var adUploaderUser=localStorage.getItem('adUploaderUser');
//  var adUploaderUserObj=JSON.parse(adUploaderUser);
     var allContacts=document.getElementById('allContacts');
     allContacts.innerHTML=""

     for(var key in allContsOnAd){
      firebase.database().ref(`allusers/${allContsOnAd[key]}`)
      .on("value",(data)=>{
        var recieverObj=data.val();
        localStorage.setItem('recieverUserName',recieverObj.userName)


        allContacts.innerHTML+=
        `
        
        <tr>
        
        <button class='btn btn-success' style="width:200px; font-size:1.3em;background-color:transparent;color:green" onclick='contactIdFun("${recieverObj.email}","${recieverObj.userUid}")'>${recieverObj.userName}</button>
        </td>
        </tr>
        `



      })
      
 

 }
   
 })
 
  }
  

}





function contactIdFun(email,key){
  document.getElementById('msg').value="";
    var userUid=localStorage.getItem('currentUserUid');
    var currentUserName=localStorage.getItem('currentUserName')
    var recieverEmail=email;
    var recieverId=key;
    localStorage.setItem('recieverId',key)
    localStorage.setItem('recieverEmail',email)
    console.log('recEmail',email)
var recieverName=localStorage.getItem('recieverUserName');
  var msgsViewDiv2=document.getElementById('msgsViewDiv2');
     document.getElementById('recieverId').value=recieverEmail;
 var allMsgs=[];

 var allKeys=localStorage.getItem('keysObj');
  var keysObj=JSON.parse(allKeys);

  
  
     firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/chatsOnAd/${userUid+recieverId}/`)

     .on('value',(data)=>{
       var msgsData=data.val();

     var recName=localStorage.getItem('recieverEmail')
       msgsViewDiv2.innerHTML="";
       for(var key in msgsData){

             
  if(msgsData[key].currentUserData==undefined){
    msgsData[key].currentUserData=recieverEmail;
  }
  console.log(userUid)
          if(msgsData[key].currentUserName==currentUserName){
            msgsViewDiv2.innerHTML+=
            `
            <div style="text-align:right;">
            <table   style='margin-left:400px;text-align:right !important;overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;'>
            <tr  style='padding:10px;margin-left:300px;'>
            <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:100px !important ;' ><p  style='width:300px !important ;overflow-wrap: break-word;'>${msgsData[key].msg}</p> </td>
            
            </tr>
            
            <tr style='margin-left:300px;text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
            <td style='padding:10px;'>${msgsData[key].tStamp}&nbsp;&nbsp;&nbsp; ${currentUserName} </td>
            </tr>
            
            </table>
            <br><br>
            </div>
            `
            
          }

          else{

            msgsViewDiv2.innerHTML+=
            `
            <table   style='overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;'>
            <tr  style='padding:10px;'>
            <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:100px !important ;' ><p  style='width:300px !important ;overflow-wrap: break-word;'>${msgsData[key].msg}</p> </td>
            
            </tr>
            
            <tr style='text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
            <td style='padding:10px;'>${msgsData[key].tStamp}&nbsp;&nbsp;&nbsp; ${recieverName} </td>
            </tr>
            
            </table>
            <br><br>
            `
          }
        
         
        
       }


  
     })


    
    //  setInterval(updateScroll,1000);

  
  
  }
  




  function sendFun(){

    var msg=document.getElementById('msg').value;
    var userUid=localStorage.getItem('currentUserUid');
    var allKeys=localStorage.getItem('keysObj');
     var keysObj=JSON.parse(allKeys);
    var recieverId=localStorage.getItem('recieverId');
    var recieverEmail=localStorage.getItem('recieverEmail');
    var currentUserData=localStorage.getItem('currentUserData')
    var currentUserName=localStorage.getItem('currentUserName')
    console.log(currentUserData)
    
    var today = new Date();
    var tStamp=today.toUTCString();
      let userMsg={
      msg,
      tStamp,
      currentUserData,
      currentUserName,
  
    }
  
  
   firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/chatsOnAd/${userUid+recieverId}/`)
    .push(userMsg)
    .then((success)=>{
      contactIdFun(recieverEmail,recieverId)
  
  
  
    })
    .catch((error)=>{
  alert(error)
    });
  
  
    firebase.database().ref(`allCategories/${keysObj.key}/${keysObj.key2}/${keysObj.key3}/chatsOnAd/${recieverId+userUid}/`)
    .push(userMsg)
    .then((success)=>{
      contactIdFun(recieverEmail,recieverId)
  
  
  
    })
    .catch((error)=>{
  alert(error)
    });
  
  
  
  
  }



  


/* ======================== SEND-PUSH-NOTIFICATION-FUNCTION  STARTS ======================== */

function sendNotification() {
  var uid = document.getElementById('uid');
  var msg = document.getElementById('msg');

  firebase.database().ref("/fcmTokens").once("value", function(snapshot) {
      snapshot.forEach(function(token) {
          if (token.val() == uid.value) { //Getting the token of the reciever using  if condition..!   
              // console.log(token.key)   
              $.ajax({
                  type: 'POST',
                  url: "https://fcm.googleapis.com/fcm/send",
                  headers: { Authorization: 'key=' + 'AIzaSyDADr8dRiiVNT-a_PAKPVVw-nxb60OipDc' },
                  contentType: 'application/json',
                  dataType: 'json',
                  data: JSON.stringify({
                      "to": token.key,
                      "notification": {
                          "title": `New Notification Recieved`,
                          "body": msg.value,
                          "icon": `https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png`, //Photo of sender
                          "click_action": `https://www.google.com` //Notification Click url notification par click honay k bad iss url par redirect hoga
                      }
                  }),
                  success: function(response) {
                      console.log(response);
                      //Functions to run when notification is succesfully sent to reciever
                  },
                  error: function(xhr, status, error) {
                      //Functions To Run When There was an error While Sending Notification
                      console.log(xhr.error);
                  }
              });
          }
      });
  });

}

/* ======================== SEND-PUSH-NOTIFICATION-FUNCTION  END ======================== */ 
  



































