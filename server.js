const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Game_Information'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Classes
app.get('/api/classes', (req, res) => {
    db.query('SELECT * FROM Class', (err, results) => {
        if (err) {
            console.error('Error fetching classes:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Races
app.get('/api/races', (req, res) => {
    db.query('SELECT * FROM Character_Race', (err, results) => {
        if (err) {
            console.error('Error fetching races:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Races linked w/ info
app.get('/api/race-info/:raceId', (req, res) => {
    const raceId = req.params.raceId;
    console.log('Received request for race ID:', raceId);
    
    db.query('SELECT * FROM Character_Race WHERE ID = ?', [raceId], (err, results) => {
        if (err) {
            console.error('Error fetching race info:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Race info results:', results);
        res.json(results[0]);
    });
});

// Class linked with weapons armor and stats
app.get('/api/class-info/:classId', (req, res) => {
    const classId = req.params.classId;
    console.log('Received request for class ID:', classId);
    
    const query = `
        SELECT 
            c.ID as ClassID,
            c.Name as ClassName, 
            c.Description as ClassDescription,
            w.Name as WeaponName,
            w.Description as WeaponDescription,
            w.Damage as WeaponDamage,
            w.Attack_Speed as AttackSpeed,
            a.Name as ArmorName,
            a.Description as ArmorDescription,
            a.Damage_Negation,
            a.Durability as ArmorDurability
        FROM Class c
        LEFT JOIN Weapon w ON c.ID = w.ID
        LEFT JOIN Armor a ON c.ID = a.ID
        WHERE c.ID = ?
    `;
    
    db.query(query, [classId], (err, classResults) => {
        if (err) {
            console.error('Database error in class-info:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        console.log('Class query results:', classResults);

        const statsQuery = `
            SELECT s.Name, s.ID
            FROM Stat s
            JOIN Class_Stat cs ON s.ID = cs.Stat_ID
            WHERE cs.Class_ID = ?
        `;
        
        db.query(statsQuery, [classId], (err, statsResults) => {
            if (err) {
                console.error('Database error in stats query:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            
            console.log('Stats query results:', statsResults);
            
            res.json({
                class: classResults[0],
                stats: statsResults
            });
        });
    });
});

// Race resistances
app.get('/api/race-resistance/:raceId', (req, res) => {
    const raceId = req.params.raceId;
    console.log('Received request for race resistances for race ID:', raceId);
    
    const query = `
        SELECT 
            dt.Name as DamageType,
            rd.Percent_Value as ResistancePercent
        FROM Race_Resistance rd
        JOIN Damage_Type dt ON rd.Resist_Damage_ID = dt.ID
        WHERE rd.Character_Race_ID = ?
        ORDER BY dt.Name
    `;
    
    db.query(query, [raceId], (err, results) => {
        if (err) {
            console.error('Database error in race-resistance:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Race resistance results for race', raceId, ':', results);
        res.json(results);
    });
});

// Creates a new character and inserts into the database table Player_Character
app.post('/api/characters', (req, res) => {
    const { name, classId, raceId, level } = req.body;
    console.log('Creating character:', { name, classId, raceId, level });
    
    // link weapon and armor IDs to class ID
    const weaponId = classId;
    const armorId = classId;
    
    const query = `
        INSERT INTO Player_Character 
        (Level, Name, Weapon_Equipped_ID, Armor_Equipped_ID, Has_Stat_ID, Is_Class_ID, Is_Race_ID) 
        VALUES (?, ?, ?, ?, 1, ?, ?)
    `;
    
    db.query(query, [level || 1, name, weaponId, armorId, classId, raceId], (err, result) => {
        if (err) {
            console.error('Database error creating character:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Character created successfully with ID:', result.insertId);
        res.json({ 
            success: true, 
            characterId: result.insertId,
            message: 'Character created successfully!' 
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/classes');
    console.log('  GET  /api/races');
    console.log('  GET  /api/race-info/:raceId');
    console.log('  GET  /api/class-info/:classId');
    console.log('  GET  /api/race-resistance/:raceId');
    console.log('  POST /api/characters');
});