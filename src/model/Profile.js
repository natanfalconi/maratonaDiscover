let data = {
    name: "Natan",
    avatar: "https://github.com/FalconiN.png",
    "monthly-budget": 4,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 75
}

module.exports = {
    get() {
        return data
    },

    update(newData){
        data = newData
    }
}