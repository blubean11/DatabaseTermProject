USE Game_Information;

-- LOAD damage_type
INSERT INTO Damage_Type (ID, Name) VALUES
(1, 'Fire'),
(2, 'Ice'),
(3, 'Poison'),
(4, 'Lightning'),
(5, 'Physical');

-- LOAD character_race
INSERT INTO Character_Race (ID, Negation, Durability, Name, Description) VALUES
(1, 5.0, 100.0, 'Human', 'Versatile and adaptable'),
(2, 10.0, 120.0, 'Elf', 'Agile forest dwellers'),
(3, 15.0, 150.0, 'Orc', 'Strong and resilient'),
(4, 8.0, 110.0, 'Dwarf', 'Hardy miners');

-- LOAD Race_Resistance
INSERT INTO Race_Resistance (Resist_Damage_ID, Character_Race_ID, Percent_Value) VALUES
(1, 1, 10.0),
(2, 1, 5.0),
(3, 1, 0.0),
(1, 2, 20.0),
(5, 2, 15.0),
(4, 3, 25.0),
(3, 3, 5.0);

-- LOAD Weapon
INSERT INTO Weapon (ID, Name, Description, Damage_Type_ID, Damage, Attack_Speed, Durability) VALUES
(1, 'Iron Sword', 'Basic steel sword', 5, 15.0, 1.2, 100),
(2, 'Fire Wand', 'Magical staff of flames', 1, 25.0, 0.9, 80),
(3, 'Shadow Dagger', 'Small dagger of poison', 3, 18.0, 1.6, 60),
(4, 'Thunder Hammer', 'Hammer of lightning', 4, 40.0, 0.7, 150);

-- LOAD Armor
INSERT INTO Armor (ID, Name, Description, Damage_Negation, Durability) VALUES
(1, 'Leather Armor', 'Light protective armor', 5.0, 60),
(2, 'Chainmail', 'Linked metal armor', 12.0, 100),
(3, 'Plate Armor', 'Heavy iron armor', 20.0, 150),
(4, 'Cloak', 'Soft cloth cloak', 2.0, 40);

-- LOAD class
INSERT INTO Class (ID, Description, Name) VALUES
(1, 'Strong melee combatant', 'Warrior'),
(2, 'Master of elemental spells', 'Mage'),
(3, 'Silent killer', 'Rogue'),
(4, 'Protector of allies', 'Paladin');

-- LOAD Stat
INSERT INTO Stat (ID, Name) VALUES
(1, 'Strength'),
(2, 'Agility'),
(3, 'Intelligence'),
(4, 'Endurance'),
(5, 'Arcane'),
(6, 'Faith');

-- LOAD
INSERT INTO Class_Stat (Class_ID, Stat_ID) VALUES
(1, 1),
(1, 4),
(2, 3),
(2, 5),
(3, 2),
(4, 1),
(4, 4);

-- LOAD Player Character
INSERT INTO Player_Character (ID, Level, Name, Weapon_Equipped_ID, Armor_Equipped_ID, Has_Stat_ID, Is_Class_ID, Is_Race_ID) VALUES
(1, 5, 'Aerin', 1, 1, 1, 1, 1),
(2, 12, 'Korrin', 3, 3, 2, 2, 2),
(3, 20, 'Lyra', 4, 2, 3, 3, 3),
(4, 3, 'Thorn', 2, 4, 1, 1, 2);





