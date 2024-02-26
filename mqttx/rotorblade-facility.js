
// Formatiere Fließkommazahlen auf 2 Nachkommastellen
const transformToFloat = (val) => {
    if (typeof val !== 'number') {
        val = Number(val)
    }
    const _val = val.toFixed(2)
    if (_val.endsWith('.00')) {
        return parseFloat(_val) + 0.01
    }
    return parseFloat(_val)
}

// Simuliere Leistungsaufnahme
const getConsumption = (timestamp) => {

    const hour = new Date(timestamp).getHours();

    let ConsumePower = 0;
    let initialPercentage = 0;

    // 60 kW entspricht 100%
    //  0 kW entspricht   0%
    if (hour >= 8 && hour < 18) {
        ConsumePower = Math.random() * 60;
        initialPercentage = (ConsumePower / 60) * 100;
    }

    if (hour >= 18 && hour < 23) {
        ConsumePower = Math.random() * 60;
        initialPercentage = (ConsumePower / 60) * 100;
    }

    if (hour >= 23 || hour < 8) {
        ConsumePower = Math.random() * 2;
        initialPercentage = (ConsumePower / 2) * 100;
    }
    return {ConsumePower, initialPercentage};
}

// Gibt einen Temperaturwert zurück, zwischen 20 und 80
const getRandomTemperature = () => {
    return (Math.random() * (100 - 20) + 20).toFixed(2);
}

// Gibt eine Spannung zurück, zwischen 380 und 400
const getVoltage = () => {
    return (Math.random() * (410 - 380) + 380).toFixed(2);
}

const dataCache = {}
let factoryList = []

// Generiere Simulation
const generator  = (faker, options) => {
    const { clientId, count } = options

    const getRandom = (c = 10) => {
        return faker.datatype.float({min: 0, max: c});
    }

    if (!factoryList.length) {
        factoryList = Array.from({ length: count }, (v, i) => {
            return {
                id: `${i+1}`.padStart(count.toString().length, '0'),
                name: 'Werk'
            }
        })
    }

    if (!dataCache[clientId]) {
        const factory = faker.helpers.arrayElement(factoryList)
        dataCache[clientId] = {
            Standort: factory.name + "_" + factory.id
        }
    }

    let timestamp = Date.now();
    const ConPower = getConsumption(timestamp)
    
    const data = {
        ...dataCache[clientId],

        Zeitstempel: timestamp,
        Maschine: [
            {
                Id: 'BAZ_001',
                Name: 'Bearbeitungszentrum 1',
                Typ: 'Hermle C32',
                Spannung: getVoltage(),
                Leistungsaufnahme: ConPower.ConsumePower,
                Temperatur: getRandomTemperature(),
                Auslastung: ConPower.initialPercentage
            },
            {
                Id: 'BAZ_002',
                Name: 'Bearbeitungszentrum 2',
                Typ: 'Hermle C20',
                Spannung: getVoltage(),
                Leistungsaufnahme: ConPower.ConsumePower + getRandom(),
                Temperatur: getRandomTemperature(),
                Auslastung: ConPower.initialPercentage + getRandom(),
            },
            {
                Id: 'BAZ_003',
                Name: 'Bearbeitungszentrum 3',
                Typ: 'Chiron DX15',
                Spannung: getVoltage(),
                Leistungsaufnahme: ConPower.ConsumePower + getRandom(),
                Temperatur: getRandomTemperature(),
                Auslastung: ConPower.initialPercentage + getRandom(),
            },
        ]
    }
    return {
        message: JSON.stringify(data),
    }
}

const name = 'RotorWind-Plant'
const author = 'Marco Staab'
const dataFormat = 'JSON'
const version = '0.0.1'
const description = `Simulation einer Fertigungslinie zur Rotorblattfertigung`

module.exports = {
    generator,
    name,
    author,
    dataFormat,
    version,
    description,
}
