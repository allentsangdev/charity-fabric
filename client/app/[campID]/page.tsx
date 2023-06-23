"use client"

import * as React from "react"
import Link from "next/link"
import listState from "@/store/ListState"
import { NumericFormat } from "react-number-format"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertModal } from "@/components/donator/Modal"

const page = () => {
  const campaign = listState((state) => state.campaign)

  console.log(campaign)

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle className="w-96 h-12 flex justify-center text-2xl">
            {campaign?.CampaignName}
          </CardTitle>
          <CardDescription />
          <CardDescription />
          <CardDescription />
          <CardDescription className="text-base">
            {campaign?.CampaignDesc}
          </CardDescription>
          <CardDescription />
          <Separator orientation="horizontal" />
          <CardDescription className="text-base">
            {campaign?.FundReceiver}
          </CardDescription>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-4">
                <Label htmlFor="name">Amount</Label>
                <NumericFormat
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  prefix="$"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/list">
            <Button variant="ghost">Back</Button>
          </Link>
          <AlertModal isDonator={true}>
            <Button>Donate</Button>
          </AlertModal>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page
