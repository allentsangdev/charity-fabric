"use strict";

const fs = require("fs");
const path = require("path");

const FabricCAServices = require("fabric-ca-client");
const { Wallets } = require("fabric-network");

const testNetworkRoot = path.resolve(
    require("os").homedir(),
    "fabric-samples/test-network"
);

async function login(identityLabel, enrollmentID, enrollmentSecret) {
    try {
        // Processing the function arguments
        const orgName = identityLabel.split("@")[1];
        const orgNameWithoutDomain = orgName.split(".")[0];

        // Read the connection profile.
        let connectionProfile = JSON.parse(
            fs.readFileSync(
                path.join(
                    testNetworkRoot,
                    "organizations/peerOrganizations",
                    orgName,
                    `/connection-${orgNameWithoutDomain}.json`
                ),
                "utf8"
            )
        );

        // Create a new CA client for interacting with the CA.
        const ca = new FabricCAServices(
            connectionProfile["certificateAuthorities"][`ca.${orgName}`].url
        );

        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet("./wallet");

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(identityLabel);
        if (!identity) {
            throw new Error(
                `An identity for the ${identityLabel} is not defined.`
            );
        }

        console.log(`Successfully login ${identityLabel} `);
        return res;
    } catch (error) {
        return error.message;
    }
}

module.exports = { login };
