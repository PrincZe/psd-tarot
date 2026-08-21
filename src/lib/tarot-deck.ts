export interface TarotCard {
  name: string;
  arcana: "major" | "minor";
  suit?: string;
  number: number;
  image: string;
}

export const TAROT_DECK: TarotCard[] = [
  // Major Arcana
  { name: "The Fool", arcana: "major", number: 0, image: "m00.jpg" },
  { name: "The Magician", arcana: "major", number: 1, image: "m01.jpg" },
  { name: "The High Priestess", arcana: "major", number: 2, image: "m02.jpg" },
  { name: "The Empress", arcana: "major", number: 3, image: "m03.jpg" },
  { name: "The Emperor", arcana: "major", number: 4, image: "m04.jpg" },
  { name: "The Hierophant", arcana: "major", number: 5, image: "m05.jpg" },
  { name: "The Lovers", arcana: "major", number: 6, image: "m06.jpg" },
  { name: "The Chariot", arcana: "major", number: 7, image: "m07.jpg" },
  { name: "Strength", arcana: "major", number: 8, image: "m08.jpg" },
  { name: "The Hermit", arcana: "major", number: 9, image: "m09.jpg" },
  { name: "Wheel of Fortune", arcana: "major", number: 10, image: "m10.jpg" },
  { name: "Justice", arcana: "major", number: 11, image: "m11.jpg" },
  { name: "The Hanged Man", arcana: "major", number: 12, image: "m12.jpg" },
  { name: "Death", arcana: "major", number: 13, image: "m13.jpg" },
  { name: "Temperance", arcana: "major", number: 14, image: "m14.jpg" },
  { name: "The Devil", arcana: "major", number: 15, image: "m15.jpg" },
  { name: "The Tower", arcana: "major", number: 16, image: "m16.jpg" },
  { name: "The Star", arcana: "major", number: 17, image: "m17.jpg" },
  { name: "The Moon", arcana: "major", number: 18, image: "m18.jpg" },
  { name: "The Sun", arcana: "major", number: 19, image: "m19.jpg" },
  { name: "Judgement", arcana: "major", number: 20, image: "m20.jpg" },
  { name: "The World", arcana: "major", number: 21, image: "m21.jpg" },
  // Cups
  { name: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, image: "c01.jpg" },
  { name: "Two of Cups", arcana: "minor", suit: "cups", number: 2, image: "c02.jpg" },
  { name: "Three of Cups", arcana: "minor", suit: "cups", number: 3, image: "c03.jpg" },
  { name: "Four of Cups", arcana: "minor", suit: "cups", number: 4, image: "c04.jpg" },
  { name: "Five of Cups", arcana: "minor", suit: "cups", number: 5, image: "c05.jpg" },
  { name: "Six of Cups", arcana: "minor", suit: "cups", number: 6, image: "c06.jpg" },
  { name: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, image: "c07.jpg" },
  { name: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, image: "c08.jpg" },
  { name: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, image: "c09.jpg" },
  { name: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, image: "c10.jpg" },
  { name: "Page of Cups", arcana: "minor", suit: "cups", number: 11, image: "c11.jpg" },
  { name: "Knight of Cups", arcana: "minor", suit: "cups", number: 12, image: "c12.jpg" },
  { name: "Queen of Cups", arcana: "minor", suit: "cups", number: 13, image: "c13.jpg" },
  { name: "King of Cups", arcana: "minor", suit: "cups", number: 14, image: "c14.jpg" },
  // Pentacles
  { name: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, image: "p01.jpg" },
  { name: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, image: "p02.jpg" },
  { name: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, image: "p03.jpg" },
  { name: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, image: "p04.jpg" },
  { name: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, image: "p05.jpg" },
  { name: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, image: "p06.jpg" },
  { name: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, image: "p07.jpg" },
  { name: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, image: "p08.jpg" },
  { name: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, image: "p09.jpg" },
  { name: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, image: "p10.jpg" },
  { name: "Page of Pentacles", arcana: "minor", suit: "pentacles", number: 11, image: "p11.jpg" },
  { name: "Knight of Pentacles", arcana: "minor", suit: "pentacles", number: 12, image: "p12.jpg" },
  { name: "Queen of Pentacles", arcana: "minor", suit: "pentacles", number: 13, image: "p13.jpg" },
  { name: "King of Pentacles", arcana: "minor", suit: "pentacles", number: 14, image: "p14.jpg" },
  // Swords
  { name: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, image: "s01.jpg" },
  { name: "Two of Swords", arcana: "minor", suit: "swords", number: 2, image: "s02.jpg" },
  { name: "Three of Swords", arcana: "minor", suit: "swords", number: 3, image: "s03.jpg" },
  { name: "Four of Swords", arcana: "minor", suit: "swords", number: 4, image: "s04.jpg" },
  { name: "Five of Swords", arcana: "minor", suit: "swords", number: 5, image: "s05.jpg" },
  { name: "Six of Swords", arcana: "minor", suit: "swords", number: 6, image: "s06.jpg" },
  { name: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, image: "s07.jpg" },
  { name: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, image: "s08.jpg" },
  { name: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, image: "s09.jpg" },
  { name: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, image: "s10.jpg" },
  { name: "Page of Swords", arcana: "minor", suit: "swords", number: 11, image: "s11.jpg" },
  { name: "Knight of Swords", arcana: "minor", suit: "swords", number: 12, image: "s12.jpg" },
  { name: "Queen of Swords", arcana: "minor", suit: "swords", number: 13, image: "s13.jpg" },
  { name: "King of Swords", arcana: "minor", suit: "swords", number: 14, image: "s14.jpg" },
  // Wands
  { name: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, image: "w01.jpg" },
  { name: "Two of Wands", arcana: "minor", suit: "wands", number: 2, image: "w02.jpg" },
  { name: "Three of Wands", arcana: "minor", suit: "wands", number: 3, image: "w03.jpg" },
  { name: "Four of Wands", arcana: "minor", suit: "wands", number: 4, image: "w04.jpg" },
  { name: "Five of Wands", arcana: "minor", suit: "wands", number: 5, image: "w05.jpg" },
  { name: "Six of Wands", arcana: "minor", suit: "wands", number: 6, image: "w06.jpg" },
  { name: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, image: "w07.jpg" },
  { name: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, image: "w08.jpg" },
  { name: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, image: "w09.jpg" },
  { name: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, image: "w10.jpg" },
  { name: "Page of Wands", arcana: "minor", suit: "wands", number: 11, image: "w11.jpg" },
  { name: "Knight of Wands", arcana: "minor", suit: "wands", number: 12, image: "w12.jpg" },
  { name: "Queen of Wands", arcana: "minor", suit: "wands", number: 13, image: "w13.jpg" },
  { name: "King of Wands", arcana: "minor", suit: "wands", number: 14, image: "w14.jpg" },
];

export function drawCards(count: number): TarotCard[] {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
