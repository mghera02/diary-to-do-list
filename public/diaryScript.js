let diary=document.querySelector("#diaryInfo");
let submitBtn=document.querySelector("#submit");
let pageNum=document.querySelector("#pageNum");
let nextPageBtn=document.querySelector("#nextButton");
let prevPageBtn=document.querySelector("#previousButton");

console.log(parseInt(pageNum.innerHTML.trim()));

// Determines if there was already content on this page number and 
//fills in diary by reading from database
function loadPage(){
  if(retrieveFromDatabase(parseInt(pageNum.innerHTML.trim()))!=""){
    diary.innerHTML=retrieveFromDatabase(parseInt(pageNum.innerHTML.trim()));
  }
}

//increases page num
function nextPage(){
  pageNum.innerHTML=(parseInt(pageNum.innerHTML.trim()))++;
  loadPage();
}

//decreases page num
function prevPage(){
  pageNum.innerHTML=(parseInt(pageNum.innerHTML.trim()))--;
  loadPage();
}

//submits content of diary to database
submitBtn.addEventListener("click", e => {
    console.log(pageNum.innerHTML);
     //Send to firebase
    firebase.database().ref().push({
        content: diary.value,
        page: pageNum.innerHTML.trim(),
        type: "diary"
    });
});
   


//retrieves data from database based on parameter (options: page, content)
function retrieveFromDatabase(){
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
    const data = snapshot.val();
        for(const recordKey in data){
            const record = data[recordKey];
            if(pageNum.value==record.page){
              return record.content; 
            }
        }
    });
}