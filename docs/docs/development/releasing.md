# Release Guide

Wenn die Contributor-Rechte auf das [Repository](https://github.com/lo-bzwu/platform) bestehen, kann direkt auf den `main` - Branch released werden.

## Release als Contributor (für Verantwortliche)

Neue Commits auf dem `production`-Branch werden automatisch innerhalb von 10 Minuten auf die Produktionsinstanz übertragen. Dies funktioniert folgendermassen:
1. Bei einem Push auf den `production`-Branch wird eine GitHub Action ausgeführt. Diese Action buildet ein Docker Image vom Dockerfile, und pusht dieses zum `lo-bzwu/portal` Image auf Docker Hub
2. Auf dem Server überwacht [Watchtower](https://containrrr.dev/watchtower/) jeweils zur vollen Stunde die laufenden Container und aktualisiert den Container auf die neue Version von Docker Hub. Hierbei kann es eine kurze Downtime von maximal einer Minute geben.

## Beiträge als Drittperson

Beiträge von anderen Lernenden können über Forks eingeführt werden. Ein solcher kann [hier](https://github.com/lo-bzwu/platform/fork) erstellt werden. Die verantwortliche Person muss die Beiträge von Drittpersonen zwingend für Sicherheitsschwachstellen und Code-Qualitäts-Probleme überprüfen.


