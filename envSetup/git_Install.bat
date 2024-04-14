@echo off
@REM check git
if not exist "%ProgramFiles%\GIT" (
    if not exist "%ProgramFiles(x86)%\GIT" (
        @REM @REM install through windows get
        echo git install start...
        winget install --id Git.Git -e --source winget
    )
)
git -v
echo git install finish
@REM start cloning
echo start cloning
git clone https://github.com/weilunlee/tstk
echo finished cloning

@REM check cloning status
cd ./tstk
if not exist ./tstk (
    if not exist ./tstk_server
    echo git clone failed    
) ^ 
else (
    echo git clone finished
)