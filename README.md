# PAS for OpenEdge 12.2 example setup

pasman create -p 3110 -P 3111 -s 3112 -j 3113 -v -m bfv:bfv -Z dev -N as-test01 ./as > as-test01.create.log

cd as 

```
bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\manager.war
bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\oemanager.war
bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\oehealth.war
```

copied bfvlib.pl to ${CATALINA_BASE}/openedge
see: https://github.com/bfv/bfvlib
at this point I ran a `git init`


