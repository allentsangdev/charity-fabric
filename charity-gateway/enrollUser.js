'use strict';

const fs = require('fs');
const path = require('path');

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');

const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');

async function main(identityLabel, enrollmentID, enrollmentSecret ) {
    try {
        
        // Processing the function arguments
        const orgName = identityLabel.split('@')[1];
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

        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet('./wallet');

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(identityLabel);
        if (identity) {
            throw new Error(`An identity for the ${identityLabel} user already exists in the wallet`);
        }

        /* optional
        let enrollmentAttributes = [];
        if (args.length > 3) {
            enrollmentAttributes = JSON.parse(args[3]);
        }
        */

        let enrollmentRequest = {
            enrollmentID: enrollmentID,
            enrollmentSecret: enrollmentSecret,
            attr_reqs: enrollmentAttributes
        };
        const enrollment = await ca.enroll(enrollmentRequest);

        const orgNameCapitalized = orgNameWithoutDomain.charAt(0).toUpperCase() + orgNameWithoutDomain.slice(1);
        identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: `${orgNameCapitalized}MSP`,
            type: 'X.509',
        };

        const res = await wallet.put(identityLabel, identity);
        //const res = `Successfully enrolled ${identityLabel} user and imported it into the wallet`;
        return res

    } catch (error) {
        //console.error(`Failed to enroll user: ${error}`);
        //process.exit(1);
        return error.message
    }
}

/*
main().then(() => {
    console.log('User enrollment completed successfully.');
}).catch((e) => {
    console.log('User enrollment exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
*/

module.exports = { main }