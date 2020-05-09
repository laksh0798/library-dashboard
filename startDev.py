import os
os.system('cd frontend')
os.system('npm install') # Installs and Audits dependencies
os.system('npm run build --prefix ./frontend') # Builds production optimized version
os.system("start cmd /k") # Opens a new cmd prompt, enter 'python manage.py runserver' in the new shell; to start backend api server
os.system('npm start --prefix ./frontend') # runs local server for react

