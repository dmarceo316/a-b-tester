// selectors
const suggestionInput = document.querySelector('.suggestion_input');
const addButton = document.querySelector('.add_button');
const suggestionList = document.querySelector(".suggestion_list");
const showButton = document.querySelector(".test_button");
const hint = document.querySelector(".hint");
const modal = document.querySelector(".modal-content");
const span = document.querySelector(".close");
const optionA = document.querySelector(".option-a");
const optionB = document.querySelector(".option-b");
const optionAnswer = document.querySelector(".option_answer");
const optionABtn = document.querySelector(".option-a_btn");
const optionBBtn = document.querySelector(".option-b_btn");
//event listners
addButton.addEventListener('click',addSuggestion);
suggestionList.addEventListener("click",deleteButton);


// functions
function addSuggestion(event){ 

    //Will prevent form from refreshing
    event.preventDefault();

    // Suggestion DIV
    const suggestionDiv = document.createElement('div');
    suggestionDiv.classList.add('suggestion');

    // Creates Li 
    const newSuggestion = document.createElement('li');
    newSuggestion.innerText = suggestionInput.value;
    newSuggestion.classList.add('suggestion-item');
    suggestionDiv.appendChild(newSuggestion);



    // Will  display test button when li is more than 2 
    const suggestion_length = suggestionList.childElementCount;
    count = 0;
   while(count < 1){
       if(suggestion_length >=1){
           showButton.style.display = "flex";
           hint.style.display = "none";

       }else if (suggestion_length == ""){
           showButton.style.display = "none";
           hint.style.display = "block";
       }
       count++; 
   }

    // Delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '-';
    deleteButton.classList.add('deleteButton');
    suggestionDiv.appendChild(deleteButton);


    //will lock add button if nothing entered

    suggestionInput.addEventListener("change", stateHandler);
    
   addButton.disabled = true;

    function stateHandler(){
    if(suggestionInput.value === ""){
      addButton.disabled = true;
    }
    else
    {
      addButton.disabled = false;
    };
  };

    //Append to list
        suggestionList.appendChild(suggestionDiv); 
    
    //clear suggestion input value
    suggestionInput.value = "";   
};
 


function deleteButton(e){
    const suggestion_length = suggestionList.childElementCount;
    count = 0;
    const item = e.target;
    // delete suggestion
    if(item.classList[0] === "deleteButton"){
        const suggestion = item.parentElement;
        // Sliding animation
        suggestion.classList.add("moveB");
        suggestion.addEventListener('transitionend', function(){
            suggestion.remove();
        // Will display hint if less than 2 suggestions. Will display test button if more than 2 suggestions
          if(suggestion_length <= 2){
              hint.style.display = "block";
              showButton.style.display = "none";
          }
        }); 
    }
}


// open the modal
showButton.onclick = function() {
    modal.style.display = "block";
    for (var i = suggestionList.children.length; i >= 0; i--){
      suggestionList.appendChild(suggestionList.children[Math.random() * 1 | 0 ]);
    };
    
    optionA.innerText = document.querySelectorAll(".suggestion-item")[0].firstChild.nodeValue;
    optionB.innerText = document.querySelectorAll(".suggestion-item")[1].firstChild.nodeValue;
  }
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// while modal is open 
optionABtn.onclick = function(e){
e.preventDefault;
const item = e.target
const suggestion_length = suggestionList.childElementCount
if(item.classList[0] === "option-a_btn")
    if(suggestion_length >1){
     optionB.classList.add("moveB")
     suggestionList.removeChild(suggestionList.childNodes[0])
     optionB.addEventListener('transitionend', function(){
        optionB.innerText = suggestionList.querySelectorAll(".suggestion-item")[1].firstChild.nodeValue;
        optionB.classList.add("movebackB")
        setTimeout(() => {
          optionB.classList.remove("moveB");
          optionB.classList.remove("movebackB");
        }, 1000);
    })
    if(suggestion_length == 2 ){
        document.querySelector(".modal-body").style.display = "none";
        document.querySelector(".modal-header").style.display = "none";
        document.querySelector(".modal-body-done").style.display = "block";
        optionAnswer.innerText = optionA.innerText;
    }
  }
}

optionBBtn.onclick = function(e){
  e.preventDefault;
  const item = e.target;
  const suggestion_length = suggestionList.childElementCount;
  if(item.classList[0] === "option-b_btn")
      if(suggestion_length >1){
       optionA.classList.add("moveA");
       suggestionList.removeChild(suggestionList.childNodes[1]);
       optionA.addEventListener('transitionend', function(){
          optionA.innerText = suggestionList.querySelectorAll(".suggestion-item")[1].firstChild.nodeValue;
          optionA.classList.add("movebackA")
          setTimeout(() => {
            optionA.classList.remove("moveA");
            optionA.classList.remove("movebackA");
          }, 1000);
      })
      if(suggestion_length == 2 ){
          document.querySelector(".modal-body").style.display = "none";
          document.querySelector(".modal-header").style.display = "none";
          document.querySelector(".modal-body-done").style.display = "block";
          optionAnswer.innerText = optionB.innerText;
      }
    }
  }