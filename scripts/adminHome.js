var config = {
    apiKey: "AIzaSyC2lA1bqe1ag37VU2WoGvQtrEsf71JqJUQ",
    authDomain: "quizapp-shary.firebaseapp.com",
    databaseURL: "https://quizapp-shary.firebaseio.com",
    projectId: "quizapp-shary",
    storageBucket: "quizapp-shary.appspot.com",
    messagingSenderId: "296957949358"
  };
  firebase.initializeApp(config);







document.getElementById('hideDiv').style.display='none'


function showDiv(){
    document.getElementById('hideDiv').style.display='block'

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