import React from 'react';
import {
  HAIR_COLORS,
  EYESHADOWS,
  BLUSHES,
  LIP_COLORS,
} from '../data/gameData';

export default function WarriorCanvas({
  svgRef,
  warrior,
  state,
  showMode,
}) {
  // Encontrar dados dos itens atuais
  const hairColorObj =
    HAIR_COLORS.find((c) => c.hex === state.hairColor) || HAIR_COLORS[0];
  const eyeshadowObj =
    EYESHADOWS.find((e) => e.id === state.eyeshadow) || EYESHADOWS[0];
  const blushObj =
    BLUSHES.find((b) => b.id === state.blush) || BLUSHES[0];
  const lipObj =
    LIP_COLORS.find((l) => l.id === state.lipColor) || LIP_COLORS[0];

  const hairMain = hairColorObj.hex;
  const hairHighlight = hairColorObj.secondary || '#FFFFFF';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 560"
      className="w-full h-full max-h-[540px] select-none drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Fundo Estúdio vs Modo Show */}
        <radialGradient id="bgStudio" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#311042" />
          <stop offset="60%" stopColor="#160A28" />
          <stop offset="100%" stopColor="#090414" />
        </radialGradient>

        <radialGradient id="bgShow" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="45%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#090414" />
        </radialGradient>

        {/* Gradiente do Collant Esportivo Fixo (OBRIGATÓRIO NA BASE) */}
        <linearGradient id="fixedBodysuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E1065" />
          <stop offset="50%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="bodysuitTrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        {/* Gradientes de Figurinos */}
        <linearGradient id="cyberPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF499E" />
          <stop offset="60%" stopColor="#D90479" />
          <stop offset="100%" stopColor="#7209B7" />
        </linearGradient>

        <linearGradient id="holoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#72EFDD" />
          <stop offset="50%" stopColor="#00BBF9" />
          <stop offset="100%" stopColor="#4361EE" />
        </linearGradient>

        <linearGradient id="galaxyPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C77DFF" />
          <stop offset="50%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#3C096C" />
        </linearGradient>

        <linearGradient id="auroraPrismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF99C8" />
          <stop offset="35%" stopColor="#FCF6BD" />
          <stop offset="70%" stopColor="#A9DEF9" />
          <stop offset="100%" stopColor="#E4C1F9" />
        </linearGradient>

        <linearGradient id="solarGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>

        <linearGradient id="stageFloorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B0764" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#090414" stopOpacity="1" />
        </linearGradient>

        {/* Brilho dos Olhos e Sombra */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* =======================================================
          1. CAMADA DE FUNDO E PALCO (ESTÚDIO / MODO SHOW)
         ======================================================= */}
      <rect
        x="0"
        y="0"
        width="400"
        height="560"
        rx="28"
        fill={showMode ? 'url(#bgShow)' : 'url(#bgStudio)'}
      />

      {/* Aureola Neon de Fundo */}
      <circle
        cx="200"
        cy="230"
        r="145"
        fill="none"
        stroke={showMode ? '#F472B6' : '#8B5CF6'}
        strokeWidth="2"
        strokeDasharray="8 6"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="230"
        r="125"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1.5"
        opacity="0.25"
      />

      {/* Feixes de Luz de Palco quando Modo Show está ativo */}
      {showMode && (
        <g opacity="0.75">
          <polygon
            points="50,0 130,0 280,520 120,520"
            fill="url(#cyberPinkGrad)"
            opacity="0.28"
          />
          <polygon
            points="350,0 270,0 120,520 280,520"
            fill="url(#holoCyanGrad)"
            opacity="0.28"
          />
          <polygon
            points="200,0 240,0 260,520 140,520"
            fill="#FDE047"
            opacity="0.18"
          />
        </g>
      )}

      {/* Piso do Palco K-Pop */}
      <ellipse
        cx="200"
        cy="505"
        rx="155"
        ry="32"
        fill="url(#stageFloorGrad)"
        stroke={showMode ? '#F472B6' : '#6D28D9'}
        strokeWidth="3"
      />
      <ellipse
        cx="200"
        cy="505"
        rx="125"
        ry="22"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeDasharray="12 6"
        opacity="0.7"
      />
      {/* Sombra da personagem no palco */}
      <ellipse
        cx="200"
        cy="495"
        rx="60"
        ry="12"
        fill="#05020A"
        opacity="0.65"
      />

      {/* Estrelinhas Decorativas no Fundo */}
      <g fill="#FDE047" opacity={showMode ? '0.95' : '0.45'}>
        <path d="M55,95 L59,105 L69,109 L59,113 L55,123 L51,113 L41,109 L51,105 Z" />
        <path d="M345,115 L348,123 L356,126 L348,129 L345,137 L342,129 L334,126 L342,123 Z" fill="#38BDF8" />
        <path d="M65,320 L68,327 L75,330 L68,333 L65,340 L62,333 L55,330 L62,327 Z" fill="#F472B6" />
        <path d="M335,295 L339,305 L349,309 L339,313 L335,323 L331,313 L321,309 L331,305 Z" />
      </g>

      {/* =======================================================
          2. CAMADA TRASEIRA DO CABELO (BACK HAIR)
         ======================================================= */}
      <g id="layer-hair-back">
        {state.hairStyle === 'twintails' && (
          <g>
            {/* Maria-chiquinha esquerda */}
            <path
              d="M115,125 C65,135 50,235 65,335 C72,375 95,395 108,365 C118,340 105,235 128,165 Z"
              fill={hairMain}
              stroke="#1E1B4B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M92,165 C75,215 72,295 85,345"
              fill="none"
              stroke={hairHighlight}
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* Maria-chiquinha direita */}
            <path
              d="M285,125 C335,135 350,235 335,335 C328,375 305,395 292,365 C282,340 295,235 272,165 Z"
              fill={hairMain}
              stroke="#1E1B4B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M308,165 C325,215 328,295 315,345"
              fill="none"
              stroke={hairHighlight}
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* Prendedores Estelares */}
            <circle cx="118" cy="130" r="14" fill="#F472B6" stroke="#1E1B4B" strokeWidth="3" />
            <circle cx="282" cy="130" r="14" fill="#F472B6" stroke="#1E1B4B" strokeWidth="3" />
            <circle cx="118" cy="130" r="6" fill="#FDE047" />
            <circle cx="282" cy="130" r="6" fill="#FDE047" />
          </g>
        )}

        {state.hairStyle === 'bob-cyber' && (
          <g>
            <path
              d="M118,125 C95,165 98,235 122,250 C145,260 255,260 278,250 C302,235 305,165 282,125 Z"
              fill={hairMain}
              stroke="#1E1B4B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {state.hairStyle === 'space-buns' && (
          <g>
            {/* Coques Duplos Espaciais */}
            <circle cx="118" cy="95" r="34" fill={hairMain} stroke="#1E1B4B" strokeWidth="3.5" />
            <circle cx="282" cy="95" r="34" fill={hairMain} stroke="#1E1B4B" strokeWidth="3.5" />
            <path d="M100,82 A20,20 0 0,1 132,78" fill="none" stroke={hairHighlight} strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            <path d="M268,78 A20,20 0 0,1 300,82" fill="none" stroke={hairHighlight} strokeWidth="5" strokeLinecap="round" opacity="0.75" />
            {/* Fitas penduradas dos coques */}
            <path d="M112,125 C95,180 92,240 105,280" fill="none" stroke={hairMain} strokeWidth="14" strokeLinecap="round" />
            <path d="M288,125 C305,180 308,240 295,280" fill="none" stroke={hairMain} strokeWidth="14" strokeLinecap="round" />
          </g>
        )}

        {state.hairStyle === 'high-ponytail' && (
          <g>
            {/* Rabo de cavalo alto volumoso */}
            <path
              d="M200,62 C265,45 325,115 318,225 C312,290 280,330 265,295 C255,270 268,185 235,125 Z"
              fill={hairMain}
              stroke="#1E1B4B"
              strokeWidth="3.5"
            />
            <path
              d="M245,82 C288,110 298,185 288,255"
              fill="none"
              stroke={hairHighlight}
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Elástico Dourado no topo */}
            <ellipse cx="215" cy="72" rx="18" ry="9" transform="rotate(-15 215 72)" fill="#FACC15" stroke="#1E1B4B" strokeWidth="3" />
          </g>
        )}

        {state.hairStyle === 'long-waves' && (
          <g>
            <path
              d="M115,120 C75,185 78,315 102,385 C125,415 275,415 298,385 C322,315 325,185 285,120 Z"
              fill={hairMain}
              stroke="#1E1B4B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M105,215 C95,275 102,335 118,375"
              fill="none"
              stroke={hairHighlight}
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M295,215 C305,275 298,335 282,375"
              fill="none"
              stroke={hairHighlight}
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        )}
      </g>

      {/* =======================================================
          3. CORPO BASE + COLLANT ESPORTIVO FIXO (OBRIGATÓRIO E INDESATIVÁVEL)
         ======================================================= */}
      <g id="layer-base-body-with-fixed-bodysuit">
        {/* Pescoço */}
        <rect
          x="184"
          y="210"
          width="32"
          height="36"
          rx="10"
          fill={warrior.skinShadow}
          stroke="#1E1B4B"
          strokeWidth="3"
        />

        {/* Pernas (Pele) */}
        {/* Perna Esquerda */}
        <path
          d="M158,345 L150,475 C150,485 174,485 174,475 L184,345 Z"
          fill={warrior.skin}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Perna Direita */}
        <path
          d="M216,345 L226,475 C226,485 250,485 250,475 L242,345 Z"
          fill={warrior.skin}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Braços (Pele) */}
        {/* Braço Esquerdo */}
        <path
          d="M150,242 C125,255 110,295 102,335 C99,346 115,352 120,340 C130,310 142,280 158,265 Z"
          fill={warrior.skin}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="108" cy="342" r="11" fill={warrior.skin} stroke="#1E1B4B" strokeWidth="3" />

        {/* Braço Direito */}
        <path
          d="M250,242 C275,255 290,295 298,335 C301,346 285,352 280,340 C270,310 258,280 242,265 Z"
          fill={warrior.skin}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="292" cy="342" r="11" fill={warrior.skin} stroke="#1E1B4B" strokeWidth="3" />

        {/* =====================================================
            COLLANT / MACACÃO ESPORTIVO FIXO (DESENHADO DIRETO NO CORPO BASE)
            Garante cobertura total infantil/segura mesmo sem armadura extra
           ===================================================== */}
        <g id="permanent-modesty-bodysuit">
          {/* Mangas curtas esportivas do macacão fixo */}
          <path
            d="M154,238 C136,246 126,266 122,282 L142,290 C148,275 154,262 162,256 Z"
            fill="url(#fixedBodysuitGrad)"
            stroke="#1E1B4B"
            strokeWidth="3"
          />
          <path
            d="M246,238 C264,246 274,266 278,282 L258,290 C252,275 246,262 238,256 Z"
            fill="url(#fixedBodysuitGrad)"
            stroke="#1E1B4B"
            strokeWidth="3"
          />

          {/* Tronco + Shorts Ciclista Integrados do Collant Esportivo */}
          <path
            d="M154,236 C168,232 184,235 200,235 C216,235 232,232 246,236 C252,268 242,300 246,332 L248,388 L215,388 L205,350 L195,350 L185,388 L152,388 L154,332 C158,300 148,268 154,236 Z"
            fill="url(#fixedBodysuitGrad)"
            stroke="#1E1B4B"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Gola Alta Esportiva Holográfica */}
          <path
            d="M174,234 Q200,246 226,234 L222,246 Q200,256 178,246 Z"
            fill="url(#bodysuitTrim)"
            stroke="#1E1B4B"
            strokeWidth="2"
          />

          {/* Linhas de costura neon esportivas do collant */}
          <path
            d="M172,246 C176,285 174,330 170,386"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.5"
            opacity="0.75"
          />
          <path
            d="M228,246 C224,285 226,330 230,386"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.5"
            opacity="0.75"
          />
          {/* Barras neon nas coxas do macacão */}
          <rect x="151" y="382" width="35" height="7" rx="3" fill="url(#bodysuitTrim)" stroke="#1E1B4B" strokeWidth="2" />
          <rect x="214" y="382" width="35" height="7" rx="3" fill="url(#bodysuitTrim)" stroke="#1E1B4B" strokeWidth="2" />

          {/* Emblema Estelar Central do Collant */}
          <polygon
            points="200,258 204,267 214,268 206,274 209,284 200,278 191,284 194,274 186,268 196,267"
            fill="#FDE047"
            stroke="#1E1B4B"
            strokeWidth="1.5"
          />
        </g>

        {/* Sapatilhas / Botas Base do Collant */}
        <path
          d="M148,440 L176,440 L176,482 C176,492 146,492 146,482 Z"
          fill="#1E1B4B"
          stroke="#1E1B4B"
          strokeWidth="3"
        />
        <path
          d="M224,440 L252,440 L254,482 C254,492 224,492 224,482 Z"
          fill="#1E1B4B"
          stroke="#1E1B4B"
          strokeWidth="3"
        />
      </g>

      {/* =======================================================
          4. CAMADA DE FIGURINOS DE PALCO (SUBSTITUIÇÃO DIRETA)
         ======================================================= */}
      <g id="layer-stage-outfit">
        {/* FIGURINO 1: ARMADURA ESTELAR PINK (cyber-pink) */}
        {state.outfit === 'cyber-pink' && (
          <g>
            {/* Botas Longas Pink & Ciano */}
            <path
              d="M147,402 L179,402 L177,484 C177,494 145,494 145,484 Z"
              fill="url(#cyberPinkGrad)"
              stroke="#1E1B4B"
              strokeWidth="3"
            />
            <path
              d="M221,402 L253,402 L255,484 C255,494 223,494 223,484 Z"
              fill="url(#cyberPinkGrad)"
              stroke="#1E1B4B"
              strokeWidth="3"
            />
            <rect x="145" y="400" width="35" height="10" rx="4" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="220" y="400" width="35" height="10" rx="4" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
            {/* Sola Plataforma */}
            <rect x="143" y="480" width="36" height="10" rx="5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="221" y="480" width="36" height="10" rx="5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Saia Plissada Holográfica */}
            <path
              d="M150,315 L250,315 L272,382 C225,395 175,395 128,382 Z"
              fill="url(#cyberPinkGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Dobras da saia */}
            <line x1="168" y1="320" x2="152" y2="385" stroke="#1E1B4B" strokeWidth="2.5" />
            <line x1="190" y1="320" x2="184" y2="388" stroke="#1E1B4B" strokeWidth="2.5" />
            <line x1="210" y1="320" x2="216" y2="388" stroke="#1E1B4B" strokeWidth="2.5" />
            <line x1="232" y1="320" x2="248" y2="385" stroke="#1E1B4B" strokeWidth="2.5" />
            {/* Faixa Neon na Barra da Saia */}
            <path
              d="M132,372 C175,384 225,384 268,372"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Top & Jaqueta Cropped Guerreira K-Pop */}
            <path
              d="M146,234 L254,234 L268,295 L245,305 L238,262 L232,318 L168,318 L162,262 L155,305 L132,295 Z"
              fill="url(#cyberPinkGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Lapelas Holográficas Azuis */}
            <polygon points="154,234 186,234 176,285 148,275" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
            <polygon points="246,234 214,234 224,285 252,275" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Cinto de Estrela Dourado */}
            <rect x="150" y="308" width="100" height="14" rx="6" fill="#FDE047" stroke="#1E1B4B" strokeWidth="2.8" />
            <circle cx="200" cy="315" r="11" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <polygon points="200,307 203,313 209,313 204,317 206,323 200,319 194,323 196,317 191,313 197,313" fill="#FDE047" />
          </g>
        )}

        {/* FIGURINO 2: GUARDIÃ LASER CIANO (neon-guardian) */}
        {state.outfit === 'neon-guardian' && (
          <g>
            {/* Calça Cargo Futurista K-Pop */}
            <path
              d="M150,312 L250,312 L262,445 L220,445 L204,358 L196,358 L180,445 L138,445 Z"
              fill="#1E1B4B"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Faixas laterais ciano neon */}
            <path d="M152,320 L142,440" stroke="#00F5D4" strokeWidth="6" strokeLinecap="round" />
            <path d="M248,320 L258,440" stroke="#00F5D4" strokeWidth="6" strokeLinecap="round" />
            {/* Bolsos Cargo com detalhes verde-limão */}
            <rect x="142" y="362" width="22" height="28" rx="4" fill="#312E81" stroke="#00F5D4" strokeWidth="2" />
            <rect x="236" y="362" width="22" height="28" rx="4" fill="#312E81" stroke="#00F5D4" strokeWidth="2" />

            {/* Tênis Plataforma Cyber */}
            <path d="M140,440 L182,440 L184,486 L136,486 Z" fill="url(#holoCyanGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <path d="M218,440 L260,440 L264,486 L216,486 Z" fill="url(#holoCyanGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <rect x="134" y="480" width="52" height="10" rx="5" fill="#4ADE80" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="214" y="480" width="52" height="10" rx="5" fill="#4ADE80" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Colete Armadura Ciano & Roxo */}
            <path
              d="M142,232 L258,232 L268,272 L244,282 L242,315 L158,315 L156,282 L132,272 Z"
              fill="url(#holoCyanGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Ombreiras Tecnológicas */}
            <path d="M132,230 L165,230 L155,260 L124,252 Z" fill="#A855F7" stroke="#1E1B4B" strokeWidth="2.8" />
            <path d="M268,230 L235,230 L245,260 L276,252 Z" fill="#A855F7" stroke="#1E1B4B" strokeWidth="2.8" />

            {/* Núcleo de Energia no Peito */}
            <polygon points="200,248 218,266 200,284 182,266" fill="#4ADE80" stroke="#1E1B4B" strokeWidth="2.5" />
            <polygon points="200,254 210,266 200,278 190,266" fill="#FFFFFF" />

            {/* Cinto Tático */}
            <rect x="150" y="306" width="100" height="13" rx="4" fill="#A855F7" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="190" y="304" width="20" height="17" rx="3" fill="#4ADE80" stroke="#1E1B4B" strokeWidth="2.5" />
          </g>
        )}

        {/* FIGURINO 3: RAINHA DA SUPERNOVA (galaxy-idol) */}
        {state.outfit === 'galaxy-idol' && (
          <g>
            {/* Botas Reais Galáxia */}
            <path d="M146,395 L178,395 L176,485 L144,485 Z" fill="url(#galaxyPurpleGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <path d="M222,395 L254,395 L256,485 L224,485 Z" fill="url(#galaxyPurpleGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <polygon points="162,385 170,402 154,402" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2" />
            <polygon points="238,385 246,402 230,402" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2" />
            <rect x="142" y="480" width="36" height="9" rx="4" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="222" y="480" width="36" height="9" rx="4" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Sobressaia Real Assimétrica com Estrelas */}
            <path
              d="M145,310 L255,310 L282,405 L245,380 L225,392 L200,375 L175,392 L155,380 L118,405 Z"
              fill="url(#galaxyPurpleGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Forro Dourado Estelar */}
            <path
              d="M156,315 L244,315 L256,374 C220,384 180,384 144,374 Z"
              fill="#F43F5E"
              stroke="#FACC15"
              strokeWidth="2.5"
            />

            {/* Corpete Armadura Galáctica */}
            <path
              d="M152,235 L248,235 L242,315 L158,315 Z"
              fill="url(#galaxyPurpleGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
            />
            {/* Ombreiras Douradas de Guerreira */}
            <path
              d="M122,242 C135,220 165,225 174,242 L156,262 C142,256 130,252 122,242 Z"
              fill="#FACC15"
              stroke="#1E1B4B"
              strokeWidth="3"
            />
            <path
              d="M278,242 C265,220 235,225 226,242 L244,262 C258,256 270,252 278,242 Z"
              fill="#FACC15"
              stroke="#1E1B4B"
              strokeWidth="3"
            />
            {/* Joia Rubi no Peito */}
            <circle cx="200" cy="265" r="12" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.5" />
            <circle cx="200" cy="265" r="7" fill="#F43F5E" />
          </g>
        )}

        {/* FIGURINO 4: VALQUÍRIA PRISMA (aurora-prism) */}
        {state.outfit === 'aurora-prism' && (
          <g>
            {/* Botas Brancas & Cristal */}
            <path d="M146,400 L178,400 L176,485 L144,485 Z" fill="#F8FAFC" stroke="#1E1B4B" strokeWidth="3" />
            <path d="M222,400 L254,400 L256,485 L224,485 Z" fill="#F8FAFC" stroke="#1E1B4B" strokeWidth="3" />
            <path d="M146,412 L178,412" stroke="#38BDF8" strokeWidth="5" />
            <path d="M222,412 L254,412" stroke="#38BDF8" strokeWidth="5" />
            <rect x="142" y="480" width="36" height="9" rx="4" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="222" y="480" width="36" height="9" rx="4" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Saia em Camadas de Pétalas de Cristal */}
            <path
              d="M148,312 L252,312 L276,378 Q238,395 200,375 Q162,395 124,378 Z"
              fill="url(#auroraPrismGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
            />
            <path
              d="M158,312 L242,312 L254,362 Q200,382 146,362 Z"
              fill="#FFFFFF"
              fillOpacity="0.55"
              stroke="#1E1B4B"
              strokeWidth="2.5"
            />

            {/* Top Armadura Prisma com Laço Mágico */}
            <path
              d="M148,234 L252,234 L262,282 L240,290 L238,315 L162,315 L160,290 L138,282 Z"
              fill="url(#auroraPrismGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
            />
            {/* Grande Laço Rosa & Cristal no Peito */}
            <path d="M200,265 L172,248 L176,282 Z" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <path d="M200,265 L228,248 L224,282 Z" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <circle cx="200" cy="265" r="8" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2.5" />
          </g>
        )}

        {/* FIGURINO 5: CHAMA DOURADA K-FORCE (solar-beat) */}
        {state.outfit === 'solar-beat' && (
          <g>
            {/* Botas Douradas Solar */}
            <path d="M146,405 L178,405 L176,485 L144,485 Z" fill="url(#solarGoldGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <path d="M222,405 L254,405 L256,485 L224,485 Z" fill="url(#solarGoldGrad)" stroke="#1E1B4B" strokeWidth="3" />
            <rect x="142" y="480" width="36" height="9" rx="4" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="222" y="480" width="36" height="9" rx="4" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Saia Metálica Dourada e Vermelha */}
            <path
              d="M148,312 L252,312 L268,382 L132,382 Z"
              fill="url(#solarGoldGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <polygon points="200,320 222,382 178,382" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2.5" />

            {/* Jaqueta Bomber Solar */}
            <path
              d="M138,234 L262,234 L274,295 L246,302 L242,315 L158,315 L154,302 L126,295 Z"
              fill="url(#solarGoldGrad)"
              stroke="#1E1B4B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <polygon
              points="200,248 206,262 220,264 210,273 212,288 200,280 188,288 190,273 180,264 194,262"
              fill="#FEF08A"
              stroke="#1E1B4B"
              strokeWidth="2"
            />
          </g>
        )}
      </g>

      {/* =======================================================
          5. ACESSÓRIOS DE PULSO (BRACELETES / MUNHEQUEIRAS)
         ======================================================= */}
      <g id="layer-wrist-items">
        {state.wristItem === 'holo-bracelets' && (
          <g>
            <ellipse cx="114" cy="326" rx="13" ry="7" transform="rotate(-22 114 326)" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <ellipse cx="116" cy="318" rx="12" ry="6" transform="rotate(-22 116 318)" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
            <ellipse cx="286" cy="326" rx="13" ry="7" transform="rotate(22 286 326)" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <ellipse cx="284" cy="318" rx="12" ry="6" transform="rotate(22 284 318)" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
          </g>
        )}

        {state.wristItem === 'neon-gauntlets' && (
          <g>
            <polygon points="106,332 124,338 134,305 116,298" fill="#06B6D4" stroke="#1E1B4B" strokeWidth="2.8" />
            <polygon points="294,332 276,338 266,305 284,298" fill="#06B6D4" stroke="#1E1B4B" strokeWidth="2.8" />
            <circle cx="120" cy="318" r="5" fill="#FDE047" />
            <circle cx="280" cy="318" r="5" fill="#FDE047" />
          </g>
        )}

        {state.wristItem === 'star-cuffs' && (
          <g>
            <rect x="104" y="312" width="22" height="16" rx="5" transform="rotate(-20 115 320)" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.5" />
            <rect x="274" y="312" width="22" height="16" rx="5" transform="rotate(20 285 320)" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.5" />
          </g>
        )}
      </g>

      {/* =======================================================
          6. CABEÇA E ROSTO CHIBI ANIME (HEAD & FACE)
         ======================================================= */}
      <g id="layer-head">
        {/* Orelhas */}
        <circle cx="122" cy="162" r="14" fill={warrior.skin} stroke="#1E1B4B" strokeWidth="3" />
        <circle cx="278" cy="162" r="14" fill={warrior.skin} stroke="#1E1B4B" strokeWidth="3" />
        {/* Brincos Estelares Fofos */}
        <circle cx="120" cy="174" r="4.5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1.5" />
        <circle cx="280" cy="174" r="4.5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1.5" />

        {/* Rosto Chibi Arredondado */}
        <rect
          x="124"
          y="78"
          width="152"
          height="142"
          rx="68"
          fill={warrior.skin}
          stroke="#1E1B4B"
          strokeWidth="3.5"
        />

        {/* =====================================================
            7. CAMADA DE MAQUIAGEM (SOMBRA, BLUSH BRILHANTE E BATOM)
           ===================================================== */}
        <g id="layer-makeup">
          {/* Sombra de Olhos Brilhante (Eyeshadow) */}
          {eyeshadowObj.id !== 'none' && (
            <g opacity="0.72">
              <path
                d="M138,144 Q158,125 180,144 Q158,136 138,144 Z"
                fill={eyeshadowObj.color}
                filter="url(#softBlur)"
              />
              <path
                d="M220,144 Q242,125 262,144 Q242,136 220,144 Z"
                fill={eyeshadowObj.color}
                filter="url(#softBlur)"
              />
              {/* Pó de glitter sobre as pálpebras */}
              {eyeshadowObj.shimmer && (
                <g fill="#FFFFFF">
                  <circle cx="146" cy="136" r="2" />
                  <circle cx="160" cy="132" r="1.8" />
                  <circle cx="240" cy="132" r="1.8" />
                  <circle cx="254" cy="136" r="2" />
                </g>
              )}
            </g>
          )}

          {/* Blush nas Bochechas */}
          <g>
            <ellipse
              cx="146"
              cy="178"
              rx="16"
              ry="9"
              fill={blushObj.color}
              opacity="0.55"
              filter="url(#softBlur)"
            />
            <ellipse
              cx="254"
              cy="178"
              rx="16"
              ry="9"
              fill={blushObj.color}
              opacity="0.55"
              filter="url(#softBlur)"
            />

            {/* Efeito Glitter / Estrelinhas no Blush */}
            {blushObj.pattern === 'stars' && (
              <g fill="#FEF08A">
                <polygon points="140,175 142,178 145,179 142,180 140,183 138,180 135,179 138,178" />
                <circle cx="152" cy="181" r="1.8" fill="#FFFFFF" />
                <polygon points="260,175 262,178 265,179 262,180 260,183 258,180 255,179 258,178" />
                <circle cx="248" cy="181" r="1.8" fill="#FFFFFF" />
              </g>
            )}

            {blushObj.pattern === 'hearts' && (
              <g fill="#FFFFFF" opacity="0.9">
                <circle cx="143" cy="177" r="2" />
                <circle cx="151" cy="180" r="1.5" />
                <circle cx="257" cy="177" r="2" />
                <circle cx="249" cy="180" r="1.5" />
              </g>
            )}

            {blushObj.pattern === 'shimmer' && (
              <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
                <line x1="140" y1="178" x2="144" y2="174" />
                <line x1="148" y1="180" x2="152" y2="176" />
                <line x1="248" y1="178" x2="252" y2="174" />
                <line x1="256" y1="180" x2="260" y2="176" />
              </g>
            )}
          </g>

          {/* Lábios / Gloss K-Pop Sorriso Fofo */}
          <g>
            <path
              d="M188,186 Q200,198 212,186 Q200,204 188,186 Z"
              fill={lipObj.color}
              stroke="#1E1B4B"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Brilho do Gloss */}
            <ellipse cx="203" cy="192" rx="4" ry="1.8" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>

        {/* Olhos Grandes Estilo Anime Chibi */}
        <g id="layer-eyes">
          {/* Olho Esquerdo */}
          <ellipse cx="160" cy="156" rx="18" ry="20" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="3" />
          <ellipse cx="162" cy="157" rx="13" ry="15" fill={warrior.eyeColor} />
          <circle cx="162" cy="158" r="7" fill="#1E1B4B" />
          {/* Brilhos Estelares nos Olhos */}
          <circle cx="156" cy="149" r="5" fill="#FFFFFF" />
          <circle cx="167" cy="164" r="2.5" fill="#FFFFFF" />
          {/* Cílios Superiores */}
          <path d="M139,146 Q160,130 180,148" fill="none" stroke="#1E1B4B" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M139,146 L133,140" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />

          {/* Olho Direito */}
          <ellipse cx="240" cy="156" rx="18" ry="20" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="3" />
          <ellipse cx="238" cy="157" rx="13" ry="15" fill={warrior.eyeColor} />
          <circle cx="238" cy="158" r="7" fill="#1E1B4B" />
          {/* Brilhos Estelares nos Olhos */}
          <circle cx="232" cy="149" r="5" fill="#FFFFFF" />
          <circle cx="243" cy="164" r="2.5" fill="#FFFFFF" />
          {/* Cílios Superiores */}
          <path d="M220,148 Q240,130 261,146" fill="none" stroke="#1E1B4B" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M261,146 L267,140" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />

          {/* Sobrancelhas Expressivas */}
          <path d="M144,126 Q160,120 176,126" fill="none" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
          <path d="M224,126 Q240,120 256,126" fill="none" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />

          {/* Narizinho delicado */}
          <path d="M199,168 L202,172 L199,174" fill="none" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* =======================================================
          8. CAMADA FRONTAL DO CABELO / FRANJA (FRONT HAIR)
         ======================================================= */}
      <g id="layer-hair-front">
        {/* Franja Base Anime com Mechas */}
        <path
          d="M122,135 C120,82 155,66 200,66 C245,66 280,82 278,135 C265,110 252,128 242,132 C232,108 215,134 200,134 C185,134 168,108 158,132 C148,128 135,110 122,135 Z"
          fill={hairMain}
          stroke="#1E1B4B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Mechas Laterais Moldando o Rosto */}
        <path
          d="M122,122 C116,155 122,190 134,208 C138,185 134,155 136,128 Z"
          fill={hairMain}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M278,122 C284,155 278,190 266,208 C262,185 266,155 264,128 Z"
          fill={hairMain}
          stroke="#1E1B4B"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Reflexo Luminoso (Halo Hair Highlight) na Franja */}
        <path
          d="M150,96 Q200,82 250,96"
          fill="none"
          stroke={hairHighlight}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Presilha Neon Extra quando está no corte Bob Cyber */}
        {state.hairStyle === 'bob-cyber' && (
          <g>
            <rect x="236" y="102" width="24" height="7" rx="3" transform="rotate(15 248 105)" fill="#00F5D4" stroke="#1E1B4B" strokeWidth="2" />
            <rect x="240" y="112" width="20" height="6" rx="3" transform="rotate(15 250 115)" fill="#FF499E" stroke="#1E1B4B" strokeWidth="2" />
          </g>
        )}
      </g>

      {/* =======================================================
          9. ACESSÓRIOS DE CABEÇA (HEADPIECES)
         ======================================================= */}
      <g id="layer-headpiece">
        {/* Microfone Headset Idol */}
        {state.headpiece === 'headset-pro' && (
          <g>
            <path
              d="M122,155 C108,162 118,192 168,192"
              fill="none"
              stroke="#1E1B4B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="122" cy="156" r="10" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
            <circle cx="170" cy="192" r="6" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2" />
          </g>
        )}

        {/* Visor Laser Holográfico */}
        {state.headpiece === 'cyber-visor' && (
          <g>
            <path
              d="M126,134 Q200,118 274,134 L268,164 Q200,152 132,164 Z"
              fill="#06B6D4"
              fillOpacity="0.5"
              stroke="#00F5D4"
              strokeWidth="3"
            />
            <line x1="145" y1="142" x2="175" y2="138" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Tiara Real das Estrelas */}
        {state.headpiece === 'star-tiara' && (
          <g>
            <path
              d="M148,78 L172,56 L186,72 L200,44 L214,72 L228,56 L252,78 Z"
              fill="#FACC15"
              stroke="#1E1B4B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="200" cy="64" r="6" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2" />
            <circle cx="176" cy="69" r="4" fill="#38BDF8" />
            <circle cx="224" cy="69" r="4" fill="#38BDF8" />
          </g>
        )}

        {/* Headphone Gatinho Neon */}
        {state.headpiece === 'cat-headphones' && (
          <g>
            <path
              d="M120,155 C115,65 285,65 280,155"
              fill="none"
              stroke="#A855F7"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Orelhinhas de Gato Neon */}
            <polygon points="138,88 152,54 172,76" fill="#EC4899" stroke="#1E1B4B" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="262,88 248,54 228,76" fill="#EC4899" stroke="#1E1B4B" strokeWidth="3" strokeLinejoin="round" />
            {/* Conchas do Headphone */}
            <ellipse cx="120" cy="156" rx="12" ry="18" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="3" />
            <ellipse cx="280" cy="156" rx="12" ry="18" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="3" />
          </g>
        )}
      </g>

      {/* =======================================================
          10. ACESSÓRIOS DE MÃO (LIGHTSTICKS, MICROFONES, FITAS)
         ======================================================= */}
      <g id="layer-hand-items">
        {/* Varinha de Luz K-Pop (Lightstick) */}
        {state.handItem === 'lightstick-star' && (
          <g transform="translate(292, 338) rotate(15)">
            <rect x="-5" y="-45" width="10" height="65" rx="4" fill="#F8FAFC" stroke="#1E1B4B" strokeWidth="2.8" />
            <circle cx="0" cy="-65" r="24" fill="#38BDF8" fillOpacity="0.45" stroke="#EC4899" strokeWidth="3" />
            <polygon
              points="0,-82 5,-70 18,-69 8,-60 11,-48 0,-55 -11,-48 -8,-60 -18,-69 -5,-70"
              fill="#FDE047"
              stroke="#1E1B4B"
              strokeWidth="2.2"
            />
          </g>
        )}

        {/* Microfone Estelar Dourado */}
        {state.handItem === 'golden-mic' && (
          <g transform="translate(292, 338) rotate(-18)">
            <rect x="-4" y="-32" width="9" height="48" rx="4" fill="#FACC15" stroke="#1E1B4B" strokeWidth="2.8" />
            <circle cx="0" cy="-42" r="14" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.8" />
            <path d="M-12,-42 L12,-42" stroke="#FDE047" strokeWidth="2.5" />
          </g>
        )}

        {/* Cetro Mágico de Cristal */}
        {state.handItem === 'crystal-wand' && (
          <g transform="translate(292, 338) rotate(12)">
            <rect x="-4" y="-65" width="8" height="88" rx="4" fill="#F472B6" stroke="#1E1B4B" strokeWidth="2.8" />
            {/* Asinhas do Cetro */}
            <path d="M-4,-60 C-28,-75 -30,-45 -4,-48 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />
            <path d="M4,-60 C28,-75 30,-45 4,-48 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />
            <polygon points="0,-88 14,-66 0,-46 -14,-66" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.8" />
          </g>
        )}

        {/* Fita Rítmica de Energia Neon */}
        {state.handItem === 'energy-ribbon' && (
          <g>
            <path
              d="M292,340 C345,290 355,190 290,150 C225,110 345,65 370,115"
              fill="none"
              stroke="url(#cyberPinkGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <rect x="286" y="325" width="10" height="32" rx="4" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" />
          </g>
        )}
      </g>

      {/* =======================================================
          11. EFEITOS ESPECIAIS DO MODO SHOW E RODAPÉ DO CARTÃO
         ======================================================= */}
      {showMode && (
        <g id="layer-show-sparkles">
          <circle cx="85" cy="185" r="5" fill="#FDE047" />
          <circle cx="315" cy="175" r="6" fill="#00F5D4" />
          <circle cx="75" cy="420" r="5" fill="#FF499E" />
          <circle cx="325" cy="410" r="7" fill="#FDE047" />
          {/* Notas Musicais Flutuantes */}
          <text x="58" y="245" fontSize="26" fill="#FF499E">♪</text>
          <text x="322" y="235" fontSize="28" fill="#00F5D4">♫</text>
          <text x="82" y="145" fontSize="22" fill="#FDE047">★</text>
        </g>
      )}

      {/* Placa de Nome da Guerreira no Palco */}
      <g transform="translate(200, 535)">
        <rect
          x="-95"
          y="-16"
          width="190"
          height="26"
          rx="13"
          fill="#0F172A"
          fillOpacity="0.85"
          stroke={warrior.themeColor}
          strokeWidth="2"
        />
        <text
          x="0"
          y="2"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="700"
          fontFamily="Fredoka, sans-serif"
          letterSpacing="1"
        >
          ★ {warrior.name.toUpperCase()} ★
        </text>
      </g>
    </svg>
  );
}

