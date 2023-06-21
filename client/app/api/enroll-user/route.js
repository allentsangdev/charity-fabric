import { NextResponse } from 'next/server'
import { main } from '/home/azureuser/fabric-samples/charity-fabric/charity-gateway/enrollUser.js'

export async function GET(Request) {
  const res = await main()
  
  const data = await res.json()
  console.log(NextResponse.json({ data }));
 
  return NextResponse.json({ data })

  // return NextResponse.json("Hi 2")
}