@ECHO OFF
cls && cd /d "%~dp0"

start git-bash.exe -c "./.bash run"

REM start cmd /c mintty.exe -s maxwidth -s 0x15 -p top -e /bin/bash -l -i ./.bash show_versions
REM start cmd /c mintty.exe -s maxwidth -s 0x15 -p bottom -e /bin/bash -l -i ./.bash devMode run
