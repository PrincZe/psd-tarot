export interface TarotCard {
  name: string;
  arcana: "major" | "minor";
  suit?: string;
  number: number;
  image: string;
}

export const TAROT_DECK: TarotCard[] = [
  // Major Arcana
  { name: "The Fool", arcana: "major", number: 0, image: "tarot-fool.jpg" },
  { name: "The Magician", arcana: "major", number: 1, image: "tarot-magician.jpg" },
  { name: "The High Priestess", arcana: "major", number: 2, image: "tarot-highpriestess.jpg" },
  { name: "The Empress", arcana: "major", number: 3, image: "tarot-empress.jpg" },
  { name: "The Emperor", arcana: "major", number: 4, image: "tarot-emperor.jpg" },
  { name: "The Hierophant", arcana: "major", number: 5, image: "tarot-hierophant.jpg" },
  { name: "The Lovers", arcana: "major", number: 6, image: "tarot-lovers.jpg" },
  { name: "The Chariot", arcana: "major", number: 7, image: "tarot-chariot.jpg" },
  { name: "Strength", arcana: "major", number: 8, image: "tarot-strength.jpg" },
  { name: "The Hermit", arcana: "major", number: 9, image: "tarot-hermit.jpg" },
  { name: "Wheel of Fortune", arcana: "major", number: 10, image: "tarot-wheeloffortune.jpg" },
  { name: "Justice", arcana: "major", number: 11, image: "tarot-justice.jpg" },
  { name: "The Hanged Man", arcana: "major", number: 12, image: "tarot-hangedman.jpg" },
  { name: "Death", arcana: "major", number: 13, image: "tarot-death.jpg" },
  { name: "Temperance", arcana: "major", number: 14, image: "tarot-temperance.jpg" },
  { name: "The Devil", arcana: "major", number: 15, image: "tarot-devil.jpg" },
  { name: "The Tower", arcana: "major", number: 16, image: "tarot-tower.jpg" },
  { name: "The Star", arcana: "major", number: 17, image: "tarot-star.jpg" },
  { name: "The Moon", arcana: "major", number: 18, image: "tarot-moon.jpg" },
  { name: "The Sun", arcana: "major", number: 19, image: "tarot-sun.jpg" },
  { name: "Judgement", arcana: "major", number: 20, image: "tarot-judgement.jpg" },
  { name: "The World", arcana: "major", number: 21, image: "tarot-world.jpg" },
  // Cups
  { name: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, image: "tarot-cups-01.jpg" },
  { name: "Two of Cups", arcana: "minor", suit: "cups", number: 2, image: "tarot-cups-02.jpg" },
  { name: "Three of Cups", arcana: "minor", suit: "cups", number: 3, image: "tarot-cups-03.jpg" },
  { name: "Four of Cups", arcana: "minor", suit: "cups", number: 4, image: "tarot-cups-04.jpg" },
  { name: "Five of Cups", arcana: "minor", suit: "cups", number: 5, image: "tarot-cups-05.jpg" },
  { name: "Six of Cups", arcana: "minor", suit: "cups", number: 6, image: "tarot-cups-06.jpg" },
  { name: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, image: "tarot-cups-07.jpg" },
  { name: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, image: "tarot-cups-08.jpg" },
  { name: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, image: "tarot-cups-09.jpg" },
  { name: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, image: "tarot-cups-10.jpg" },
  { name: "Page of Cups", arcana: "minor", suit: "cups", number: 11, image: "tarot-cups-11.jpg" },
  { name: "Knight of Cups", arcana: "minor", suit: "cups", number: 12, image: "tarot-cups-12.jpg" },
  { name: "Queen of Cups", arcana: "minor", suit: "cups", number: 13, image: "tarot-cups-13.jpg" },
  { name: "King of Cups", arcana: "minor", suit: "cups", number: 14, image: "tarot-cups-14.jpg" },
  // Pentacles
  { name: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, image: "tarot-pentacles-01.jpg" },
  { name: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, image: "tarot-pentacles-02.jpg" },
  { name: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, image: "tarot-pentacles-03.jpg" },
  { name: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, image: "tarot-pentacles-04.jpg" },
  { name: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, image: "tarot-pentacles-05.jpg" },
  { name: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, image: "tarot-pentacles-06.jpg" },
  { name: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, image: "tarot-pentacles-07.jpg" },
  { name: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, image: "tarot-pentacles-08.jpg" },
  { name: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, image: "tarot-pentacles-09.jpg" },
  { name: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, image: "tarot-pentacles-10.jpg" },
  { name: "Page of Pentacles", arcana: "minor", suit: "pentacles", number: 11, image: "tarot-pentacles-11.jpg" },
  { name: "Knight of Pentacles", arcana: "minor", suit: "pentacles", number: 12, image: "tarot-pentacles-12.jpg" },
  { name: "Queen of Pentacles", arcana: "minor", suit: "pentacles", number: 13, image: "tarot-pentacles-13.jpg" },
  { name: "King of Pentacles", arcana: "minor", suit: "pentacles", number: 14, image: "tarot-pentacles-14.jpg" },
  // Swords
  { name: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, image: "tarot-swords-01.jpg" },
  { name: "Two of Swords", arcana: "minor", suit: "swords", number: 2, image: "tarot-swords-02.jpg" },
  { name: "Three of Swords", arcana: "minor", suit: "swords", number: 3, image: "tarot-swords-03.jpg" },
  { name: "Four of Swords", arcana: "minor", suit: "swords", number: 4, image: "tarot-swords-04.jpg" },
  { name: "Five of Swords", arcana: "minor", suit: "swords", number: 5, image: "tarot-swords-05.jpg" },
  { name: "Six of Swords", arcana: "minor", suit: "swords", number: 6, image: "tarot-swords-06.jpg" },
  { name: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, image: "tarot-swords-07.jpg" },
  { name: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, image: "tarot-swords-08.jpg" },
  { name: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, image: "tarot-swords-09.jpg" },
  { name: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, image: "tarot-swords-10.jpg" },
  { name: "Page of Swords", arcana: "minor", suit: "swords", number: 11, image: "tarot-swords-11.jpg" },
  { name: "Knight of Swords", arcana: "minor", suit: "swords", number: 12, image: "tarot-swords-12.jpg" },
  { name: "Queen of Swords", arcana: "minor", suit: "swords", number: 13, image: "tarot-swords-13.jpg" },
  { name: "King of Swords", arcana: "minor", suit: "swords", number: 14, image: "tarot-swords-14.jpg" },
  // Wands
  { name: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, image: "tarot-wands-01.jpg" },
  { name: "Two of Wands", arcana: "minor", suit: "wands", number: 2, image: "tarot-wands-02.jpg" },
  { name: "Three of Wands", arcana: "minor", suit: "wands", number: 3, image: "tarot-wands-03.jpg" },
  { name: "Four of Wands", arcana: "minor", suit: "wands", number: 4, image: "tarot-wands-04.jpg" },
  { name: "Five of Wands", arcana: "minor", suit: "wands", number: 5, image: "tarot-wands-05.jpg" },
  { name: "Six of Wands", arcana: "minor", suit: "wands", number: 6, image: "tarot-wands-06.jpg" },
  { name: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, image: "tarot-wands-07.jpg" },
  { name: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, image: "tarot-wands-08.jpg" },
  { name: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, image: "tarot-wands-09.jpg" },
  { name: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, image: "tarot-wands-10.jpg" },
  { name: "Page of Wands", arcana: "minor", suit: "wands", number: 11, image: "tarot-wands-11.jpg" },
  { name: "Knight of Wands", arcana: "minor", suit: "wands", number: 12, image: "tarot-wands-12.jpg" },
  { name: "Queen of Wands", arcana: "minor", suit: "wands", number: 13, image: "tarot-wands-13.jpg" },
  { name: "King of Wands", arcana: "minor", suit: "wands", number: 14, image: "tarot-wands-14.jpg" },
];

export function drawCards(count: number): TarotCard[] {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
