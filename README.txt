 Database Project Setup

This guide details how to setup the database, the connection and how to get the webpages running.

1. Prerequisites and Installation

Before starting, install the following :

MySQL Server
- Download: https://dev.mysql.com/downloads/installer/
- Installation Config: During setup, make sure the Config Type is set to Development.

DBeaver
- Download: https://dbeaver.io/download/
- Used to run the SQL scripts and visualize the data.

Node.js 
- Download: https://nodejs.org/
- Required to run server.js.

2. Establish Database Connection

	1. Open DBeaver.
	2. Click the New Database Connection icon (plug icon) in the top-left corner of the toolbar.
	3. Select MySQL from the list of database types.
	4. Enter Credentials:
    	- Host: localhost
   	 - Port: 3306
  	  - User: root
   	 - Password: (password chosen at installation)
	5. Driver Properties:
  	  - Click the Driver Properties tab.
  	  - Find the property allowPublicKeyRetrieval.
   	 - Change the value to true.
	6. Click Test Connection. If successful, click Finish.

3. Initialize Database and Data
	Run two scripts to set up the tables and data.

	Step A: In DBeaver, right-click your connection, select SQL Editor, then New SQL Script.

	Step B: Create Schema
		Copy the create.sql code into the editor. Highlight the CREATE DATABASE and USE lines first 		and run them to make sure the database exists. Then run the CREATE TABLE statements in 			order (block by block) to avoid dependency errors.

	Step C: Load Data 
		Copy the load.sql content into the editor and run the blocks to populate the database.

INSERT INTO Damage_Type (ID, Name) VALUES (1, 'Fire'), (2, 'Ice'), (3, 'Poison'), (4, 'Lightning'), (5, 'Physical');

INSERT INTO Class (ID, Description, Name) VALUES (1, 'Strong melee combatant', 'Warrior'), (2, 'Master of elemental spells', 'Mage'), (3, 'Silent killer', 'Rogue'), (4, 'Protector of allies', 'Paladin');

INSERT INTO Character_Race (ID, Negation, Durability, Name, Description) VALUES (1, 5.0, 100.0, 'Human', 'Versatile and adaptable'), (2, 10.0, 120.0, 'Elf', 'Agile forest dwellers'), (3, 15.0, 150.0, 'Orc', 'Strong and resilient'), (4, 8.0, 110.0, 'Dwarf', 'Hardy miners');

4. Node.js Server Setup

	Step A: Configure server.js Open server.js in a code editor and find the connection block. Update 	the password to match your MySQL setup.

	Step B: Install Dependencies
		Open your Command Prompt or Terminal.
		Navigate to the project folder: cd path/to/your/project
		Initialize the project and install required libraries: npm init -y npm install express mysql2 cors

	Step C: Run the Server Start the API server by running: node server.js
		You should see: Server running at http://localhost:3000 Connected to MySQL database

5. Usage

	Do not close the terminal window where the server is running. You can now access your API 	endpoints via your browser:
	
	http://localhost:3000/api/classes
	http://localhost:3000/api/races
	http://localhost:3000/api/race-info/1
