"use client"

import * as React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import listState from "@/store/listState"
import axios from "axios"
import { NumericFormat } from "react-number-format"
import { QueryClient, useQuery } from "react-query"

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
import Loading from "@/components/Loading"
import { AlertModal } from "@/components/donator/Modal"

const page = ({ params }: any) => {
  const [doLoading, setDoLoading] = React.useState(false)
  const router = useRouter()
  const [amount, setAmount] = React.useState("")
  const getData = async () => {
    const response = await axios.post("http://20.63.75.49:4000/get-campaign", {
      identityLabel: "User1@org1.example.com",
      chaincodeArgs: [`${params?.campID}`],
    })
    return response.data
  }

  const { data, isLoading } = useQuery(`campaign${params?.campID}`, getData)

  const handleDonate = async () => {
    setDoLoading(true)
    const res = await axios.post("http://20.63.75.49:4000/donate", {
      identityLabel: "User1@org1.example.com",
      chaincodeArgs: ["A1", `${params?.campID}`, amount],
    })

    if (res.status === 200) {
      setTimeout(() => {
        setDoLoading(false)
      }, 3000)
      router.push("/list")
    }
  }

  return (
    <>
      {isLoading || doLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex justify-center items-center">
          <Card className="">
            <CardHeader>
              <CardTitle className="w-96 h-12 flex justify-center text-2xl">
                {data?.CampaignName}
              </CardTitle>
              <CardDescription />
              <CardDescription />
              <CardDescription />
              <CardDescription className="text-lg font-semibold">
                {data?.FundReceiver}
              </CardDescription>
              <CardDescription />
              <Separator orientation="horizontal" />
              <CardDescription className="text-base">
                {data?.CampaignDesc}
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
                      onValueChange={(e) => setAmount(e.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/list">
                <Button variant="ghost">Back</Button>
              </Link>
              <AlertModal isDonator={true} {...{ handleDonate }}>
                <Button>Donate</Button>
              </AlertModal>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}

export default page
