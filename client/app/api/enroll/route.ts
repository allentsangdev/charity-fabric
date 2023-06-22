import { NextResponse } from 'next/server'
import { main } from '../../../../charity-gateway/enrollUser.js'

export async function POST(request: Request) {
  
  try {
    //const { searchParams } = new URL(request.url) 
    //const identityLabel = searchParams.get('identityLable') 
    //const enrollmentID = searchParams.get('enrollmentID') 
    //const enrollmentSecret = searchParams.get('enrollmentSecret') 


    // update enrollUser to return back a payroll
    //const res = await main(identityLabel, enrollmentID, enrollmentSecret)
    const res = await main('enrollmentSecret')
    //const data = await res.json()
    
    return NextResponse.json("Hi")
    //return NextResponse.json({ data })
  }
  catch(error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }

  //return NextResponse.json("Hi 2")
  // test
}