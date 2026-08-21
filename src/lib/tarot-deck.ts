export interface TarotCard {
  name: string;
  arcana: "major" | "minor";
  suit?: string;
  number: number;
  emoji: string;
}

export const TAROT_DECK: TarotCard[] = [
  // Major Arcana
  { name: "The Fool", arcana: "major", number: 0, emoji: "🃏" },
  { name: "The Magician", arcana: "major", number: 1, emoji: "🎩" },
  { name: "The High Priestess", arcana: "major", number: 2, emoji: "🌙" },
  { name: "The Empress", arcana: "major", number: 3, emoji: "👑" },
  { name: "The Emperor", arcana: "major", number: 4, emoji: "🏛️" },
  { name: "The Hierophant", arcana: "major", number: 5, emoji: "📿" },
  { name: "The Lovers", arcana: "major", number: 6, emoji: "💕" },
  { name: "The Chariot", arcana: "major", number: 7, emoji: "🏇" },
  { name: "Strength", arcana: "major", number: 8, emoji: "🦁" },
  { name: "The Hermit", arcana: "major", number: 9, emoji: "🏔️" },
  { name: "Wheel of Fortune", arcana: "major", number: 10, emoji: "🎡" },
  { name: "Justice", arcana: "major", number: 11, emoji: "⚖️" },
  { name: "The Hanged Man", arcana: "major", number: 12, emoji: "🙃" },
  { name: "Death", arcana: "major", number: 13, emoji: "🦋" },
  { name: "Temperance", arcana: "major", number: 14, emoji: "⏳" },
  { name: "The Devil", arcana: "major", number: 15, emoji: "🔗" },
  { name: "The Tower", arcana: "major", number: 16, emoji: "⚡" },
  { name: "The Star", arcana: "major", number: 17, emoji: "⭐" },
  { name: "The Moon", arcana: "major", number: 18, emoji: "🌕" },
  { name: "The Sun", arcana: "major", number: 19, emoji: "☀️" },
  { name: "Judgement", arcana: "major", number: 20, emoji: "📯" },
  { name: "The World", arcana: "major", number: 21, emoji: "🌍" },
  // Cups
  { name: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, emoji: "🏆" },
  { name: "Two of Cups", arcana: "minor", suit: "cups", number: 2, emoji: "🥂" },
  { name: "Three of Cups", arcana: "minor", suit: "cups", number: 3, emoji: "🎉" },
  { name: "Four of Cups", arcana: "minor", suit: "cups", number: 4, emoji: "😔" },
  { name: "Five of Cups", arcana: "minor", suit: "cups", number: 5, emoji: "😢" },
  { name: "Six of Cups", arcana: "minor", suit: "cups", number: 6, emoji: "🧒" },
  { name: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, emoji: "💭" },
  { name: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, emoji: "🚶" },
  { name: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, emoji: "😊" },
  { name: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, emoji: "🌈" },
  { name: "Page of Cups", arcana: "minor", suit: "cups", number: 11, emoji: "🐟" },
  { name: "Knight of Cups", arcana: "minor", suit: "cups", number: 12, emoji: "🦢" },
  { name: "Queen of Cups", arcana: "minor", suit: "cups", number: 13, emoji: "🧜" },
  { name: "King of Cups", arcana: "minor", suit: "cups", number: 14, emoji: "🔱" },
  // Pentacles
  { name: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, emoji: "💰" },
  { name: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, emoji: "🤹" },
  { name: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, emoji: "🏗️" },
  { name: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, emoji: "🏦" },
  { name: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, emoji: "❄️" },
  { name: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, emoji: "🤲" },
  { name: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, emoji: "🌱" },
  { name: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, emoji: "⚒️" },
  { name: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, emoji: "🍇" },
  { name: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, emoji: "🏰" },
  { name: "Page of Pentacles", arcana: "minor", suit: "pentacles", number: 11, emoji: "📚" },
  { name: "Knight of Pentacles", arcana: "minor", suit: "pentacles", number: 12, emoji: "🐂" },
  { name: "Queen of Pentacles", arcana: "minor", suit: "pentacles", number: 13, emoji: "🌺" },
  { name: "King of Pentacles", arcana: "minor", suit: "pentacles", number: 14, emoji: "🦌" },
  // Swords
  { name: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, emoji: "⚔️" },
  { name: "Two of Swords", arcana: "minor", suit: "swords", number: 2, emoji: "🤔" },
  { name: "Three of Swords", arcana: "minor", suit: "swords", number: 3, emoji: "💔" },
  { name: "Four of Swords", arcana: "minor", suit: "swords", number: 4, emoji: "🛌" },
  { name: "Five of Swords", arcana: "minor", suit: "swords", number: 5, emoji: "😤" },
  { name: "Six of Swords", arcana: "minor", suit: "swords", number: 6, emoji: "⛵" },
  { name: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, emoji: "🦊" },
  { name: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, emoji: "😶" },
  { name: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, emoji: "😰" },
  { name: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, emoji: "🌅" },
  { name: "Page of Swords", arcana: "minor", suit: "swords", number: 11, emoji: "🦅" },
  { name: "Knight of Swords", arcana: "minor", suit: "swords", number: 12, emoji: "💨" },
  { name: "Queen of Swords", arcana: "minor", suit: "swords", number: 13, emoji: "🦋" },
  { name: "King of Swords", arcana: "minor", suit: "swords", number: 14, emoji: "👁️" },
  // Wands
  { name: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, emoji: "🔥" },
  { name: "Two of Wands", arcana: "minor", suit: "wands", number: 2, emoji: "🌐" },
  { name: "Three of Wands", arcana: "minor", suit: "wands", number: 3, emoji: "🚢" },
  { name: "Four of Wands", arcana: "minor", suit: "wands", number: 4, emoji: "🎊" },
  { name: "Five of Wands", arcana: "minor", suit: "wands", number: 5, emoji: "⚡" },
  { name: "Six of Wands", arcana: "minor", suit: "wands", number: 6, emoji: "🏆" },
  { name: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, emoji: "🛡️" },
  { name: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, emoji: "🚀" },
  { name: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, emoji: "💪" },
  { name: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, emoji: "🎒" },
  { name: "Page of Wands", arcana: "minor", suit: "wands", number: 11, emoji: "🌟" },
  { name: "Knight of Wands", arcana: "minor", suit: "wands", number: 12, emoji: "🐎" },
  { name: "Queen of Wands", arcana: "minor", suit: "wands", number: 13, emoji: "🌻" },
  { name: "King of Wands", arcana: "minor", suit: "wands", number: 14, emoji: "🦁" },
];

export function drawCards(count: number): TarotCard[] {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
