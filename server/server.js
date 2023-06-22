const { main } = require('../charity-gateway/enrollUser')
const { registerUser } = require('../charity-gateway/registerUser')
const { submitTransaction } = require('../charity-gateway/submitTransaction')
const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const PORT = process.env.port || 4000

// Middlewares
app.use(cors())
app.use(express.json())

/* ----- Define Routes ----- */

// Landing Route
router.get("/", (req,res) => {
    res.send("<h1>Server On!!!</h1>")
})

// POST Request: enroll-user
router.post('/enroll-user', async (req,res) => {
    try {
        const {identityLabel, enrollmentID, enrollmentSecret } = req.body
        const result = await main(identityLabel, enrollmentID, enrollmentSecret)
        res.status(200).json(result)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: register-user
router.post('/register-user', async (req,res) => {
    try {
        const {identityLabel, enrollmentID, optional } = req.body
        const result = await registerUser(identityLabel, enrollmentID, optional)
        res.status(200).send(result)
    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// ------------------------ Endpoints that talk to chaincode  ------------------------ //
// POST Request: Create Campaign
router.post('/create-campaign', async (req,res) => {
    try {
        const {identityLabel, chaincodeArgs } = req.body
        const result = await submitTransaction(identityLabel, functionName = 'CreateCampaign', chaincodeArgs)
        res.status(200).json(result)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: Create Donator Account
router.post('/create-donator-account', async (req,res) => {
    try {
        const {identityLabel, chaincodeArgs } = req.body
        const result = await submitTransaction(identityLabel, functionName = 'CreateDonatorAccount', chaincodeArgs)
        res.status(200).json(result)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// GET Request: Get All Campaign
router.post('/get-all-campaign', async (req,res) => {
    try {
        const {identityLabel, chaincodeArgs } = req.body
        const result = await submitTransaction(identityLabel, functionName = 'GetAllCampaign', chaincodeArgs)
        const decodedResult = result.toString('utf8'); // Decode the result from Buffer to string
        const parsedResult = JSON.parse(decodedResult); // Parse the decoded result as JSON

        res.status(200).json(parsedResult);

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

// POST Request: Donate
router.post('/donate', async (req,res) => {
    try {
        const {identityLabel, chaincodeArgs } = req.body
        const result = await submitTransaction(identityLabel, functionName = 'Donate', chaincodeArgs)
        res.status(200).json(result)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})
