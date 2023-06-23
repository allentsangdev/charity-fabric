export interface Campaign {
  CampaignDesc: string
  CampaignName: string
  CurrentRaisedAmt: number
  DonateHistory: object
  ExpireOn: string | number
  FundReceiver: string
  ID: string
  TargetAmt: string | number
}
