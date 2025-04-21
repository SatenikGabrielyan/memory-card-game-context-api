import { useQuery } from "@tanstack/react-query"
import { DIFFICULTY, DIFFICULTY_CARD_PAIRS } from "../constants/constants"


export function useFetchImages(difficulty = DIFFICULTY.MEDIUM, enabled = false) {
  const pairCount = DIFFICULTY_CARD_PAIRS[difficulty] || DIFFICULTY_CARD_PAIRS[DIFFICULTY.MEDIUM]
  return useQuery({
    queryKey: ["cardImages", difficulty],
    queryFn: async () => {
      const randomPage = Math.floor(Math.random() * 10) + 1
      const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=${pairCount}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch images")
      }
      
      return response.json()
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5, 
  })
}

export function createCardDeck(images = []) {
  const cards = []

  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    cards.push(
      { id: i * 2 + 1, pairId: i, image: image.download_url, author: image.author },
      { id: i * 2 + 2, pairId: i, image: image.download_url, author: image.author }
    )
  }

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}
