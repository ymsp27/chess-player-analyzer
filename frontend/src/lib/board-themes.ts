export interface BoardTheme {
  id: string;
  name: string;
  darkSquare: string;
  lightSquare: string;
  accentColor: string;
  description: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'walnut',
    name: 'Walnut Wood',
    darkSquare: '#7D471C',
    lightSquare: '#FAF6F0',
    accentColor: '#D48C46',
    description: 'Classic Grandmaster Polished Wood'
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    darkSquare: '#1E3A2B',
    lightSquare: '#E1EFE7',
    accentColor: '#10B981',
    description: 'Deep Luxury Forest Green'
  },
  {
    id: 'sapphire',
    name: 'Slate Sapphire',
    darkSquare: '#1E293B',
    lightSquare: '#E2E8F0',
    accentColor: '#38BDF8',
    description: 'Modern Sleek Slate Blue'
  },
  {
    id: 'burgundy',
    name: 'Royal Burgundy',
    darkSquare: '#581825',
    lightSquare: '#FDF2F8',
    accentColor: '#EC4899',
    description: 'Deep Velvet Wine'
  },
  {
    id: 'obsidian',
    name: 'Obsidian Onyx',
    darkSquare: '#18181B',
    lightSquare: '#D4D4D8',
    accentColor: '#A1A1AA',
    description: 'Minimalist Monochromatic Dark'
  }
];
