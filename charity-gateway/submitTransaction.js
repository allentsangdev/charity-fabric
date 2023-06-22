'use strict';

const fs = require('fs');
const path = require('path');
const { Wallets, Gateway } = require('fabric-network');

const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');

async function submitTransaction(identityLabel, functionName, chaincodeArgs) {
    const gateway = new Gateway();
    // ==== Do we neeed wallet ? if so 
    const wallet = await Wallets.newFileSystemWallet('./wallet');

    try {
        
        const orgName = identityLabel.split('@')[1];
        const orgNameWithoutDomain = orgName.split('.')[0];

        let connectionProfile = JSON.parse(fs.readFileSync(
            path.join(testNetworkRoot, 
                'organizations/peerOrganizations', 
                orgName, 
                `/connection-${orgNameWithoutDomain}.json`), 'utf8')
        );

        let connectionOptions = {
            identity: identityLabel,
            wallet: wallet,
            discovery: {enabled: true, asLocalhost: true}
        };

        console.log('Connect to a Hyperledger Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        // ===== we should implement a dynamic way to address the channel!
        console.log('Use channel "mychannel".');
        const network = await gateway.getNetwork('mychannel');

        console.log('Use CharityContract.');
        const contract = network.getContract('charity_chaincode');

        console.log('Submit ' + functionName + ' transaction.');
        const response = await contract.submitTransaction(functionName, ...chaincodeArgs);
        if (`${response}` !== '') {
            console.log(`Response from ${functionName}: ${response}`);
        }
        return response

    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        return error
    } finally {
        console.log('Disconnect from the gateway.');
        gateway.disconnect();
    }
}

//main();

module.exports = { submitTransaction }