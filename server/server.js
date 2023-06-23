const { main } = require("../charity-gateway/enrollUser");
const { loginUser } = require("../charity-gateway/loginUser");
const { registerUser } = require("../charity-gateway/registerUser");
const { submitTransaction } = require("../charity-gateway/submitTransaction");
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = process.env.port || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

/* ----- Define Routes ----- */

// Landing Route
router.get("/", (req, res) => {
    res.send("<h1>Server On!!!</h1>");
});

// POST Request: enroll-user
// Currently only return status 200 for successful request. To improve logic from the gateway layer when hv time
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com"
// enrollmentID: string eg. "admin"
// enrollmentSecret: string eg "adminpw"
router.post("/enroll-user", async (req, res) => {
    try {
        const { identityLabel, enrollmentID, enrollmentSecret } = req.body;
        const result = await main(
            identityLabel,
            enrollmentID,
            enrollmentSecret
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/loginUser", async (req, res) => {
    try {
        const { identityLabel, enrollmentID, enrollmentSecret } = req.body;
        const result = await loginUser(
            identityLabel,
            enrollmentID,
            enrollmentSecret
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST Request: register-user
// Currently return status 200 and enrollmentSecret back for successful request. To improve logic from the gateway layer when hv time
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com"
// enrollmentID: string eg. "User1@org1.example.com"
// optional: an object eg. {"secret": "userpw"}
// Can improve the optional params from the gateway layer when hv time
router.post("/register-user", async (req, res) => {
    try {
        const { identityLabel, enrollmentID, optional } = req.body;
        const result = await registerUser(
            identityLabel,
            enrollmentID,
            optional
        );
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ------------------------ Endpoints that talk to chaincode  ------------------------ //
// POST Request: Create Campaign
// Returns back the created Campaign Object
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com",
// chaincodeArgs: A list of args in strings eg. -> ["C1", "Japan Earthquake", "To help rebuild Japan!", "People in Japan", "250324", "99999"] -> campaignId, campaignName, campaignDesc, fundReceiver, expireOn, targetAmt
router.post("/create-campaign", async (req, res) => {
    try {
        const { identityLabel, chaincodeArgs } = req.body;
        const result = await submitTransaction(
            identityLabel,
            (functionName = "CreateCampaign"),
            chaincodeArgs
        );
        const decodedResult = result.toString("utf8"); // Decode the result from Buffer to string
        const parsedResult = JSON.parse(decodedResult); // Parse the decoded result as JSON
        res.status(200).json(parsedResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST Request: Create Donator Account
// Currently only return status 200 and a Buffer back. To improve logic from the chaincode layer when hv time
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com"
// chaincodeArgs: A list of args in strings eg. -> ["A1"] -> donatorAccountid
router.post("/create-donator-account", async (req, res) => {
    try {
        const { identityLabel, chaincodeArgs } = req.body;
        const result = await submitTransaction(
            identityLabel,
            (functionName = "CreateDonatorAccount"),
            chaincodeArgs
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET Request: Get All Campaign
// Returns back a list of Campaign objects
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com"
router.post("/get-all-campaign", async (req, res) => {
    try {
        const { identityLabel } = req.body;
        const result = await submitTransaction(
            identityLabel,
            (functionName = "GetAllCampaign"),
            (chaincodeArgs = [])
        );
        const decodedResult = result.toString("utf8"); // Decode the result from Buffer to string
        const parsedResult = JSON.parse(decodedResult); // Parse the decoded result as JSON

        res.status(200).json(parsedResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST Request: Donate
// Currently only return status 200 and a Buffer back. To improve logic from the chaincode layer when hv time
// Expected Params:
// identityLabel: identity in String eg. -> "User1@org1.example.com",
// chaincodeArgs: A list of args in strings eg. -> ["A1", "C0", "30"] -> donatorAccountId, campaignId, donateAmt
router.post("/donate", async (req, res) => {
    try {
        const { identityLabel, chaincodeArgs } = req.body;
        const result = await submitTransaction(
            identityLabel,
            (functionName = "Donate"),
            chaincodeArgs
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
