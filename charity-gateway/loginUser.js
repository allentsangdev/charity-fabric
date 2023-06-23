'use strict';

const { Wallets } = require('fabric-network');

async function loginUser(identityLabel, enrollmentID, enrollmentSecret) {
    try {
        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet('./wallet');

        // Check to see if the user's identity exists in the wallet.
        const identityExists = await wallet.exists(identityLabel);
        if (!identityExists) {
            throw new Error(`The identity ${identityLabel} does not exist in the wallet. Please register the user first.`);
        }

        // Retrieve the user's identity from the wallet.
        const userIdentity = await wallet.get(identityLabel);

        // Verify the enrollment ID and secret.
        if (userIdentity.enrollmentID !== enrollmentID || userIdentity.enrollmentSecret !== enrollmentSecret) {
            throw new Error('Invalid enrollment credentials.');
        }

        console.log(`User ${identityLabel} logged in successfully.`);
        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

module.exports = { loginUser };