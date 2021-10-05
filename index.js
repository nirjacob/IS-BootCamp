const express = require('express')
const app = express()
const port = process.env.port || 3000
const fs = require('fs');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Data layer
const FILE_PATH = './DataLayer/podcasts.json'
const podcastData = require(FILE_PATH)

//Validator
const joi = require('joi')

app.get('/podcast/:id',(req,res)=>{
    const queryParams = req.params
    const {error} = ValidateInput(queryParams)
    if(error) return res.status(400).send(error.details[0].message)
try{
    const podcastInfo = getPodcastById(queryParams.id)
    return res.send(podcastInfo)
    }
catch(err){
    console.log(`Error: ${err.stack}`)
    res(500).send(`Server Error: ${err.message}`)
}
})

app.post('/podcast/new',(req,res)=>{
    console.log()
    if(getPodcastById(req.body.id) == null){
        savePodcast(req.body)
        return res(200).send("Podcast has been successfully added")
    }
    else{
        return res(409).send("Unable to add, podcast already exists!")
    }
})

app.delete('/podcast/:id',(res,req)=>{
    const queryParams = req.params
    const {error} = ValidateInput(queryParams)
    if(error) return res(400).send(error.details[0].message)
    try{
        const podcastInfo = getPodcastById(queryParams.id)
        if(podcastInfo.length !== 0){//none empty array
            deletePodcast(queryParams.id)
            return res.delete(podcastData[id])
        }
        else{
            res(404).send('Podcast not found')
        }
    }
    catch(err){
        console.log(`Error: ${err.stack}`)
        res(500).send(`Server Error: ${err.message}`)
    }
})

app.listen(port)

function ValidateInput(queryParams){
    const schema = joi.object(
        {
            id: joi.number().integer()
        })
    return schema.validate(queryParams)
}

function getPodcastById (id) {
    return podcastData.filter(getPodcast=>getPodcast.id == id)
    // for(let i in podcastData) {
    //     // i is the index of each object within json data
    //     if(podcastData[i].id == id) {
    //         return podcastData[i]
    //     }
    // }
    // return null
}



function deletePodcast(id){
    delete podcastData.filter(getPodcast=>getPodcast.id == id)
    //
    // for(let i in podcastData) {
    //     // i is the index of each object within json data
    //     if(podcastData[i].id == id) {
    //         delete podcastData[i]
    //     }
    // }
}

function savePodcast(podcast){
    fs.writeFileSync(FILE_PATH, JSON.stringify(podcast), { flag: 'w+' })
}
