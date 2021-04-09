const express = require("express")
const routes = express.Router()

// const basePath = __dirname + "/views" 
const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Natan",
        avatar: "https://github.com/FalconiN.png",
        "monthly-budget": 4,
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados
            const data = req.body
            //quantas semanas tem no ano: 52
            const weeksPerYear = 52
            //remover as semanas de férias do ano, para pegar quantas semanas tem em um Mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //quantas horas por semana vou trabalhar
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            //qual sera valor da minha hora
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 3,
            "total-hours": 2,
            created_at: Date.now(),
        },
        {
            id: 2,
            name: "Pizzaria Guloso teste 2",
            "daily-hours": 3,
            "total-hours": 15,
            created_at: Date.now(),
        },
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render(views + "index", { jobs: updatedJobs })
        }, 

        create(req, res){
           return res.render(views + 'job')
        },

        save(req, res)  {

            const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 0
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
        
           return res.redirect('/')
        },

        show(req, res) {

            const jobId =  req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))
             
            if(!job){
                return res.send("Job not found")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])


            return res.render(views + "job-edit", { job })
        },

        update(req, res) {
            const jobId =  req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send("Job not found")
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId =  req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },
      
    services: {
        remainingDays(job){
            //calculo de tempo restatens
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
                
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)
        
            const timeDiffInMS = dueDate - Date.now()
            const dayInMs = 1000 * 60 * 60 * 24
        
            const dayDiff = Math.floor(timeDiffInMS / dayInMs)
        
            return dayDiff
            
        },

        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}


// ============== GET =============
routes.get("/", Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.get("/job/:id", Job.controllers.show)
routes.get("/profile", Profile.controllers.index)

//============= POST ===========
routes.post("/job", Job.controllers.save)
routes.post("/job/:id", Job.controllers.update)
routes.post("/job/delete/:id", Job.controllers.delete)
routes.post("/profile", Profile.controllers.update)
 

module.exports = routes