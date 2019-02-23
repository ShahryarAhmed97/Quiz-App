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




  
  function viewItemDetails(key,key2,key3){

    let keysObj={
      key,
      key2,
      key3
    }
    localStorage.setItem('keysObj',JSON.stringify(keysObj));

    location.href="../pages/viewItemDetails.html"
  }

  function loadFun(){
      var selectedCat=localStorage.getItem('selectedCategory')
var mainDiv=document.getElementById('mainDiv');

var catHead=document.getElementById('catHead');
catHead.innerHTML=selectedCat

      firebase.database().ref(`allCategories/${selectedCat}/`)
      .on("value",(data)=>{
          var allItemsInCat=data.val();


          
        

          for(var key in allItemsInCat){
              for(var key2 in allItemsInCat[key]){

              

                    mainDiv.innerHTML +=
                     `
                     <div class="col-xs-12 col-sm-6 col-md-3">
                    <article class="card-wrapper">
                      <div class="image-holder">
                        <a href="./pages/addToWishList.html" onclick="wishListun()" class="image-holder__link"></a>
                        <div class="image-liquid image-holder--original" style="background-image: url('${allItemsInCat[key][key2].itemImg}')">
                        </div>
                      </div>
              
                      <div class="product-description">
                        <!-- title -->
                        <h1 class="product-description__title">
                          <a href="#">						
                          "${allItemsInCat[key][key2].itemName}"
                            </a>
                        </h1>
              
                        <!-- category and price -->
                        <div class="row">
                          <div class="col-xs-12 col-sm-8 product-description__category secondary-text">
                          "${allItemsInCat[key][key2].itemDesc}"
                          </div>
                          <div class="col-xs-12 col-sm-4 product-description__price">
                          "${allItemsInCat[key][key2].itemPrice}"
                          </div>
                        </div>
              
                        <!-- divider -->
                        <hr />
              
                        <!-- sizes -->
                        <div >

                        
                        
                        <!-- colors -->
                        
                        <a key= key1= class="btn btn-primary my-3 btn-block" style="color:white; " onclick='viewItemDetails("${selectedCat}","${key}","${key2}")'><strong>View Details</strong></a>                      </div>
              
                    </article>
                  </div>
                    `
                   
            }

            

                   
                    
                
                
              
            
          }

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