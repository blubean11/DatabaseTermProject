CREATE DATABASE IF NOT EXISTS Game_Information;

USE Game_Information;

--create damage type table
CREATE TABLE Damage_Type(
    ID INT NOT NULL PRIMARY KEY,
    Name VARCHAR(50)
);

--create race resistance table
CREATE TABLE Race_Resistance(
    Percent_Value FLOAT DEFAULT 0.0 NOT NULL,
    Resist_Damage_ID INT,
    Character_Race_ID INT,
    PRIMARY KEY (Resist_Damage_ID, Character_Race_ID),
    FOREIGN KEY (Resist_Damage_ID) REFERENCES Damage_Type(ID) ON DELETE CASCADE,
    FOREIGN KEY ( Character_Race_ID) REFERENCES Character_Race(ID) ON DELETE CASCADE
);

--create weapon table
CREATE TABLE Weapon(
    ID INT DEFAULT 1 NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NULL,
    Description TEXT NULL,
    Damage_Type_ID INT NOT NULL,
    Damage FLOAT DEFAULT 0.0,
    Attack_Speed FLOAT DEFAULT 1.0,
    Durability FLOAT DEFAULT 100.0,
    FOREIGN KEY (Damage_Type_ID) REFERENCES Damage_Type(ID) ON DELETE CASCADE
);

--create Player character tabe
CREATE TABLE Player_Character(
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Level INT NOT NULL DEFAULT 1,
    Name VARCHAR(50) NOT NULL,
    Weapon_Equipped_ID INT NULL,
    Armor_Equipped_ID INT NULL,
    Has_Stat_ID INT NULL,
    Is_Class_ID INT NUll,
    Is_Race_ID INT NULL,
    FOREIGN KEY (Weapon_Equipped_ID) REFERENCES Weapon(ID) ON DELETE SET NULL,
    FOREIGN KEY (Armor_Equipped_ID) REFERENCES Armor(ID) ON DELETE SET NULL,
    FOREIGN KEY (Has_Stat_ID) REFERENCES Stat(ID) ON DELETE SET NULL,
    FOREIGN KEY (Is_Class_ID) REFERENCES Class(ID) ON DELETE SET NULL,
    FOREIGN KEY (Is_Race_ID) REFERENCES Race(ID) ON DELETE SET NULL
);

--create armor table
CREATE TABLE Armor(
    ID INT NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NULL,
    Description TEXT NULL,
    Damage_Negation FLOAT DEFAULT 0.0 NOT NULL,
    Durability FLOAT DEFAULT 100.0 NOT NULL
);

-- Create class table
CREATE TABLE Class(
    ID INT DEFAULT 1 NOT NULL PRIMARY KEY,
    Description TEXT Null,
    Name VARCAHR(50) NOT NULL
);

-- create stat class
CREATE TABLE Stat(
    ID INT DEFUALT 0.0 NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

--create Class_stat table
CREATE TABLE Class_Stat(
    Class_ID INT NOT NULL,
    Stat_ID INT NOT NULL,
    PRIMARY KEY (Class_ID, Stat_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(ID) ON DELETE CASCADE,
    FOREIGN KEY (Stat_ID) REFERENCES Stat(ID) ON DELETE CASCADE
);