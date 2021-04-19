let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 3,
        "total-hours": 2,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "Pizzaria Guloso teste 2",
        "daily-hours": 3,
        "total-hours": 15,
        created_at: Date.now(),
    },   
]

module.exports = {
    
    get() {
        return data
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
