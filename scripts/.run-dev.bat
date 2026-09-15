@ECHO OFF
cls && cd /d "%~dp0"

REM start git-bash.exe -c "./.bash transpileAndWatch"
REM start git-bash.exe -c "./.bash run"

start cmd /c mintty.exe -s maxwidth -s 0x15 -p top -e /bin/bash -l -i ./.bash transpileAndWatch
start cmd /c mintty.exe -s maxwidth -s 0x15 -p bottom -e /bin/bash -l -i ./.bash devMode run
