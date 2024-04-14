echo off

:: Check for Python Installation
python --version 2>NUL
if errorlevel 1 goto errorNoPython

:: Reaching here means Python is installed.
:: Execute stuff...

:: Once done, exit the batch file -- skips executing the errorNoPython section
goto:eof

:errorNoPython
echo.
echo Error^: Python not installed


@REM step1 python installation
python-3.12.0-amd64.exe /passive InstallAllUsers=0 Include_launcher=0 Include_test=0 SimpleInstall=1 SimpleInstallDescription="Just for me, no test suite."
@REM /quiet or /passive
@REM To completely hide the installer UI and install Python silently, pass the /quiet option. To skip past the user interaction but still display progress and errors, pass the /passive option. The /uninstall option may be passed to immediately begin removing Python - no prompt will be displayed.


@REM step2 through internet 
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

@REM step3 through python
python get-pip.py

@REM check result
pip --version


pip install fastapi
pip install uvicorn
pip install pymysql
pip install sqlalchemy

pip install twstock
pip install flit
pip install lxml