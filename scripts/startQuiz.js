var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);

  var quesArray=[]
  var ansArray=[]
  var ite=0
  var resArray=[]
  var bolArr=[]
  
  function checkArrFun(ite){
  
  
    var checkBox=document.getElementsByName(`${ite}`);
    for(var i=0;i<checkBox.length;i++){
        if(checkBox[i].checked){
            var checkVal =checkBox[i].value;
            resArray.push(checkVal)
            break;
        }
        else{
        }

    }
    
    setTimeout(()=>{
      console.log(resArray)
      showQuizFun()
    },500)

}


function showQuizFun(){

    
var a=0
    if(ite==quesArray.length){

    for(var i=0;i<quesArray.length;i++){
      if(resArray[i]==ansArray[i]){
        bolArr[i]=true;
        a++;
      }
      else{
        bolArr[i]=false;


      }
      
    }

    var ans=(a/quesArray.length)*100
    console.log( Math.round(ans)+'%')
    localStorage.setItem('currentUserPrtg',ans)
            location.href='../pages/userResult.html'
          


    }
  else{
    var mainDiv=document.getElementById('mainDiv');

        mainDiv.innerHTML=''

        
                mainDiv.innerHTML+=
                `  
                <div class="col-md-10">
                <table>
                <tr> <th>Question :${ite+1}</th><th> ${quesArray[ite].ques}</th>  </tr>
                <tr>  <th  ><input type="radio" name="${ite}" value='${quesArray[ite].op1}' ></th><td> ${quesArray[ite].op1}</td>  </tr>
                <tr> <th><input type="radio" name="${ite}" value='${quesArray[ite].op2}'></th><td>${quesArray[ite].op2} </td>  </tr>
                <tr> <th><input type="radio" name="${ite}"  value='${quesArray[ite].op3}'></th><td> ${quesArray[ite].op3}</td>  </tr>
                <tr> <th><input type="radio" name="${ite}" value='${quesArray[ite].op4}'></th><td> ${quesArray[ite].op4}</td>  </tr>
                </table>
                <br>
                <br>
                </div>
             <div>

             <button class="btn" onclick="checkArrFun('${ite}')">Next</button>
             </div>
                

                `
                
                ite++;
    
    }
}






  function loadFun(){
     var qName= localStorage.getItem('qName');
     var qTitle=localStorage.getItem('qTitle');
var timeDiv=document.getElementById('timeDiv');

    firebase.database().ref(`allQuizes/${qName}/${qTitle}/allQues/`)
     .once('value',(data)=>{
         var allQues=data.val();
         for(var key in allQues){

      quesArray.push(allQues[key])
      ansArray.push(allQues[key].ansReal)
   }

              firebase.database().ref(`allQuizes/${qName}/${qTitle}/`)
              .once('value',(data)=>{
                var quizObj=data.val();
              

                var t=quizObj.ttlTime
                timeDiv.innerHTML= t;

            var interT=1000*60;
                setInterval(()=>{
                  t--;
                  timeDiv.innerHTML= t;
                            },interT)
                            
                            var tOut=quizObj.ttlTime*1000*60;

                            setTimeout(()=>{
                              var a=0

                              for(var i=0;i<quesArray.length;i++){
                                if(resArray[i]==ansArray[i]){
                                  bolArr[i]=true;
                                  a++;
                                }
                                else{
                                  bolArr[i]=false;
                          
                          
                                }
                                
                              }
                          
                              var ans=(a/quesArray.length)*100
                              console.log( Math.round(ans)+'%')
                              localStorage.setItem('currentUserPrtg',ans)
                                      location.href='../pages/userResult.html'                
                            },tOut)
                  
                  
                          })

                
      
      
            showQuizFun()
     })
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


