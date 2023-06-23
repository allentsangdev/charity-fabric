const timeConvert = (timestamp: string) => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear()

  const formattedDate = `${getOrdinalSuffix(day)} ${month} ${year}`
  return formattedDate
}

const getOrdinalSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"]
  const relevantDigits = day % 100
  const suffix =
    suffixes[(relevantDigits - 20) % 10] ||
    suffixes[relevantDigits] ||
    suffixes[0]
  return `${day}${suffix}`
}

export default timeConvert
