const milestoneData = JSON.parse(data).data;

function milestoneDataLoad(){
  const milestonContainer = document.querySelector(".milestones");
  milestonContainer.innerHTML = `${milestoneData.map(function(index){
    return `<div class="milestone border-b" id="${index._id}">
      <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick="doneItem(this)"/></div>
        <div onclick="expandMilestone(this, ${index._id})">
          <p>
            ${index.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
      ${index.modules.map(function(module){
        return `<div class="module border-b">
        <p>${module.name}</p>
      </div>`
      }).join('')}
      </div>
    </div>`
  }).join('')}`
}

function expandMilestone(element, id){
  const parentElement = element.parentNode.nextElementSibling;
  const expanded = document.querySelector(".show");
  
  if(!parentElement.classList.contains("show") && expanded){
    expanded.classList.remove("show");
  }
  parentElement.classList.toggle("show");

  

  const image = document.querySelector(".milestoneImage");
  image.style.opacity = "0.01";
  image.src = milestoneData[id].image;
  document.querySelector(".title").innerHTML = milestoneData[id].name;
  document.querySelector(".details").innerHTML = milestoneData[id].description;

  image.onload = function(){
    this.style.opacity = "1";
  }
}

function doneItem(checkbox){
  const milestonContainer = document.querySelector(".milestones");
  const doneItemContainer = document.querySelector(".doneList");
  const checkedParent = checkbox.parentElement.parentElement.parentElement;
  const afterElement = document.getElementById(`${parseInt(checkedParent.id)+1}`);

  if(checkbox.checked){
    milestonContainer.removeChild(checkedParent);
    doneItemContainer.appendChild(checkedParent);

    // if((doneItemContainer.hasChildNodes())){
    //   doneItemContainer.insertBefore(checkedParent,afterElement);
    // }else{
    //   doneItemContainer.appendChild(checkedParent);
    // }

  }else{
    doneItemContainer.removeChild(checkedParent);
    milestonContainer.insertBefore(checkedParent,afterElement);
  }
console.log(doneItemContainer.hasChildNodes());
}

milestoneDataLoad();

