var SiteNameInput=document.getElementById("SiteName")
var SiteURLInput=document.getElementById("SiteURL")

var tableRow = document.getElementById('tableRow')
var btn=document.getElementById("btn")
var Arritem=[];
if(localStorage.getItem('item')){
  Arritem=JSON.parse(localStorage.getItem('item'));
  
}
display(Arritem)
btn.onclick=function(){
  if (validateInput()) {
    Additem();
    clear();
  }
 
}
function validateInput() {
  var siteName = SiteNameInput.value;
  var siteURL = SiteURLInput.value;

  if (siteName.length < 3) {
    displayValidationMessage("Site Name or Url is not valid, Please follow the rules below :\nSite name must contain at least 3 characters\nSite URL must be a valid one");
    return false;
  }


  var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!urlPattern.test(siteURL)) {
    displayValidationMessage("Site Name or Url is not valid, Please follow the rules below :\nSite name must contain at least 3 characters\nSite URL must be a valid one");
    return false;
  }

  return true;
}
function displayValidationMessage(message) {
  var validationMessageElement = document.getElementById("validationMessage");

  
  var lines = message.split('\n');

 
  var linesWithIcons = lines.map(line => {
    var words = line.split(' ');

    var wordsWithIcons = words.map(word => {
      if (word.toLowerCase() === 'site') {
        return `<i class="fa-solid fa-circle-arrow-right"></i> ${word}`;
      }
      return word;
    });

    return wordsWithIcons.join(' ');
  });


  var messageWithIcons = linesWithIcons.join('<br>');

 
  validationMessageElement.innerHTML = messageWithIcons;

  var validationModal = new bootstrap.Modal(document.getElementById('validationModal'));
  validationModal.show();
}



function Additem(){
  var item={
    SiteName:SiteNameInput.value,
    SiteURL:SiteURLInput.value,
   
  }
  Arritem.push(item)
  localStorage.setItem('item',JSON.stringify(Arritem))
  display(Arritem)
}
function clear(){
  SiteNameInput.value='',
  SiteURLInput.value=''
 
}

function display(list){
var box='';
for(var i=0;i<list.length;i++){
    box+= `<tr>
    <td>${i + 1}</td>
    <td>${list[i].SiteName}</td>
    
    <td><button class="btn px-3 custom-bg-color no-hover" onclick="VisitItem(${i})">
    <i class="fa-solid fa-eye"></i> Visit
  </button></td>
    <td><button class="btn btn-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>

 </tr>`
}
tableRow.innerHTML=box;

}
function deleteItem(index){
   Arritem.splice(index,1);
   localStorage.setItem('item',JSON.stringify(Arritem))

   display(Arritem)
}

function VisitItem(index) {
 
  if (index >= 0 && index < Arritem.length) {
    var url = Arritem[index].SiteURL;
   
    window.open(url, '_blank');
  }
}
