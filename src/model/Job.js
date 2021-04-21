// let data = [
//     {
//         id: 1,
//         name: "Pizzaria Guloso",
//         "daily-hours": 3,
//         "total-hours": 2,
//         created_at: Date.now()
//     },
//     {
//         id: 2,
//         name: "Pizzaria Guloso teste 2",
//         "daily-hours": 3,
//         "total-hours": 15,
//         created_at: Date.now(),
//     },   
// ]

const Database = require("../db/config")


module.exports = {
    
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        
        await db.close()

        // console.log(jobs)

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }))

    },
    
    update(newJob) {
        data = newJob
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    },

    create(newJob){
        data.push(newJob)
    }
}
