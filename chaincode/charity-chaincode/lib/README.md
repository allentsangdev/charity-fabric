Here is the document regarding the functionality of the charityContract.js



constructor: This function constructs an instance of the CharityContract class, which extends the Hyperledger Contract class. It names the contract 'CharityContract'.

CreateCampaign: This function is used by campaign organizers to create a new campaign. It takes a context (ctx), a unique campaignId, a campaignName, campaignDesc, fundReceiver, expireOn, targetAmt, currentRaisedAmt, and donateHistory as parameters. The function first checks if the campaign already exists and if it does, it throws an error. If not, it creates a new campaign with the given parameters, sorts the keys in the campaign object in alphabetic order, and adds it to the world state.

createDonatorAccount: This function is used to create an account for a donator with an initial balance of 10000 USD. The function checks if the balance is negative and if the account already exists, in which case, it throws an error. If not, it adds the new donator account to the world state.

GetCampaign: This function takes a campaign ID and returns the corresponding campaign from the world state.

Donate: This function allows a donator to donate to a campaign. It takes a context (ctx), a donatorAccountId, a campaignId, and a donateAmt as parameters. The function checks if the donation amount is negative and if the donator account has enough funds to donate, and if the campaign exists. If any of these conditions are not met, it throws an error. If not, it decreases the balance in the donator account and increases the balance in the campaign by the donation amount, then updates the account and the campaign in the world state.

GetAllCampaign: This function returns all campaigns stored in the world state.

_campaignExists: This internal function takes a context (ctx) and an ID and checks if a campaign with the given ID exists in the world state.

_getTxCreatorUID: This internal function takes a context (ctx) and returns the transaction creator's User Identity (UID).

_accountExists: This internal function takes a context (ctx) and an ID and checks if an account with the given ID exists in the world state.

_putAccount: This internal function takes a context (ctx) and an account and adds the account to the world state. It can also be used to update an existing account.

_getAccount: This internal function takes a context (ctx) and an ID and returns the account with the given ID.

_updateCampaign: This internal function takes a context (ctx) and an updated campaign and updates the campaign in the world state. It first checks if the campaign exists in the world state and if it does not, it throws an error. If it does, it updates the campaign in the world state.