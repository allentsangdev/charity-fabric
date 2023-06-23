"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { atom, useAtom } from "jotai"
import { useQuery } from "react-query"

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

const campaigns = [
  {
    name: "The Red Cross",
    description: "International humanitarian aid",
    goals: "Offer medical care, clean water and sanitation, relief supplies",
    amountRaised: "$12,500",
    dueDate: "4th Dec 2023",
  },
  {
    name: "UNICEF",
    description: "International children's humanitarian aid organization",
    goals:
      "Provide healthcare, nutrition, education, and protection for children in need",
    amountRaised: "$8,200",
    dueDate: "15th Jan 2024",
  },
  {
    name: "Oxfam",
    description: "International confederation working to alleviate poverty",
    goals:
      "Combat poverty, inequality, and injustice; provide emergency assistance",
    amountRaised: "$6,900",
    dueDate: "20th Mar 2024",
  },
  {
    name: "Doctors Without Borders (MSF)",
    description: "International medical humanitarian organization",
    goals: "Deliver medical aid, provide healthcare in crisis-affected areas",
    amountRaised: "$15,300",
    dueDate: "7th Nov 2023",
  },
  {
    name: "Save the Children",
    description:
      "Global organization supporting children's rights and wellbeing",
    goals: "Ensure children's health, education, protection, and rights",
    amountRaised: "$10,800",
    dueDate: "30th Sep 2023",
  },
  {
    name: "World Food Programme (WFP)",
    description: "United Nations agency addressing global hunger",
    goals: "Fight hunger, provide food assistance, promote food security",
    amountRaised: "$22,150",
    dueDate: "12th Aug 2024",
  },
]
// export const list = atom({})

const TableDemo = () => {
  // const [campaign, setCampaign] = useAtom(list)
  // const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await axios.post(
      `http://20.63.75.49:4000/get-all-campaign`,
      {
        identityLabel: 'User1@org1.example.com"',
      }
    )
    return response.data
  }

  const { data, isLoading } = useQuery("campaigns", getData)

  console.log(data)

  return (
    <>
      <div className="border p-4 rounded-lg">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Goals</TableHead>
                <TableHead>Found raised</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((item, index) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.description}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.goals}
                  </TableCell>
                  <TableCell>{item.amountRaised}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>
                    <Link
                      href="/campain"
                      // onClick={() => setCampaign(campaigns[index])}
                    >
                      <Button>Donate</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}

export default TableDemo
