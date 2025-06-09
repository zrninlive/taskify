import { Card, List } from "@prisma/client"

export type ListhWithCards = List & { cards: Card[] }
export type CardWithList = Card & { list: List }