const { main } = require('/home/azureuser/fabric-samples/charity-fabric/charity-gateway/enrollUser.js')
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

/*
// POST Request: Donate
router.get('/donate', async (req,res) => {
    try {
        const {seedPhrase, destinationAddress, txAmount } = req.body
        const tx = {
            to:destinationAddress,
            value: utils.parseEther(txAmount)
        }
        const wallet = await importWallet(seedPhrase)
        const txReceipt = await wallet.sendTransaction(tx)
        res.status(200).json(txReceipt)

    } 
    catch(error) {
        res.status(500).send(error.message)
    }
})
*/

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})
