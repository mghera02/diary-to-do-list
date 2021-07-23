let diary=document.querySelector("#diaryInfo");
let submitBtn=document.querySelector("#submit");
//let dateField=document.querySelector("#");
//let pageNum=document.querySelector("#");
//let nextPageBtn=document.querySelector("#");
//let prevPageBtn=document.querySelector("#");
console.log(submitBtn);
//let dateDesc=dateField.value;
//let pageNum=0;

// Determines if there was already content on this page number and 
//fills in diary by reading from database
function loadPage(){
  if(retrieveFromDatabase("content")!=""){
    diary.innerHTML=retrieveFromDatabase("content");
  }
}

//increases page num
function nextPage(){
  pageNum.innerHTML=(pageNum.value)++;
  loadPage();
}

//decreases page num
function prevPage(){
  pageNum.innerHTML=(pageNum.value)--;
  loadPage();
}

//submits content of diary to database
submitBtn.addEventListener("click", e => {
    console.log("here");
     //Send to firebase
    firebase.database().ref().push({
        content: diary.value,
        type: "diary"
    });
});
   


//retrieves data from database based on parameter (options: page, content)
function retrieveFromDatabase(value){
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
    const data = snapshot.val();
        for(const recordKey in data){
            const record = data[recordKey];
            if(value==="page"){
               return record.page; 
            }else if(value === "content"){
               return record.content; 
            }
        }
    });
}