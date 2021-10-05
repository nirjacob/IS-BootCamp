const express = require('express')
const app = express()
const port = process.env.port || 3000

// File System
const fs = require('fs');

//Body Parser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Data layer
const FILE_PATH = './DataLayer/podcasts.json'
let podcastData = require(FILE_PATH)

//Validator
const joi = require('joi')

app.get('/podcast/:id',(req,res)=>{
    const queryParams = req.params
    const {error} = ValidateInput(queryParams)
    if(error) return res.status(400).send(error.details[0].message)
try{
    const podcastInfo = getPodcastById(queryParams.id)
    return res.status(200).send(podcastInfo)
    }
catch(err){
    console.log(`Error: ${err.stack}`)
    res.status(500).send(`Server Error: ${err.message}`)
}
})

app.post('/podcast/new',(req,res)=>{
    if(getPodcastById(req.body.id).length === 0){
         try{
             savePodcast(req.body)
         }
         catch(err){
             console.log(`Error: ${err.stack}`)
             res.status(500).send(`Server file error: ${err.message}`)
         }
        return res.status(200).send("Podcast has been successfully added")
    }
    else{
        return res.status(409).send("Unable to add, podcast already exists!")
    }
})

app.delete('/podcast/:id',(req,res)=>{
    const queryParams = req.params
    const {error} = ValidateInput(queryParams)
    if(error) return res.status(400).send(error.details[0].message)
    try{
        const podcastInfo = getPodcastById(queryParams.id)
        if(podcastInfo.length !== 0){//none empty array
            deletePodcast(queryParams.id)
            return res.status(200).send('Podcast has been successfully removed')
        }
        else{
            res.status(404).send('Podcast not found')
        }
    }
    catch(err){
        console.log(`Error: ${err.stack}`)
        res.status(500).send(`Server Error: ${err.message}`)
    }
})

app.put('/podcast/:id',(req,res)=> {
    if(getPodcastById(req.params.id).length !== 0){
        try{
            updatePodcasts(req.body,req.params.id)
        }
        catch(err){
            console.log(`Error: ${err.stack}`)
            res.status(500).send(`Server file error: ${err.message}`)
        }
        return res.status(200).send("Podcast has been successfully updated!")
    }
    else{
        return res.status(409).send("Unable to update, podcast does not exists!")
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
}

function deletePodcast(id){
    podcastData = podcastData.filter(getPodcast=>getPodcast.id != id)
    fs.writeFileSync(FILE_PATH, JSON.stringify(podcastData), { flag: 'w+' })
}

function savePodcast(podcast){
    podcastData.push(podcast)
    fs.writeFileSync(FILE_PATH, JSON.stringify(podcastData), { flag: 'w+' })
}

function updatePodcasts(updateDetails,id){
    let podcastToUpdate = podcastData.filter(getPodcast=>getPodcast.id == id)
    podcastToUpdate = {...podcastToUpdate[0],...updateDetails} // assign's new properties and updates existing one's
    podcastData = podcastData.filter(getPodcast=>getPodcast.id != id)
    savePodcast(podcastToUpdate)
}
