const thousandSeparator = (value: any) => {
  const persianNumber = value
  const thousands = /\B(?=(\d{3})+(?!\d))/g

  if (persianNumber?.toString().includes(".")) {
    const [integerPart, decimalPart] = persianNumber.toString().split(".")
    return integerPart.replace(thousands, ",") + "." + decimalPart
  }

  return persianNumber?.toString().replace(thousands, ",")
}

export default thousandSeparator
