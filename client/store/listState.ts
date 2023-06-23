import { create } from "zustand"

import { Campaign } from "@/types/campaign"

interface ListStore {
  campaign: any
  setCampaign: (value: any) => void
}

const listState = create<ListStore>()((set) => ({
  campaign: null,
  setCampaign: (value) =>
    set((state) => ({ campaign: (state.campaign = value) })),
}))

export default listState
