"use client"

import React, { useEffect } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Progress } from "./ui/progress"

const Loading = () => {
  const [progress, setProgress] = React.useState(0)

  React.useLayoutEffect(() => {
    if (progress < 100) {
      const timer = setInterval(
        () => setProgress((progress) => progress + 40),
        500
      )
      return () => clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <Progress value={progress} />
    </div>
  )
}

export default Loading
