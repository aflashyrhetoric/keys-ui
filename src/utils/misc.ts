export const linkToGoogleSearch = (query: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}`

export const linkToGoogleSearchUPC = (query: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(`${query} UPC`)}`

export const linkToGoogleSearchX = (query: string, term = ""): string =>
  `https://www.google.com/search?q=${encodeURIComponent(`${query} ${term}`)}`
