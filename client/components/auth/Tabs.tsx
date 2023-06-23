"use client"

import Link from "next/link"
import axios from "axios"
import { useQuery } from "react-query"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Tab() {
  const handleCampaignRegister = async () => {
    // try {
    //   const res = await axios.post(`http://20.63.75.49:4000/loginUser`, {
    //     identityLabel: "User1@org1.example.com",
    //     enrollmentID: "admin",
    //     enrollmentSecret: "adminpw",
    //   })
    //   console.log("response: ", res.data)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Campaigner</TabsTrigger>
        <TabsTrigger value="password">Donator</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Campaigner</CardTitle>
            <CardDescription>
              Enter your email below to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Username</Label>
              <Input id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard">
              <Button onClick={handleCampaignRegister}>Log in</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Donator</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Username</Label>
              <Input id="current" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between items-center">
            <Link href="/list">
              <Button onClick={handleCampaignRegister}>Register</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
