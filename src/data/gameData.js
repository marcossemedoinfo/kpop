export const WARRIORS = [
  {
    id: 'hana',
    name: 'Hana Star',
    title: 'Líder Vocal & Luz Estelar',
    badge: 'Estrela Guia',
    skin: '#FFE4D6',
    skinShadow: '#F3C6B1',
    eyeColor: '#EC4899',
    themeColor: '#EC4899',
    defaultState: {
      hairStyle: 'twintails',
      hairColor: '#FF499E',
      eyeshadow: 'neon-pink',
      blush: 'star-glow',
      lipColor: 'cherry-gloss',
      outfit: 'cyber-pink',
      headpiece: 'headset-pro',
      handItem: 'lightstick-star',
      wristItem: 'holo-bracelets',
    }
  },
  {
    id: 'sora',
    name: 'Sora Cyber',
    title: 'Dançarina Principal & Raio Neon',
    badge: 'Raio Azul',
    skin: '#F5CBA7',
    skinShadow: '#E0AC82',
    eyeColor: '#06B6D4',
    themeColor: '#06B6D4',
    defaultState: {
      hairStyle: 'bob-cyber',
      hairColor: '#00F5D4',
      eyeshadow: 'cyber-cyan',
      blush: 'peach-pop',
      lipColor: 'coral-pop',
      outfit: 'neon-guardian',
      headpiece: 'cyber-visor',
      handItem: 'energy-ribbon',
      wristItem: 'neon-gauntlets',
    }
  },
  {
    id: 'maya',
    name: 'Maya Nova',
    title: 'Rapper Espacial & Pulso Solar',
    badge: 'Supernova',
    skin: '#C68642',
    skinShadow: '#A5692B',
    eyeColor: '#A855F7',
    themeColor: '#A855F7',
    defaultState: {
      hairStyle: 'space-buns',
      hairColor: '#9B5DE5',
      eyeshadow: 'galaxy-purple',
      blush: 'berry-sparkle',
      lipColor: 'galaxy-plum',
      outfit: 'galaxy-idol',
      headpiece: 'star-tiara',
      handItem: 'golden-mic',
      wristItem: 'star-cuffs',
    }
  },
  {
    id: 'luna',
    name: 'Luna Eclipse',
    title: 'Visual & Guardiã do Cristal',
    badge: 'Cristal Lunar',
    skin: '#8D5524',
    skinShadow: '#6E3F16',
    eyeColor: '#F59E0B',
    themeColor: '#F59E0B',
    defaultState: {
      hairStyle: 'high-ponytail',
      hairColor: '#F15BB5',
      eyeshadow: 'gold-shimmer',
      blush: 'crystal-hearts',
      lipColor: 'rose-velvet',
      outfit: 'aurora-prism',
      headpiece: 'cat-headphones',
      handItem: 'crystal-wand',
      wristItem: 'holo-bracelets',
    }
  }
];

export const HAIR_STYLES = [
  { id: 'twintails', name: 'Maria-Chiquinha Estelar', icon: '✨', desc: 'Longas mechas duplas de idol' },
  { id: 'bob-cyber', name: 'Chanel Futurista', icon: '⚡', desc: 'Corte moderno com presilha neon' },
  { id: 'space-buns', name: 'Coques Espaciais', icon: '🪐', desc: 'Coques duplos super fofos com cachos' },
  { id: 'high-ponytail', name: 'Rabo de Cavalo Guerreira', icon: '👑', desc: 'Alto e dinâmico para coreografias' },
  { id: 'long-waves', name: 'Ondas Galácticas', icon: '🌊', desc: 'Cabelo longo esvoaçante de fada K-Pop' },
];

export const HAIR_COLORS = [
  { id: 'pink', name: 'Rosa Chiclete Neon', hex: '#FF499E', secondary: '#FF85B3' },
  { id: 'cyan', name: 'Ciano Cyber', hex: '#00F5D4', secondary: '#72EFDD' },
  { id: 'purple', name: 'Violeta Galáxia', hex: '#9B5DE5', secondary: '#C77DFF' },
  { id: 'gold', name: 'Loiro Estelar', hex: '#FEE440', secondary: '#FFF394' },
  { id: 'crimson', name: 'Rubi Elétrico', hex: '#F15BB5', secondary: '#FF70A6' },
  { id: 'blue', name: 'Azul Meia-Noite', hex: '#3A86FF', secondary: '#8338EC' },
  { id: 'mint', name: 'Menta Boreal', hex: '#10B981', secondary: '#6EE7B7' },
  { id: 'silver', name: 'Prata Lunar', hex: '#E2E8F0', secondary: '#94A3B8' },
];

export const EYESHADOWS = [
  { id: 'none', name: 'Natural Suave', color: 'transparent', shimmer: false },
  { id: 'neon-pink', name: 'Brilho Rosa K-Pop', color: '#EC4899', shimmer: true },
  { id: 'cyber-cyan', name: 'Laser Turquesa', color: '#06B6D4', shimmer: true },
  { id: 'galaxy-purple', name: 'Nebulosa Violeta', color: '#A855F7', shimmer: true },
  { id: 'gold-shimmer', name: 'Ouro Solar', color: '#F59E0B', shimmer: true },
  { id: 'emerald-glow', name: 'Esmeralda Pop', color: '#10B981', shimmer: true },
];

export const BLUSHES = [
  { id: 'soft-pink', name: 'Rosado Fofo', color: '#FF758F', pattern: 'soft' },
  { id: 'star-glow', name: 'Estrelinhas Brilhantes', color: '#FF4D6D', pattern: 'stars' },
  { id: 'peach-pop', name: 'Pêssego Cintilante', color: '#FF9E6D', pattern: 'shimmer' },
  { id: 'berry-sparkle', name: 'Amora Mágica', color: '#E056FD', pattern: 'stars' },
  { id: 'crystal-hearts', name: 'Corações de Cristal', color: '#FF5D8F', pattern: 'hearts' },
];

export const LIP_COLORS = [
  { id: 'cherry-gloss', name: 'Gloss Cereja', color: '#FF4D6D' },
  { id: 'coral-pop', name: 'Coral Pop', color: '#FF7B54' },
  { id: 'galaxy-plum', name: 'Ameixa Estelar', color: '#C77DFF' },
  { id: 'rose-velvet', name: 'Rosa Boneca', color: '#FF85A1' },
  { id: 'berry-neon', name: 'Framboesa Neon', color: '#F72585' },
];

export const OUTFITS = [
  {
    id: 'cyber-pink',
    name: 'Armadura Estelar Pink',
    subtitle: 'Jaqueta holográfica + saia plissada neon',
    primary: '#EC4899',
    secondary: '#38BDF8',
    accent: '#FDE047',
    badge: 'POP STAR',
  },
  {
    id: 'neon-guardian',
    name: 'Guardiã Laser Ciano',
    subtitle: 'Colete tático de luz + calça cargo K-Pop',
    primary: '#06B6D4',
    secondary: '#A855F7',
    accent: '#4ADE80',
    badge: 'CYBER BEAT',
  },
  {
    id: 'galaxy-idol',
    name: 'Rainha da Supernova',
    subtitle: 'Ombreiras douradas + vestido armadura violeta',
    primary: '#9333EA',
    secondary: '#F43F5E',
    accent: '#FACC15',
    badge: 'SUPERNOVA',
  },
  {
    id: 'aurora-prism',
    name: 'Valquíria Prisma',
    subtitle: 'Armadura cristal arco-íris + botas aladas',
    primary: '#3B82F6',
    secondary: '#EC4899',
    accent: '#FEF08A',
    badge: 'PRISM WING',
  },
  {
    id: 'solar-beat',
    name: 'Chama Dourada K-Force',
    subtitle: 'Jaqueta bomber solar + saia metálica',
    primary: '#F59E0B',
    secondary: '#EF4444',
    accent: '#FEF9C3',
    badge: 'SOLAR HIT',
  }
];

export const HEADPIECES = [
  { id: 'none', name: 'Sem Acessório de Cabeça', color: '#64748B' },
  { id: 'headset-pro', name: 'Microfone Headset Idol', color: '#EC4899' },
  { id: 'cyber-visor', name: 'Visor Laser Holográfico', color: '#06B6D4' },
  { id: 'star-tiara', name: 'Tiara Real das Estrelas', color: '#FACC15' },
  { id: 'cat-headphones', name: 'Headphone Gatinho Neon', color: '#A855F7' },
];

export const HAND_ITEMS = [
  { id: 'none', name: 'Mãos Livres', color: '#64748B' },
  { id: 'lightstick-star', name: 'Varinha de Luz (Lightstick)', color: '#EC4899' },
  { id: 'golden-mic', name: 'Microfone Estelar Dourado', color: '#FACC15' },
  { id: 'crystal-wand', name: 'Cetro Mágico de Cristal', color: '#38BDF8' },
  { id: 'energy-ribbon', name: 'Fita Rítmica de Luz', color: '#A855F7' },
];

export const WRIST_ITEMS = [
  { id: 'none', name: 'Sem Braceletes', color: '#64748B' },
  { id: 'holo-bracelets', name: 'Pulseiras Holográficas', color: '#EC4899' },
  { id: 'neon-gauntlets', name: 'Braceletes de Energia', color: '#06B6D4' },
  { id: 'star-cuffs', name: 'Munhequeiras Estelares', color: '#FACC15' },
];

