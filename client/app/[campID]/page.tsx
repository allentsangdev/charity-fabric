"use client"

import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { Activity, CreditCard, DollarSign, Download, Users } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertModal } from "@/components/donator/Modal"

// import { Icons } from "@/components/icons"
// import { CalendarDateRangePicker } from "@/app/examples/dashboard/components/date-range-picker"
// import { MainNav } from "@/app/examples/dashboard/components/main-nav"
// import { Overview } from "@/app/examples/dashboard/components/overview"
// import { RecentSales } from "@/app/examples/dashboard/components/recent-sales"
// import { Search } from "@/app/examples/dashboard/components/search"
// import TeamSwitcher from "@/app/examples/dashboard/components/team-switcher"
// import { UserNav } from "@/app/examples/dashboard/components/user-nav"

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
                <Input id="amount" placeholder="In dollars $" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/list">
            <Button variant="ghost">Back</Button>
          </Link>
          <AlertModal>
            <Button>Donate</Button>
          </AlertModal>
        </CardFooter>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="card" id="card" className="sr-only" />
              <CreditCard className="mb-3 h-6 w-6" />
              Card
            </Label>
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
              <Icons.paypal className="mb-3 h-6 w-6" />
              Paypal
            </Label>
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="apple" id="apple" className="sr-only" />
              <Icons.apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Card number</Label>
            <Input id="number" placeholder="" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={`${new Date().getFullYear() + i}`}
                    >
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </Card> */}
    </div>
  )
}

export default page
