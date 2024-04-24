
# Infrastruktur 

Für die Betreibung des LO-Portals und anderen Applikationen der LO bezieht die LO einen VPS (Virtual Private Server) von der FSIT, einem schweizer Hosting Provider.
Dieser hat die folgende Konfiguration: `1 vCPU, 1GB RAM, 20 GB SSD`.

Der Server ist erreichbar auf der IP: `xx.xx.xx.xx`.

## Docker

Die Applikationen laufen in einem Docker Container. Aktuell sind folgende Applikationen deployed:

| Container Name | Beschreibung | Exposed Ports |
|----------------|--------------|---------------|
| lo-portal      | PocketBase, was die API, das Frontend und die Proxies hosted. | 80, 443 |
| davinci-cache  | Go-Applikation, das die Inhalte im Stundenplan vom DAVINCI cached. | - |


## Cron-Jobs

Folgende Cron-Jobs werden regelmässig durchgeführt.

| Regel | Frequenz | Command | Beschreibung |
|----------------|---------------|--------------|--------|
| 0 4 * * * | Jeden Tag um 04:00 | apt update -y && apt upgrade -y && reboot | Führt Updates durch und startet den Server neu. |
| 0 7 * * * | Jeden Tag um 07:00 | python3 /root/update-lindenhof-menu /root/lo-portal/static/menu-lindenhof.json | Parsed das Menu von der Mensa Lindenhof und speichert sie unter /menu-lindenhof.json | 

## Zugriff

Der Zugriff auf den Server kann über SSH durchgeführt werden. Es hat jede berechtigte Person einen eigenen Nutzer auf dem Server.