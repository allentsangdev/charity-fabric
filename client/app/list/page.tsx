"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import thousandSeparator from "@/func/thousandSep"
import timeConvert from "@/func/timeConvert"
import listState from "@/store/listState"
import axios from "axios"
import { QueryClient, useQuery } from "react-query"

import { Campaign } from "@/types/campaign"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Loading from "@/components/Loading"

const TableDemo = () => {
  const getData = async () => {
    const response = await axios.post(
      `http://20.63.75.49:4000/get-all-campaign`,
      {
        identityLabel: "User1@org1.example.com",
      }
    )
    return response.data
  }

  const { data, isLoading } = useQuery("list", getData)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="border p-4 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Fund Receiver</TableHead>
                <TableHead>Raised / Target</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item: Campaign, index: number) => (
                <TableRow key={item?.ID}>
                  <TableCell className="font-medium">
                    {item?.CampaignName}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item?.CampaignDesc}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item?.FundReceiver}
                  </TableCell>
                  <TableCell>{`$${thousandSeparator(
                    item?.CurrentRaisedAmt
                  )} / $${thousandSeparator(item?.TargetAmt)}`}</TableCell>
                  <TableCell>
                    {timeConvert(item?.ExpireOn.toString())}
                  </TableCell>
                  <TableCell>
                    <Link href={`/campaign/${item?.ID}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

export default TableDemo
