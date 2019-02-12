var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);




function loadFun(){
alert('kbjbkj')
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
            <td>
                <button onclick='quizTitleFun("${key}","${key2}")'>${key2}</button>
            </td>
        </tr>
        `

        }


        
    }
    })
}



document.getElementById('hideDiv').style.display='none'


function quizTitleFun(pkey,ckey){
    console.log(pkey,ckey)
var quizInfo=document.getElementById('quizInfo');
quizInfo.innerHTML=""
    firebase.database().ref(`allQuizes/${pkey}/${ckey}/`)
    .once('value',(data)=>{
        var quizObj=data.val();
        // for(var key in quizObj){
quizInfo.innerHTML+=
            `
            <table>
            <tr> <th>Quiz Name</th><td> ${quizObj.quizName}</td>  </tr>
            <tr>  <th>Quiz Title</th><td> ${quizObj.quizTitle}</td>  </tr>
            <tr> <th>Quiz Details</th><td>${quizObj.quizDetails} </td>  </tr>
            <tr> <th>Total Marks</th><td> ${quizObj.ttlMarks}</td>  </tr>
            <tr> <th>Total Ques</th><td> ${quizObj.ttlQues}</td>  </tr>
            <tr><th>Total Time</th> <td>${quizObj.ttlTime} </td>  </tr>
            <tr> <th>Passing Marks</th><td>${quizObj.passMarks} </td>  </tr>

            </table>
            `
        // }
    })


}


function showDiv(){
    document.getElementById('hideDiv').style.display='block'
    document.getElementById('newQuizId').style.display='none'
    document.getElementById('qTableDiv').style.display='none'


}

function createQuizFun(){
    var quizName=document.getElementById('quizName').value;
    var quizTitle=document.getElementById('quizTitle').value;
    var quizDetails=document.getElementById('quizDetails').value;
    var ttlTime=document.getElementById('ttlTime').value;
    var ttlQues=document.getElementById('ttlQues').value;
    var ttlMarks=document.getElementById('ttlMarks').value;
    var passMarks=document.getElementById('passMarks').value;


    if(quizName!='' && quizTitle!='' && quizDetails!=''  && ttlTime!='' && ttlQues!='' && ttlMarks!='' && passMarks!='' && quizName!=undefined && quizTitle!=undefined && quizDetails!=undefined && ttlTime!=undefined && ttlQues!=undefined && ttlMarks!=undefined && passMarks!=undefined){
let newQuizObj={
    quizName,
    quizTitle,
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