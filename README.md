# Big-Data-Stream-Processing
Realtime Monitoring von Produktionsprozessen

![Architektur](Bilder/Meine%20Architektur.png)

## 📌 Beschreibung :

- Simulation von MQTT-Messages mit Maschinendaten
- Transfer von MQTT nach Apache Kafka als Consumer
- Transfer von Apache Kafka nach Telegraf als Producer
- Stream Processing mit Ksql integriert in Confluence
- Persistente Speicherung mit InfluxDB
- Visualisierung der Daten mit Grafana

## 📌 Infrastruktur :

- Alle Anwendungen isoliert in Docker-Containern
- ⚠️️**ACHTUNG**⚠️ Es sind mindestens 16 GB Arbeitsspeicher auf dem Zielsystem erforderlich!

## 📌 Installation :

- Github-Repository klonen
- Terminal-Session starten (Lokal oder Remote)
- Befehl "docker-compose up -d" ausführen
- Buildprozess startet....
- ⚠️️**ACHTUNG**⚠️ Dauert je nach System etliche Minuten...
- Sollten nicht alle Container starten, dann folgende Vorgehensweise:
1. EMXQ Enterprise starten --> ```Docker start EMQX-Enterprise```
2. MQTTX Cli starten --> ```Docker start MQTTX-Cli```
3. MQTTX Simulator starten --> ```Docker start MQTTX-Simulator```
4. Kafka-Broker starten --> ```Docker start Kafka-Broker```
5. Schema-Registry starten --> ```Docker start schema-registry```
6. Kafka-Connect starten --> ```Docker start connect```
7. Ksql-Server starten --> ```Docker start ksqldb-server```
8. Ksql-CLI starten --> ```Docker start KSQL-CLI```
9. Ksql-Datagen starten --> ```Docker start ksql-datagen```
10. REST-Proxy starten --> ```Docker start rest-proxy```
11. Confluent Control-Center starten --> ``Docker start Kafka-Control-Center``
12. InfluxDB starten --> ``Docker start Influxdb``
13. Telegraf starten --> ``Docker start Telegraf``
14. Grafana starten --> ``Docker start Grafana``

## 📌 Nice2Know :

- Nachdem alle Container laufen, muss im Control-Center das Kafka-Topic **RotorWind-Facilities** angelegt werden, siehe Bilder
- Normalerweise müsste dann die gesamte Pipeline funktionieren

## ⚠️ Login für EMQX Enterprise:
- ```[YourHost]:18083```
- ```User: admin```
- ``Password: public``

## ⚠️ Login für Confluent Control-Center:
- ```[YourHost]:9021```

## ⚠️ Login für InfluxDB:
- ```[YourHost]:8086```
- ```User: admin```
- ``Password: rotorwind``

## ⚠️ Login für Grafana:
- ```[YourHost]:3000```
- ```User: admin```
- ``Password: rotorwind``