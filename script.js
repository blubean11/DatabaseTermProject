const create = document.getElementById('createCharacter');
const classSelect = document.getElementById('classContainer');
const raceSelect = document.getElementById('raceContainer');

// Store race and class
let selectedClassId = null;
let selectedRaceId = null;
let selectedClassName = null;
let selectedRaceName = null;

create.addEventListener('click', async function() {
    if(!nameValidation()){
        alert("Please enter a valid name!");
    }
    else if(!selectedClassId){
        alert("Please select a class!");
    }
    else if(!selectedRaceId){
        alert("Please select a race!");
    }
    else{
        const name = document.getElementById('name').value.trim();
        
        try {
            const response = await fetch('http://localhost:3000/api/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    classId: selectedClassId,
                    raceId: selectedRaceId,
                    level: 1
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(`Character "${name}" created successfully!\nCharacter ID: ${result.characterId}\nClass: ${selectedClassName}\nRace: ${selectedRaceName}`);
                
                document.getElementById('name').value = '';
                resetPreview();
            } else {
                alert('Error creating character: ' + (result.error || 'Unknown error'));
            }
            
        } catch (error) {
            console.error('Error creating character:', error);
            alert('Failed to create character. Make sure the server is running.');
        }
    }
});

classSelect.addEventListener('click', async function(event) {
    if(event.target.tagName === 'BUTTON'){
        const buttonId = event.target.id;
        const className = event.target.textContent;
        
        selectedClassName = className;
        selectedClassId = getClassId(buttonId);
        
        console.log('Button clicked:', buttonId);
        console.log('Button text:', className);
        console.log('Mapped to class ID:', selectedClassId);
        
        if (!selectedClassId) {
            alert('Error: Could not map button "' + buttonId + '" to a class ID');
            return;
        }
        
        document.getElementById('classPreview').textContent = `Class: ${className}`;
        
        try {
            const url = `http://localhost:3000/api/class-info/${selectedClassId}`;
            console.log('Fetching from URL:', url);
            
            const response = await fetch(url);
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('Received class data:', data);
            
            // Update weapon
            document.getElementById('weaponPreview').textContent = 
                `Weapon: ${data.class.WeaponName} (Damage: ${data.class.WeaponDamage}, Speed: ${data.class.AttackSpeed})`;
            
            // Update armor
            document.getElementById('armorPreview').textContent = 
                `Armor: ${data.class.ArmorName} (Defense: ${data.class.Damage_Negation}, Durability: ${data.class.ArmorDurability})`;
            
            // Update stats
            updateStatsDisplay(data.stats);
            
        } catch (error) {
            console.error('Error fetching class data:', error);
            alert('Failed to load class information. Check console for details.');
        }
    }
});

raceSelect.addEventListener('click', async function(event) {
    if(event.target.tagName === 'BUTTON'){
        const buttonId = event.target.id;
        const raceName = event.target.textContent;
        
        selectedRaceName = raceName;
        selectedRaceId = getRaceId(buttonId);
        
        console.log('Race button clicked:', buttonId);
        console.log('Race button text:', raceName);
        console.log('Mapped to race ID:', selectedRaceId);
        
        if (!selectedRaceId) {
            alert('Error: Could not map button "' + buttonId + '" to a race ID');
            return;
        }
        
        document.getElementById('racePreview').textContent = `Race: ${raceName}`;
        
        try {
            const url = `http://localhost:3000/api/race-resistance/${selectedRaceId}`;
            console.log('Fetching from URL:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const resistances = await response.json();
            console.log('Received race resistances:', resistances);
            
            if (resistances.length > 0) {
                const resistanceText = resistances
                    .map(r => `${r.DamageType}: ${r.ResistancePercent}%`)
                    .join(', ');
                
                const statBlock = document.querySelector('.statBlock');
                const paragraphs = statBlock.querySelectorAll('p');
                paragraphs.forEach(p => {
                    if (p.textContent.startsWith('Race resistance:')) {
                        p.textContent = `Race resistance: ${resistanceText}`;
                    }
                });
            }
            
        } catch (error) {
            console.error('Error fetching race data:', error);
            alert('Failed to load race information. Check console for details.');
        }
    }
});

function nameValidation() {
    const inputName = document.getElementById('name');
    const name = inputName.value.trim();
    return name !== '';
}

function updateStatsDisplay(stats) {
    const statBlock = document.querySelector('.statBlock');
    const allParagraphs = statBlock.querySelectorAll('p');
    
    const statMap = {};
    stats.forEach(stat => {
        statMap[stat.Name] = true;
    });
    
    allParagraphs.forEach(p => {
        const text = p.textContent;
        
        if (text.startsWith('Strength:')) {
            p.textContent = statMap['Strength'] ? 'Strength: ✓' : 'Strength: -';
        } else if (text.startsWith('Agility:')) {
            p.textContent = statMap['Agility'] ? 'Agility: ✓' : 'Agility: -';
        } else if (text.startsWith('Intelligence:')) {
            p.textContent = statMap['Intelligence'] ? 'Intelligence: ✓' : 'Intelligence: -';
        } else if (text.startsWith('Endurance:')) {
            p.textContent = statMap['Endurance'] ? 'Endurance: ✓' : 'Endurance: -';
        } else if (text.startsWith('Arcane:')) {
            p.textContent = statMap['Arcane'] ? 'Arcane: ✓' : 'Arcane: -';
        } else if (text.startsWith('Faith:')) {
            p.textContent = statMap['Faith'] ? 'Faith: ✓' : 'Faith: -';
        } else if (text.startsWith('Level:')) {
            p.textContent = 'Level: 1';
        }
    });
}

function resetPreview() {
    selectedClassId = null;
    selectedRaceId = null;
    selectedClassName = null;
    selectedRaceName = null;
    
    document.getElementById('classPreview').textContent = 'Class: ';
    document.getElementById('racePreview').textContent = 'Race: ';
    document.getElementById('weaponPreview').textContent = 'Weapon: ';
    document.getElementById('armorPreview').textContent = 'Armor: ';
    
    const statBlock = document.querySelector('.statBlock');
    const allParagraphs = statBlock.querySelectorAll('p');
    allParagraphs.forEach(p => {
        const text = p.textContent;
        if (text.startsWith('Strength:')) p.textContent = 'Strength: ';
        else if (text.startsWith('Agility:')) p.textContent = 'Agility: ';
        else if (text.startsWith('Intelligence:')) p.textContent = 'Intelligence: ';
        else if (text.startsWith('Endurance:')) p.textContent = 'Endurance: ';
        else if (text.startsWith('Arcane:')) p.textContent = 'Arcane: ';
        else if (text.startsWith('Faith:')) p.textContent = 'Faith: ';
        else if (text.startsWith('Level:')) p.textContent = 'Level: ';
        else if (text.startsWith('Race resistance:')) p.textContent = 'Race resistance: ';
    });
}

function getClassId(buttonId) {
    const classMap = {
        'Warrior': 1,
        'Mage': 2,
        'Rogue': 3,
        'Paladin': 4
    };
    const id = classMap[buttonId];
    console.log('getClassId mapping:', buttonId, '->', id);
    return id;
}

function getRaceId(buttonId) {
    const raceMap = {
        'Human': 1,
        'Elf': 2,
        'Orc': 3,
        'Dwarf': 4
    };
    const id = raceMap[buttonId];
    console.log('getRaceId mapping:', buttonId, '->', id);
    return id;
}

async function loadInitialData() {
    try {
        const classesResponse = await fetch('http://localhost:3000/api/classes');
        const classes = await classesResponse.json();
        console.log('Server connected! Available classes:', classes);
        
        const racesResponse = await fetch('http://localhost:3000/api/races');
        const races = await racesResponse.json();
        console.log('Available races:', races);
    } catch (error) {
        console.error('Error connecting to server:', error);
        console.log('Make sure the server is running: node server.js');
    }
}

loadInitialData();