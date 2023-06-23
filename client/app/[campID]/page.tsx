"use client"

import * as React from "react"
import Link from "next/link"
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
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle className="w-full flex justify-center text-2xl">
            The Red Cross
          </CardTitle>
          <CardDescription />
          <CardDescription />
          <CardDescription />
          <CardDescription className="text-base">
            International humanitarian aid
          </CardDescription>
          <CardDescription />
          <Separator orientation="horizontal" />
          <CardDescription />
          <CardDescription>
            Offer medical care, clean water and sanitation, relief supplies
          </CardDescription>
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
