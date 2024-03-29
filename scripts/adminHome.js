var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);


  function logOutFun(){

    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserId',null)

   localStorage.setItem('fbUser',null)
    localStorage.setItem('token',null)
    // localStorage.setItem('fbUser',null);

  
   location.href="../pages/adminLogIn.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }
  


function loadFun(){
    var quizesTable=document.getElementById('quizesTable');
    firebase.database().ref('allQuizes/')
    .once('value',(data)=>{
        var allQuizs=data.val();

            for(var key in allQuizs){
        quizesTable.innerHTML+=
        `
        <tr>
            <td style="font-size:1.5em;">
            ${key}

            </td>
        </tr>
        

        `
        for(var key2 in allQuizs[key]){
            quizesTable.innerHTML+=
            `
        <tr>
            <td style="text-align:center">
                <button class="btn btn-warning" style="font-size:1.2em" onclick='quizTitleFun("${key}","${key2}")'>${key2}</button>
           <br>
            
           </td>
           <br>
        </tr>
        `

        }


        
    }
    })
}



document.getElementById('hideDiv').style.display='none'


function quizTitleFun(pkey,ckey){
    console.log(pkey,ckey)
    document.getElementById('addQuesBtn').style.display='block'
var quizInfo=document.getElementById('quizInfo');
quizInfo.innerHTML=""
    firebase.database().ref(`allQuizes/${pkey}/${ckey}/`)
    .once('value',(data)=>{
        var quizObj=data.val();
        // for(var key in quizObj){
quizInfo.innerHTML+=
            `
            <div class="col-md-10">
            <table>
            <tr> <th>Quiz Name</th><td> ${quizObj.quizName}</td>  </tr>
            <tr>  <th>Quiz Title</th><td> ${quizObj.quizTitle}</td>  </tr>
            <tr>  <th>Quiz Key</th><td> ${quizObj.quizKey}</td>  </tr>

            <tr> <th>Quiz Details</th><td>${quizObj.quizDetails} </td>  </tr>
            <tr> <th>Total Marks</th><td> ${quizObj.ttlMarks}</td>  </tr>
            <tr> <th>Total Ques</th><td> ${quizObj.ttlQues}</td>  </tr>
            <tr><th>Total Time</th> <td>${quizObj.ttlTime} </td>  </tr>
            <tr> <th>Passing Marks</th><td>${quizObj.passMarks} </td>  </tr>

            </table>
            <br>
            <br>
            <button class='btn btn-primary' onclick='seeAllQuiz("${pkey}","${ckey}")'>See All Ques</button>
            </div>
            
            
            <div class="col-md-2" style='margin-top:10px;'>
            

            
            </div>
            `
        // }
    })


}




function updateQuizFun(pkey,ckey,key)
{
    console.log(pkey,ckey,key)
   var keys= localStorage.getItem('updateQuesKeys')
   var quesKeys=JSON.parse(keys)

    var  quizName=document.getElementById('UPqName').value;
var quizTitle=document.getElementById('UPqTitle').value;
var ques=document.getElementById('UPques').value;
var op1=document.getElementById('UPop1').value;
var op2=document.getElementById('UPop2').value;
var op3=document.getElementById('UPop3').value;
var op4=document.getElementById('UPop4').value;
var ansReal=document.getElementById('UPansReal').value;



if(quizName!='' && quizTitle!='' && ques!='' && op1!='' && op2!='' && op3!='' && op4!='' && ansReal!=''  && quizName!=undefined && quizTitle!=undefined && ques!=undefined && op1!=undefined && op2!=undefined && op3!=undefined && op4!=undefined && ansReal!=undefined){
    let quesObj={
        quizName,
        quizTitle,
        ques,
        op1,
        op2,
        op3,
        op4,
        ansReal
    }
    
    firebase.database().ref(`allQuizes/${quesKeys.pkey}/${quesKeys.ckey}/allQues/${quesKeys.key}`)
    .update(quesObj)
    .then((success)=>{

        location.reload();
    })
    .catch((error)=>{
console.log(error)
    })
    

}
}
document.getElementById('updateQuizDiv').style.display='none'

function showUpdateForm(pkey,ckey,key){
document.getElementById('updateQuizDiv').style.display='block'
let updateQuesKeys={
    pkey,
    ckey,
    key
}
localStorage.setItem('updateQuesKeys',JSON.stringify(updateQuesKeys));

//  updateQuizFun(pkey,ckey,key);

    

}

function UPhideQuesFormFun(){
    document.getElementById('updateQuizDiv').style.display='none'

}


function delQuizFun(pkey,ckey,key)
{
    console.log(pkey,ckey,key)

    firebase.database().ref(`allQuizes/${pkey}/${ckey}/allQues/${key}`).remove()
    .then((success)=>{

        location.reload();
    })
    .catch((error)=>{
console.log(error)
    })

}


function seeAllQuiz(pkey,ckey){
    document.getElementById('superMainDiv').style.display="none"
    document.getElementById('allQuesDiv').style.display="block"
var showAllQuesDiv=document.getElementById('showAllQuesDiv'); 

firebase.database().ref(`allQuizes/${pkey}/${ckey}/allQues/`)
.once('value',(data)=>{
    var allQuesObj=data.val();

    showAllQuesDiv.innerHTML+=

    `
    <div>
    <h3>${pkey} --->  ${ckey}</h3>
    </div>

    `
    for(var key in allQuesObj){

        showAllQuesDiv.innerHTML+=
        `
       
        <div style="box-shadow:0px 0px 10px grey">
        
        
        <p>Question : ${allQuesObj[key].ques}</p>
        <p>Option 1 : ${allQuesObj[key].ansReal}</p>
        <p>Option 2 : ${allQuesObj[key].op1}</p>
        <p>Option 3 : ${allQuesObj[key].op2}</p>
        <p>Option 4 : ${allQuesObj[key].op3}</p>
        <p>Answer :  ${allQuesObj[key].op4}</p>

        <br>
        <div style="text-align:center">
        <button class="btn btn-danger" onclick='delQuizFun("${pkey}","${ckey}","${key}")'>Delete</button>
        <button class="btn btn-warning" onclick='showUpdateForm("${pkey}","${ckey}","${key}")'>Update</button>
        </div>
        <br>
        </div>
       <br>
        `
    }
})

}




function showAddQues(){
    document.getElementById('addQuesForm').style.display='block'

}

function hideQuesFormFun(){
    document.getElementById('addQuesForm').style.display='none'

}

function showDiv(){
    document.getElementById('hideDiv').style.display='block'
    document.getElementById('newQuizId').style.display='none'
    document.getElementById('qTableDiv').style.display='none'

    document.getElementById('quizInfoMain').style.display='none'


}

function createQuizFun(){
    var quizName=document.getElementById('quizName').value;
    var quizTitle=document.getElementById('quizTitle').value;
    var quizDetails=document.getElementById('quizDetails').value;
    var ttlTime=document.getElementById('ttlTime').value;
    var ttlQues=document.getElementById('ttlQues').value;
    var ttlMarks=document.getElementById('ttlMarks').value;
    var passMarks=document.getElementById('passMarks').value;
    var quizKey=document.getElementById('quizKey').value;


    if(quizName!='' && quizTitle!='' && quizKey!='' && quizDetails!=''  && ttlTime!='' && ttlQues!='' && ttlMarks!='' && passMarks!='' && quizName!=undefined && quizTitle!=undefined && quizKey!=undefined && quizDetails!=undefined && ttlTime!=undefined && ttlQues!=undefined && ttlMarks!=undefined && passMarks!=undefined){
let newQuizObj={
    quizName,
    quizTitle,
    quizKey,
    ttlTime,
    ttlQues,
    ttlMarks,
    passMarks,
    quizDetails,
}
        firebase.database().ref(`allQuizes/${quizName}/${quizTitle}/`)
        .set(newQuizObj)
        .then((success)=>{
            alert('New Quiz is Created Successfully !!');
            document.getElementById('hideDiv').style.display='none'
location.reload();

        })
        .catch((error)=>{
alert(error.message)
        })
    }

    else{
        alert('plz fill the fields properly !!')
    }


}


function cancelQuiz(){
    location.reload();
}



function submitQuesFun(){

    var eqArr=[];

var quizName=document.getElementById('qName').value;
var quizTitle=document.getElementById('qTitle').value;
var ques=document.getElementById('ques').value;
var op1=document.getElementById('op1').value;
var op2=document.getElementById('op2').value;
var op3=document.getElementById('op3').value;
var op4=document.getElementById('op4').value;
var ansReal=document.getElementById('ansReal').value;

if(quizName!='' && quizTitle!='' && ques!='' && op1!='' && op2!='' && op3!='' && op4!='' && ansReal!=''  && quizName!=undefined && quizTitle!=undefined && ques!=undefined && op1!=undefined && op2!=undefined && op3!=undefined && op4!=undefined && ansReal!=undefined){
let quesObj={
    quizName,
    quizTitle,
    ques,
    op1,
    op2,
    op3,
    op4,
    ansReal
}

firebase.database().ref(`allQuizes/${quizName}/${quizTitle}/allQues/`)
.once('value',(data)=>{
    var existQuiz=data.val();
    for(var key in existQuiz){
        eqArr.push(existQuiz[key])
}

  
firebase.database().ref(`allQuizes/${quizName}/${quizTitle}/`)
.once('value',(data)=>{

var quizObj=data.val();

if(eqArr.length<quizObj.ttlQues){
    
            firebase.database().ref(`allQuizes/${quizName}/${quizTitle}/allQues/`)
        .push(quesObj)
        .then((success)=>{
        document.getElementById('qName').value='';
        document.getElementById('qTitle').value='';
        document.getElementById('ques').value='';
        document.getElementById('op1').value='';
        document.getElementById('op2').value='';
        document.getElementById('op3').value='';
        document.getElementById('op4').value='';
        document.getElementById('ansReal').value='';
        }) 
        .catch((error)=>{
        alert(error)
        })
}

else{
    alert('You Have Inserted All Questions !!')
}

})
})




}
else{
    alert('fill the form corrrectly')
}


}
