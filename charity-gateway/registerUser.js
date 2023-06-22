'use strict';

const fs = require('fs');
const path = require('path');

const FabricCAServices = require('fabric-ca-client');
const { Wallets, Gateway } = require('fabric-network');

const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');

async function registerUser(registrarLabel, enrollmentID, optional) {
    try {
        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet('./wallet');

        // Check to see if we've already enrolled the registrar user.
        let registrarIdentity = await wallet.get(registrarLabel);
        if (!registrarIdentity) {
            throw new Error(`An identity for the registrar user ${registrarLabel} does not exist in the wallet, Run the enrollUser.js application before retrying`);
        }

        const orgName = registrarLabel.split('@')[1];
        const orgNameWithoutDomain = orgName.split('.')[0];

        // Read the connection profile.
        let connectionProfile = JSON.parse(fs.readFileSync(
            path.join(testNetworkRoot, 
                'organizations/peerOrganizations', 
                orgName, 
                `/connection-${orgNameWithoutDomain}.json`), 'utf8')
        );

        // Create a new CA client for interacting with the CA.
        const ca = new FabricCAServices(connectionProfile['certificateAuthorities'][`ca.${orgName}`].url);

        const provider = wallet.getProviderRegistry().getProvider(registrarIdentity.type);
		const registrarUser = await provider.getUserContext(registrarIdentity, registrarLabel);

        // optional parameters
        let optionalSecret = {};
        if (optional) {
            optionalSecret = JSON.parse(optional);
        }
        
        // Register the user and return the enrollment secret.
        let registerRequest = {
            enrollmentID: enrollmentID,
            enrollmentSecret: optionalSecret.secret || "",
            role: 'client',
            attrs: optionalSecret.attrs || []
        };
        const secret = await ca.register(registerRequest, registrarUser);
        console.log(`Successfully registered the user with the ${enrollmentID} enrollment ID and ${secret} enrollment secret.`);
        return secret
    } catch (error) {
        return error.message
    }
}

/*
main().then(() => {
    console.log('User registration completed successfully.');
}).catch((e) => {
    console.log('User registration exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
*/

module.exports = { registerUser }