import os
from urllib.parse import quote_plus
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


DB_USER = "root"

DB_PASSWORD = "Ruthr@2211"
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "smp"


encoded_password = quote_plus(DB_PASSWORD)

BASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}"
DATABASE_URL = f"{BASE_URL}/{DB_NAME}"
