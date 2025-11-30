const create = document.getElementById('createCharacter');
const classSelect = document.getElementById('classContainer');
const raceSelect = document.getElementById('raceContainer');

create.addEventListener('click', function() {
    if(!nameValidation()){
        alert("Please enter a valid name!");
    }
    else{
        
    }
});

classSelect.addEventListener('click', function(event) {
    if(event.target.tagName === 'BUTTON'){
        document.getElementById('classPreview').textContent = `Class: ${event.target.textContent}`
    }
});

raceSelect.addEventListener('click', function(event) {
    if(event.target.tagName === 'BUTTON'){
        document.getElementById('racePreview').textContent = `Race: ${event.target.textContent}`
    }
});

function nameValidation() {
    const inputName = document.getElementById('name');
    const name = inputName.value.trim();

    if(name === ''){
        return false;
    }
    else{
        return true;
    }
}
