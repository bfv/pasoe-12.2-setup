# PAS for OpenEdge 12.2 example setup

```
pasman create -p 3110 -P 3111 -s 3112 -j 3113 -v -m bfv:bfv -Z dev -N as-test01 ./as > as-test01.create.log

cd as 

bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\manager.war
bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\oemanager.war
bin\tcman.bat deploy -u bfv:bfv -v c:\dlc\122\servers\pasoe\extras\oehealth.war
```

copied `bfvlib.pl` to `${CATALINA_BASE}/openedge`
see: https://github.com/bfv/bfvlib
at this point I ran a `git init`

## turn off unnecessary protocols
```
bin\oeprop.bat as-test01.ROOT.REST.adapterEnabled=0
bin\oeprop.bat as-test01.ROOT.SOAP.adapterEnabled=0
bin\oeprop.bat as-test01.ROOT.APSV.adapterEnabled=0
```

## HealthCheck
execute:
```
tcman.bat feature HealthCheck=on 
tcman config psc.as.health.enabled=true psc.as.health.enabled

tcman.bat pasoestart -restart

// check  the environment
tcman.bat env
```

As a consequence `conf/appserver.properties` and `conf/server.xml` are altered by the tools.

```
http://localhost:8899/health (returns HTTP status code)
http://localhost:8899/health?view=summary (returns JSON)
http://localhost:8899/health?view=details (returns JSON)

http://localhost:8899/health?view=config (returns JSON)
```

