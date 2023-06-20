/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api'); // doc for fabric-contract-api: https://hyperledger.github.io/fabric-chaincode-node/main/api/index.html

// Declaring variable for createCompositeKey
const accountObjType = "Account";
const campaignObjectType = "Campaign"

class CharityContract extends Contract {

    // Accessing "Contract"'s contructor to supply a contract name
    // Supplying a name is recommended but is not mandatory
    constructor(){
        super('CharityContract');
    }

    // ------------------------ Campaign Organizer functions  ------------------------ //
    // CreateCampaign issues a new asset to the world state with given details.
    async CreateCampaign(ctx, campaignId, campaignName, campaignDesc, fundReceiver, expireOn, targetAmt,currentRaisedAmt, donateHistory ) {
        
        // Validate if a Campaign exist on the world state or not
        const exists = await this._campaignExists(ctx, campaignId);
        if (exists) {
            throw new Error(`The campaign ${campaignId} already exists`);
        }

        const campaign = {
            ID: campaignId,
            CampaignName: campaignName,
            CampaignDesc: campaignDesc,
            FundReceiver: fundReceiver,
            ExpireOn: expireOn,
            TargetAmt: targetAmt,
            CurrentRaisedAmt: currentRaisedAmt,
            DonateHistory : donateHistory
        };

        const compositeKey = ctx.stub.createCompositeKey(campaignObjectType, [campaign.ID]);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(compositeKey, Buffer.from(stringify(sortKeysRecursive(campaign))));
        return JSON.stringify(campaign);
    }
    
    // ------------------------ Donator functions  ------------------------ //
    // Create an account for Donator
    // For demo purpose, every donator will have 100000 USD as default balance
    // Logics for funding a specifc account to be developed at later stage 
    async createDonatorAccount(ctx, id, balance = 10000) {
        const accountBalance = parseFloat(balance);
        if (accountBalance < 0) {
            throw new Error(`account balance cannot be negative`);
        }

        const donatorAccount = {
            id: id,
            owner: this._getTxCreatorUID(ctx),
            balance: accountBalance
        }

        if (await this._accountExists(ctx, donatorAccount.id)) {
            throw new Error(`the account ${donatorAccount.id} already exists`);
        }

        await this._putAccount(ctx, donatorAccount);
    }
    
    // GetCampaign returns the Campaign stored in the world state with given ID.
    async GetCampaign(ctx, campaignId) {
        const assetJSON = await ctx.stub.getState(campaignId); // get the campaign from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The campaign ${campaignId} does not exist`);
        }
        return assetJSON.toString();
    }
    
    // Donate deposits fund into a campaign with given campaign ID.
    async Donate(ctx, donatorAccountId, campaignId, donateAmt) {
        try{
            // Validate the donation amount
            const amountToDonate = parseFloat(donateAmt);
            if (amountToDonate <= 0) {
                throw new Error(`amount to donate cannot be negative`);
            }
            
            // Get the donator account
            let donatorAccount = await this._getAccount(ctx, donatorAccountId);

            // Validate if the donator account have enough funds
            const enoughFunds = donatorAccount.balance >= donateAmt;
            if (!enoughFunds) {
                throw new Error(`The donator account do not have enough funds`);
            }

            // Get the campaign that the donator wants to donate to
            const targetCampaign = await this.GetCampaign(campaignId)

            // Donate funds: update the DonatorAccount and CampaignObject locally
            donatorAccount.balance -= donateAmt
            targetCampaign.balance += donateAmt
            // Donate funds: update the DonatorAccount and CampaignObject in the world state
            await this._putAccount(ctx, donatorAccount) 
            await this._updateCampaign(ctx, targetCampaign) 

        }   
        catch(error){
            return console.log(error.message)
        } 

    }

     // GetAllCampaign returns all campaign found in the world state.
     async GetAllCampaign(ctx) {
        
        const iteratorPromise = ctx.stub.getStateByPartialCompositeKey(campaignObjectType, []);

        let results = [];
        for await (const res of iteratorPromise) {
            const campaign = JSON.parse(res.value);
        
            results.push(campaign);
            
        }

        return JSON.stringify(results);
    }

    // ------------------------ Internal functions  ------------------------ //
    // _campaignExists returns true when asset with given ID exists in world state.
    async _campaignExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // _getTxCreatorUID returns the transaction creator UID
    _getTxCreatorUID(ctx) {
        return JSON.stringify({
            mspid: ctx.clientIdentity.getMSPID(),
            id: ctx.clientIdentity.getID()
        });
    }
    
    // _accountExists returns true when an account exists in world state
    async _accountExists(ctx, id) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType, [id]);
        const accountBytes = await ctx.stub.getState(compositeKey);
        return accountBytes && accountBytes.length > 0;
    }

    // _putAccount add a new Donator Account to the world state
    // _putAccount can also be used to update an existing donator account object
    async _putAccount(ctx, account) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType, [account.id]);
        await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(account)));
    }

    // _getAccount returns a donator account with given donator id 
    async _getAccount(ctx, id) {
        const compositeKey = ctx.stub.createCompositeKey(accountObjType, [id]);

        const accountBytes = await ctx.stub.getState(compositeKey);
        if (!accountBytes || accountBytes.length === 0) {
            throw new Error(`the account ${id} does not exist`);
        }

        return JSON.parse(accountBytes.toString());
    }

    // _updateCampaign updates an existing Campaign in the world state with an updated Campaign object.
    async _updateCampaign(ctx, updatedCampaign) {

        // Validate if a Campaign exist on the world state or not
        const exists = await this._campaignExists(ctx, campaignId);
        if (!exists) {
            throw new Error(`The campaign ${campaignId} does not exists`);
        }

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(updatedCampaign.id, Buffer.from(stringify(sortKeysRecursive(updatedCampaign))));
    }

/*
    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, vid) {
        const exists = await this.AssetExists(ctx, vid);
        if (!exists) {
            throw new Error(`The asset ${vid} does not exist`);
        }
        return ctx.stub.deleteState(vid);
    }
*/

}

module.exports = CharityContract;