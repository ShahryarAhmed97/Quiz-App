var config = {
    apiKey: "AIzaSyB2JfRh7LHzqBC0SIE_WMJlHKzdOfSwQiQ",
    authDomain: "olx-shary.firebaseapp.com",
    databaseURL: "https://olx-shary.firebaseio.com",
    projectId: "olx-shary",
    storageBucket: "olx-shary.appspot.com",
    messagingSenderId: "110049738985"
  };
  firebase.initializeApp(config);


    
function itemDetails(){
    var itemName=document.getElementById('itemName').value;
    var model=document.getElementById('model').value;
    var year=document.getElementById('year').value;
    var catSel=document.getElementById('category');
    var category = catSel.options[catSel.selectedIndex].text;
var itemPrice=document.getElementById('itemPrice').value;
   var  itemDesc=document.getElementById('itemDesc').value;
   var itemImg=document.getElementById('itemImg').files[0];

if(itemName!=undefined && itemPrice!=undefined && model!=undefined &&  category!=undefined  && year!=undefined && itemDesc!=undefined && itemImg!=undefined
     && itemName!="" && model!=""  && itemPrice!="" &&  category!="" && year!="" && itemDesc!="" && itemImg!="" && 
      itemName!=" " && model!=" " && itemPrice!=" " &&  category!=" " && year!=" "  && itemDesc!=" "&&  itemImg!=" "){
    // var emailCheck=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // if(email.match(emailCheck)){
    
    let userObj={
        itemName,
        model,
        year,
        category,
        itemDesc,
        itemImg,
        itemPrice


   
    

    }

    return userObj

}

else{
    alert('please Fill all fields Properly!!')
}
}


function createNewAdd(){

  var itemObj= itemDetails();
var userUid=localStorage.getItem('currentUserUid');






firebase.storage().ref().child(`AddImages/${userUid}/${itemObj.itemImg.name}`).put(itemObj.itemImg)
.then((success)=>{
    success.ref.getDownloadURL()
    .then((url)=>{
        itemObj.itemImg=url


                    firebase.database().ref(`allCategories/${itemObj.category}/${userUid}/`)
                    .push(itemObj)
                    .then((success)=>{
                        alert('Add Created Successfully');

                        location.reload();
                        

                    })
                    .catch((error)=>{
                        console.log(error.message)

                    })


    })
    .catch((error)=>{
        console.log(error.message)
        alert(error.message)

    });

})  .catch((error)=>{
    console.log(error.message)

});



 



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


