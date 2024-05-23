var nameInput = document.getElementById('webName');
var urlInput = document.getElementById('webUrl');
var innerInput = document.getElementById('inner');
var searchInput = document.getElementById('search');

var addButton = document.getElementById('add');
var updateButton = document.getElementById('update');

var validForm =  document.getElementById('vali');



var itemIndex ;


 var inputList ;

 if (localStorage.getItem('inputList')) {

    inputList = JSON.parse(localStorage.getItem('inputList'));
    displayProducts(inputList);
} else {
    inputList = [];
}

function addUrl() {
    if (nameInput.value != '' && urlInput.value != '') {

        var input = {
            name : nameInput.value,
            url : urlInput.value,
        };

        if (nameInput.classList.contains('is-valid') && urlInput.classList.contains('is-valid')) {
            

        inputList.push(input);
    
     

        
        localStorage.setItem('inputList' , JSON.stringify(inputList));
        displayProducts(inputList) ;
        clear();

    } else {
        validForm.classList.remove('d-none');

    }

    }else {

        validForm.classList.remove('d-none');
        
    }

}

function displayProducts(list) {
    var container = ``;

    for (var i = 0; i < list.length; i++) {
        container += `
        <tr class="bg-light">
            <td class="text-center">${i+1}</td>
            
            <td class="text-center">${list[i].name.toUpperCase()}</td>
            <td class="text-center p-1">
            
            <button class="btn btn-primary" onclick="window.open('${list[i].url}', '_blank');">
            <i class="fa-solid fa-eye px-1"></i> Visit
        </button>
        
                <button class="btn btn-danger" onclick="delate(${i})" ><i class="fa-solid fa-trash px-1"></i>Delete</button>
                <button class="btn btn-warning" onclick="updateForm(${i})"><i class="fa-solid fa-pen-to-square px-1"></i>Update</button>
            </td>
        </tr>`};
    innerInput.innerHTML = container;
}

function clear() {
    nameInput.value = '';
    urlInput.value = '';
}

function delate(index) {
    inputList.splice(index ,1);

    localStorage.setItem('inputList', JSON.stringify(inputList));
    displayProducts(inputList);
}

function search() {

    var searchResult = [];

    for (var i = 0; i < inputList.length; i++) {

        if (inputList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
           
            searchResult.push(inputList[i]);
        }

    }
   
displayProducts(searchResult)

};


function updateForm(updateIndex) {

    itemIndex = updateIndex;
    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');

    nameInput.value = inputList[updateIndex].name;
    urlInput.value = inputList[updateIndex].url;;
    
};

function update() {
    
if (nameInput.value != '') {
    var updateInput = {
        name : nameInput.value,
        url : urlInput.value,
    };
    inputList.splice(itemIndex,1,updateInput);
    displayProducts(inputList);
    localStorage.setItem('inputList' , JSON.stringify(inputList));
    clear();
}else {

    alert("Empty Input")
    
};

}

function validateName(element){
    
    var regex = {

        webName : /^[a-zA-Z]\w{1,10}\s?/,
        webUrl : /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gm,
              
    };

    if (regex[element.id].test(element.value)) {
        
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');


        if (nameInput != "") {

            validForm.classList.add('d-none');
        }
        
    }else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');

    };


}