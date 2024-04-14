echo off
title enviornment setup

mkdir TWSE
cd ./TWSE
echo %cd%

@REM git installation
call ./git_Install.bat

@REM python installation
call ./py_Install.bat



pause