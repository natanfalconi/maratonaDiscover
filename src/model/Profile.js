// let data = {
//     name: "Natan",
//     avatar: "https://github.com/FalconiN.png",
//     "monthly-budget": 4000,
//     "days-per-week": 5,
//     "hours-per-day": 8,
//     "vacation-per-year": 4,
//     "value-hour": 75
// }
const Database = require("../db/config")


module.exports = {
    async get() {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)

        await db.close() 


        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }
    },

    async update(newData){
        const db = await Database()
        

        db.run(`UPDATE profile SET 
        name = ${newData.name},
        avatar = ${newData.avatar},
        monthly_budget = ${newData.monthly_budget},
        days_per_week = ${newData.days_per_week},
        hours_per_day = ${newData.hours_per_day},
        vacation_per_year = ${newData.vacation_per_year},
        value_hour = ${newData.value_hour}

        `)

        await db.close() 
    }
}