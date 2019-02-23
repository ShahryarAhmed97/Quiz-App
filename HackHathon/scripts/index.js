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


  
  /* ======================== REQUESTING-PUSH-NOTIFICATION  START ======================== */

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//       navigator.serviceWorker.register('../olx_sw.js').then(function(registration) {

//           // Registration was successful
//           firebase.messaging().useServiceWorker(registration);

//           firebase.auth().onAuthStateChanged(function(user) {
//               if (user) {

//                   function saveMessagingDeviceToken() {

//                       firebase.messaging().getToken().then(function(currentToken) {
//                           if (currentToken) {
//                               console.log('Got FCM device token:', currentToken);
//                               // Saving the Device Token to the datastore.
//                               firebase.database().ref('/fcmTokens').child(currentToken)
//                                   .set(firebase.auth().currentUser.uid);
//                           } else {
//                               // Need to request permissions to show notifications.
//                               requestforpermision()
//                           }
//                       }).catch(function(error) {
//                           console.error('Unable to get messaging token.', error);
//                       });
//                   } //Savetoken ends here

//                   function requestforpermision() {
//                       firebase.messaging().requestPermission().then(function() {
//                           // Notification permission granted.
//                           saveMessagingDeviceToken();
//                       }).catch(function(error) {
//                           console.error('Unable to get permission to notify.', error);
//                           alert("Your Notifications Are Disabled")
//                       });

//                   } //Req Permisison ends here
//                   requestforpermision()
//               }
//           });
//           console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//           // registration failed :(
//           console.log('ServiceWorker registration failed: ', err);
//       });
//   });
// }

// firebase.messaging().onMessage(function(payload) {
//   console.log(payload)
// });

/* ======================== REQUESTING-PUSH-NOTIFICATION  END ======================== */




  function viewItemDetails(key,key2,key3){

    let keysObj={
      key,
      key2,
      key3
    }
    localStorage.setItem('keysObj',JSON.stringify(keysObj));

    location.href="./pages/viewItemDetails.html"
  }




function catsAllItems(key){
localStorage.setItem('selectedCategory',key)

location.href="./pages/showCatsItems.html"
}



function loadFun(){

  var catsTable=document.getElementById('catsTable');

  var userUid=localStorage.getItem('currentUserUid')

  // var signBtn=document.getElementById('signBtn');
  // var logInBtn=document.getElementById('logInBtn');
  // var gBtn1=document.getElementById('gBtn1');
  // var gBtn2=document.getElementById('gBtn2');
  // var logOutBtn=document.getElementById('logOutBtn');


 



  firebase.database().ref(`allCategories/`)
  .on('value',(data)=>{
    var allCats=data.val();

    for (var key in allCats) {
    
           
      catsTable.innerHTML += 
          `
          <button class="btn btn-info " style="font-size:2em;margin:10px;flex-direction:row;width:170px;height:100px;"  onclick="catsAllItems('${key}')">${key}</button>
         

          
          `
        
        
           }


           for (var key in allCats) {
          for(var key2 in allCats[key]){
              for(var key3 in allCats[key][key2]){



                mainDiv.innerHTML += `
               
              
                  <div class="col-xs-12 col-sm-6 col-md-3">
                    <article class="card-wrapper">
                      <div class="image-holder">
                        <a href="javascript:void(0)" onclick='wishListFun("${key}","${key2}","${key3}")' class="image-holder__link"> </a>
                        <div class="image-liquid image-holder--original" style="background-image: url('${allCats[key][key2][key3].itemImg}')">
                        </div>
                      </div>
              
                      <div class="product-description">
                        <!-- title -->
                        <h1 class="product-description__title">
                          <a href="#">						
                          "${allCats[key][key2][key3].itemName}"
                            </a>
                        </h1>
              
                        <!-- category and price -->
                        <div class="row">
                          <div class="col-xs-12 col-sm-8 product-description__category secondary-text">
                          "${allCats[key][key2][key3].itemDesc}"
                          </div>
                          <div class="col-xs-12 col-sm-4 product-description__price">
                          "${allCats[key][key2][key3].itemPrice}"
                          </div>
                        </div>
              
                        <!-- divider -->
                        <hr />
              
                        <!-- sizes -->
                        <div >

                        
                        
                        <!-- colors -->
                        
                        <a  class="btn btn-warning my-3 btn-block" style="color:white " onclick='viewItemDetails("${key}","${key2}","${key3}")'><strong>View Details</strong></a>                        </div>
                      </div>
              
                    </article>
                  </div>

           
                `

              }
            }
          }
           
        
      
           
          
           
        })


}


function wishListFun(key,key2,key3){
  var wishKeys={
    key,
    key2,
    key3
  }
  localStorage.setItem('wishKeys',JSON.stringify(wishKeys))

console.log(key,key2,key3)
  var userUid=localStorage.getItem('currentUserUid');
var exWishArr=[]
  if(userUid!=null){



    firebase.database().ref(`allCategories/${key}/${key2}/${key3}`)
    .once("value",(data)=>{
      
      var wishObj=data.val();
      console.log(wishObj)

      firebase.database().ref(`wishLists/${userUid}/`)
      .once("value",(data)=>{
        var exWishObjs=data.val();

        for(var key in exWishObjs){
          for(var key2 in exWishObjs[key]){
            for(var key3 in exWishObjs[key][key2]){

              exWishArr.push(key3);

         

            }
          }
         
        }
        console.log(exWishArr)
        console.log(exWishArr.includes(key2)==false)
        
        var wishKeys=localStorage.getItem('wishKeys')
       var wishKeysObj=JSON.parse(wishKeys)
         if(exWishArr.includes(wishKeysObj.key3)==false){

           console.log(wishKeysObj)
           
            firebase.database().ref(`wishLists/${userUid}/${wishKeysObj.key}/${wishKeysObj.key2}/${wishKeysObj.key3}`)
            .set(wishObj) 
            .then((success)=>{
              alert('Item Added to Wishlist SuccessFully !!')
              
              })
              .catch((error)=>{
                alert(error.message)
              })
        
        }
        else{
          alert('Already in WishList!!')
        }
            
          })


      
      
      
    })
    
  }
  else{
    alert('You must Login to add Items into WishList')
  }
    
    
}


 function viewWishListFun(){

  var userUid=localStorage.getItem('currentUserUid');
if(userUid!=null)
{
  location.href="./pages/addToWishList.html";
}

else{
  alert('You must log in to see WishList')
}

  

}





  function createNewAdd(){
      var userUid=localStorage.getItem('currentUserUid')
      if(userUid==null){
          location.href="./pages/logIn.html"
      }
      else{
        location.href="./pages/createNewAdd.html"

      }
  }



  function searchAds(){
    var search=document.getElementById('search').value;
var mainDiv=document.getElementById('mainDiv');
mainDiv.innerHTML=""
    firebase.database().ref(`allCategories/`)
    .once('value',(data)=>{
      var allItemsObj=data.val();
      for(var key in allItemsObj){
        for(var key2 in allItemsObj[key]){
          for(var key3 in allItemsObj[key][key2]){

            if(search.toLowerCase()=== (allItemsObj[key][key2][key3].itemName).toLowerCase()){

              mainDiv.innerHTML += `<div class="col-lg-3 " style="overflow: auto;">
              <div class="our-team-main">
              
              <div class="team-front">
              <img src=${allItemsObj[key][key2][key3].itemImg} class="img-fluid img" />
              <h3 class="card_head">Ad Name: ${allItemsObj[key][key2][key3].itemName}</h3>
              <h3 class="card_head">Ad Name: ${allItemsObj[key][key2][key3].itemPrice}</h3>

              
              
              </div>
              
              <div class="team-back">
              <span class="span_color">
           
            <br>
            <br>
              <br>
              <br>
              <br>
                <br>
                       <a  class="btn btn-primary my-3 btn-block" style="color:white " onclick='viewItemDetails("${key}","${key2}","${key3}")'><strong>View Details</strong></a>
                       <a  class="btn btn-primary my-3 btn-block" style="color:white " onclick='viewLater("${key}","${key2}","${key3}")'><strong>View Later</strong></a>

                       </span>
              </div>
              
              </div>
              </div>
              `

            }

          }
        }

      }


    })

  }


  
  function viewLater(){
    
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
  
  
  
  



