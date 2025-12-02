import pyodbc
import os

# Database connection
conn_str = (
    'DRIVER={ODBC Driver 18 for SQL Server};'
    'SERVER=localhost,1433;'
    'DATABASE=Game_Information;'
    'UID=SA;'
    'PWD=CodeWithArjun123;'
    'TrustServerCertificate=yes;'
)

def load_dat_file(cursor, filename, table_name, skip_header=True):
    """Load a .dat file into a SQL Server table"""
    print(f"Loading {filename} into {table_name}...")
    
    if not os.path.exists(filename):
        print(f"  ❌ File not found: {filename}")
        return
    
    with open(filename, 'r') as file:
        lines = file.readlines()
        
        # Skip header/comment lines if needed
        data_lines = [line.strip() for line in lines if line.strip() and not line.strip().startswith('--')]
        
        for line in data_lines:
            values = line.split(',')
            
            # Create placeholders for SQL query
            placeholders = ','.join(['?' for _ in values])
            query = f"INSERT INTO {table_name} VALUES ({placeholders})"
            
            try:
                cursor.execute(query, values)
            except Exception as e:
                print(f"  ⚠️  Error inserting line: {line}")
                print(f"     {str(e)}")
    
    print(f"  ✅ {table_name} loaded successfully!")

def main():
    print("=" * 60)
    print("Loading .DAT files into SQL Server")
    print("=" * 60)
    
    try:
        # Connect to database
        print("\n📡 Connecting to database...")
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        print("✅ Connected!\n")
        
        # Load files in order (respecting foreign key constraints)
        load_dat_file(cursor, 'DAMAGE_TYPE.DAT', 'Damage_Type')
        conn.commit()
        
        load_dat_file(cursor, 'CHARACTER_RACE.DAT', 'Character_Race')
        conn.commit()
        
        load_dat_file(cursor, 'RACE_RESISTANCE.DAT', 'Race_Resistance')
        conn.commit()
        
        load_dat_file(cursor, 'WEAPON.DAT', 'Weapon')
        conn.commit()
        
        load_dat_file(cursor, 'ARMOR.DAT', 'Armor')
        conn.commit()
        
        load_dat_file(cursor, 'CLASS.DAT', 'Class')
        conn.commit()
        
        load_dat_file(cursor, 'STAT.DAT', 'Stat')
        conn.commit()
        
        load_dat_file(cursor, 'HAS_STAT.DAT', 'Class_Stat')
        conn.commit()
        
        # For Player_Character, we need to enable identity insert
        print("Loading PLAYER_CHARACTER.DAT into Player_Character...")
        cursor.execute("SET IDENTITY_INSERT Player_Character ON")
        load_dat_file(cursor, 'PLAYER_CHARACTER.DAT', 'Player_Character')
        cursor.execute("SET IDENTITY_INSERT Player_Character OFF")
        conn.commit()
        
        print("\n" + "=" * 60)
        print("✅ All data loaded successfully!")
        print("=" * 60)
        
        # Close connection
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("\nMake sure:")
        print("  1. SQL Server is running (docker ps)")
        print("  2. Database 'Game_Information' exists")
        print("  3. All .DAT files are in the same directory as this script")

if __name__ == '__main__':
    main()