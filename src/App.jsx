import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Scissors,
  Palette,
  Shirt,
  Wand2,
  Camera,
  PartyPopper,
  Shuffle,
  RotateCcw,
  Star,
  ShieldCheck,
  Music,
  Crown,
  Heart,
  Check,
} from 'lucide-react';
import WarriorCanvas from './components/WarriorCanvas';
import {
  WARRIORS,
  HAIR_STYLES,
  HAIR_COLORS,
  EYESHADOWS,
  BLUSHES,
  LIP_COLORS,
  OUTFITS,
  HEADPIECES,
  HAND_ITEMS,
  WRIST_ITEMS,
} from './data/gameData';

const TABS = [
  {
    id: 'hair',
    label: 'Penteados & Cores',
    shortLabel: 'Cabelo',
    icon: Scissors,
    color: 'from-pink-500 to-rose-500',
    border: 'border-pink-400',
  },
  {
    id: 'makeup',
    label: 'Maquiagem Brilhante',
    shortLabel: 'Make',
    icon: Palette,
    color: 'from-purple-500 to-fuchsia-500',
    border: 'border-purple-400',
  },
  {
    id: 'outfits',
    label: 'Figurinos de Palco',
    shortLabel: 'Figurinos',
    icon: Shirt,
    color: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-400',
  },
  {
    id: 'accessories',
    label: 'Acessórios K-Pop',
    shortLabel: 'Acessórios',
    icon: Wand2,
    color: 'from-amber-400 to-orange-500',
    border: 'border-amber-400',
  },
];

export default function App() {
  const [selectedWarriorId, setSelectedWarriorId] = useState(WARRIORS[0].id);
  const [activeTab, setActiveTab] = useState('hair');
  const [showMode, setShowMode] = useState(false);
  const [photoSavedToast, setPhotoSavedToast] = useState(false);

  // Estado de customização da guerreira ativa
  const currentWarrior =
    WARRIORS.find((w) => w.id === selectedWarriorId) || WARRIORS[0];

  const [customState, setCustomState] = useState({
    ...WARRIORS[0].defaultState,
  });

  const svgRef = useRef(null);

  // Trocar de guerreira aplica o visual inicial único dela
  const handleSelectWarrior = (warrior) => {
    setSelectedWarriorId(warrior.id);
    setCustomState({ ...warrior.defaultState });
  };

  // Atualizar item individual (Substituição direta)
  const updateItem = (key, value) => {
    setCustomState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Disparo de confetes quando ativa o Modo Show
  const fireShowConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF499E', '#00F5D4', '#FEE440', '#9B5DE5', '#38BDF8'],
    });
  };

  const toggleShowMode = () => {
    const nextState = !showMode;
    setShowMode(nextState);
    if (nextState) {
      fireShowConfetti();
    }
  };

  useEffect(() => {
    if (!showMode) return;
    const interval = setInterval(() => {
      confetti({
        particleCount: 28,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#FF499E', '#00F5D4', '#FEE440'],
      });
      confetti({
        particleCount: 28,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#9B5DE5', '#38BDF8', '#FEE440'],
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [showMode]);

  // Visual Surpresa (Aleatório Infantil Seguro - sempre mantém um figurino ativo)
  const handleRandomize = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const nonEmptyHead = HEADPIECES.filter((i) => i.id !== 'none');
    const nonEmptyHand = HAND_ITEMS.filter((i) => i.id !== 'none');
    const nonEmptyWrist = WRIST_ITEMS.filter((i) => i.id !== 'none');
    const nonEmptyShadow = EYESHADOWS.filter((i) => i.id !== 'none');

    setCustomState({
      hairStyle: pick(HAIR_STYLES).id,
      hairColor: pick(HAIR_COLORS).hex,
      eyeshadow: pick(nonEmptyShadow).id,
      blush: pick(BLUSHES).id,
      lipColor: pick(LIP_COLORS).id,
      outfit: pick(OUTFITS).id,
      headpiece: pick(nonEmptyHead).id,
      handItem: pick(nonEmptyHand).id,
      wristItem: pick(nonEmptyWrist).id,
    });
  };

  // Restaurar visual original da guerreira selecionada
  const handleReset = () => {
    setCustomState({ ...currentWarrior.defaultState });
  };

  // Exportar criação como imagem PNG de alta resolução
  const handleSavePhoto = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }

    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1120;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `guerreira-kpop-${currentWarrior.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setPhotoSavedToast(true);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => setPhotoSavedToast(false), 3200);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Luzes de Palco Animadas no Topo quando Modo Show está ativo */}
      {showMode && (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
          <div className="absolute -top-20 left-1/4 w-72 h-[120vh] bg-gradient-to-b from-pink-500/30 via-fuchsia-500/10 to-transparent blur-2xl animate-spotlight-1" />
          <div className="absolute -top-20 right-1/4 w-72 h-[120vh] bg-gradient-to-b from-cyan-400/30 via-blue-500/10 to-transparent blur-2xl animate-spotlight-2" />
        </div>
      )}

      {/* HEADER BAR */}
      <header className="relative z-20 border-b border-pink-500/30 bg-slate-900/80 backdrop-blur-md px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Título e Emblema Livre */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-pink-500/30 border-2 border-white/40">
              <Crown className="w-6 h-6 text-yellow-200 drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-300 via-yellow-200 to-cyan-300 bg-clip-text text-transparent">
                  Guerreiras K-Pop
                </h1>
                <span
                  title="Classificação Indicativa Livre - Infantil e Seguro"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> LIVRE
                </span>
              </div>
              <p className="text-xs text-purple-200/80">
                Estúdio de Moda & Palco Estelar Chibi
              </p>
            </div>
          </div>

          {/* Seletor das 4 Guerreiras K-Pop */}
          <div className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-2xl border border-purple-500/30">
            <span className="text-xs font-semibold text-purple-300 px-2 hidden sm:inline">
              Escolha sua Guerreira:
            </span>
            {WARRIORS.map((w) => {
              const isSelected = w.id === selectedWarriorId;
              return (
                <button
                  key={w.id}
                  onClick={() => handleSelectWarrior(w)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30 scale-105 border border-white/50'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0"
                    style={{ backgroundColor: w.skin }}
                  />
                  <span>{w.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Botões Principais: Modo Show e Salvar Foto */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleShowMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${
                showMode
                  ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 text-slate-950 scale-105 ring-4 ring-pink-400/50 animate-pulse'
                  : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white border border-pink-400/40'
              }`}
            >
              <PartyPopper className="w-4 h-4" />
              <span>{showMode ? 'Palco Ativo!' : 'Modo Show'}</span>
            </button>

            <button
              onClick={handleSavePhoto}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40 transition-all active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Salvar Foto</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notificação de Foto Salva */}
      {photoSavedToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-white animate-bounce">
          <Check className="w-5 h-5" />
          <span>Foto da sua Guerreira K-Pop salva com sucesso! 📸✨</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (PALCO + MENU LATERAL COM ABAS) */}
      <main className="relative z-20 flex-1 max-w-7xl w-full mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* COLUNA ESQUERDA: PALCO E VISUALIZAÇÃO DA PERSONAGEM */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className={`w-full max-w-[420px] rounded-3xl p-3 transition-all duration-500 relative ${
              showMode
                ? 'bg-gradient-to-b from-pink-500/30 via-purple-600/30 to-cyan-500/30 shadow-[0_0_50px_rgba(236,72,153,0.45)] border-2 border-pink-400'
                : 'bg-slate-900/70 shadow-2xl border border-purple-500/30'
            }`}
          >
            {/* Topo do Card da Personagem */}
            <div className="flex items-center justify-between px-3 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-400/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-pink-300" />
                  {currentWarrior.badge}
                </span>
                <span className="text-xs text-purple-200/90 font-medium">
                  {currentWarrior.title}
                </span>
              </div>

              {showMode && (
                <span className="flex items-center gap-1 text-xs font-bold text-yellow-300 animate-bounce">
                  <Music className="w-3.5 h-3.5" /> AO VIVO
                </span>
              )}
            </div>

            {/* Canvas SVG com Camadas Alinhadas */}
            <div className="w-full aspect-[400/560] rounded-2xl overflow-hidden relative">
              <WarriorCanvas
                svgRef={svgRef}
                warrior={currentWarrior}
                state={customState}
                showMode={showMode}
              />
            </div>

            {/* Barra de Ações Rápidas abaixo do palco */}
            <div className="mt-3 flex items-center justify-between gap-2 px-1">
              <button
                onClick={handleRandomize}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-800/60 hover:bg-purple-700/80 text-purple-100 text-xs font-bold border border-purple-400/30 transition"
              >
                <Shuffle className="w-3.5 h-3.5 text-pink-300" />
                <span>Visual Surpresa</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600/50 transition"
                title="Voltar ao visual inicial desta guerreira"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-300" />
                <span>Original</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: MENU LATERAL DE CUSTOMIZAÇÃO COM ABAS BEM VISÍVEIS */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/85 backdrop-blur-xl rounded-3xl border-2 border-purple-500/30 shadow-2xl overflow-hidden h-full max-h-[640px]">
          {/* ABAS DO MENU */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-b border-purple-500/30">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all duration-200 border-2 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white ${tab.border} shadow-lg scale-[1.02]`
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CONTEÚDO DA ABA SELECIONADA */}
          <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-6">
            {/* ==========================================
                ABA 1: PENTEADOS E CORES
               ========================================== */}
            {activeTab === 'hair' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-pink-300 flex items-center gap-2 mb-3">
                    <Scissors className="w-4 h-4" /> 1. Escolha o Corte de Cabelo
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HAIR_STYLES.map((style) => {
                      const active = customState.hairStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => updateItem('hairStyle', style.id)}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                            active
                              ? 'bg-pink-500/20 border-pink-400 shadow-md shadow-pink-500/20'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-pink-500/40'
                          }`}
                        >
                          <span className="text-2xl bg-slate-900 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                            {style.icon}
                          </span>
                          <div>
                            <div className="font-bold text-sm text-white">
                              {style.name}
                            </div>
                            <div className="text-xs text-slate-300">
                              {style.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-pink-300 flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" /> 2. Tintura Neon K-Pop
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {HAIR_COLORS.map((color) => {
                      const active = customState.hairColor === color.hex;
                      return (
                        <button
                          key={color.id}
                          onClick={() => updateItem('hairColor', color.hex)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-2xl border-2 transition-all ${
                            active
                              ? 'bg-slate-800 border-white shadow-lg scale-105'
                              : 'bg-slate-900/70 border-slate-700/80 hover:border-slate-500'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white shadow-inner shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-bold text-slate-100 text-left leading-tight">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                ABA 2: MAQUIAGEM (SOMBRA, BLUSH BRILHANTE E GLOSS)
               ========================================== */}
            {activeTab === 'makeup' && (
              <div className="space-y-6">
                {/* Sombra Brilhante */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" /> Sombra Cintilante de Palco
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {EYESHADOWS.map((shadow) => {
                      const active = customState.eyeshadow === shadow.id;
                      return (
                        <button
                          key={shadow.id}
                          onClick={() => updateItem('eyeshadow', shadow.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                            active
                              ? 'bg-purple-500/25 border-purple-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor:
                                shadow.color === 'transparent'
                                  ? '#334155'
                                  : shadow.color,
                            }}
                          >
                            {shadow.shimmer && (
                              <span className="text-[10px]">✨</span>
                            )}
                          </span>
                          <span className="text-xs font-bold text-white text-left">
                            {shadow.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Blush Brilhante */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-pink-300 flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4" /> Blush Fofo & Glitter Facial
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BLUSHES.map((blush) => {
                      const active = customState.blush === blush.id;
                      return (
                        <button
                          key={blush.id}
                          onClick={() => updateItem('blush', blush.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                            active
                              ? 'bg-pink-500/25 border-pink-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white shrink-0"
                            style={{ backgroundColor: blush.color }}
                          />
                          <span className="text-xs font-bold text-white text-left">
                            {blush.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gloss / Batom */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4" /> Gloss Labial K-Pop
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {LIP_COLORS.map((lip) => {
                      const active = customState.lipColor === lip.id;
                      return (
                        <button
                          key={lip.id}
                          onClick={() => updateItem('lipColor', lip.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                            active
                              ? 'bg-rose-500/25 border-rose-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white shrink-0"
                            style={{ backgroundColor: lip.color }}
                          />
                          <span className="text-xs font-bold text-white text-left">
                            {lip.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                ABA 3: FIGURINOS DE PALCO (SUBSTITUIÇÃO DIRETA)
               ========================================== */}
            {activeTab === 'outfits' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-cyan-950/50 border border-cyan-500/30 rounded-2xl px-4 py-2.5">
                  <p className="text-xs text-cyan-200">
                    ✨ <strong>Troca Instantânea de Figurino:</strong> clique em
                    uma armadura/jaqueta K-Pop para substituir o traje de palco!
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {OUTFITS.map((outfit) => {
                    const active = customState.outfit === outfit.id;
                    return (
                      <button
                        key={outfit.id}
                        onClick={() => updateItem('outfit', outfit.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                          active
                            ? 'bg-gradient-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25 border-cyan-300 shadow-lg scale-[1.01]'
                            : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-12 h-12 rounded-2xl border-2 border-white flex items-center justify-center shadow-md shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${outfit.primary}, ${outfit.secondary})`,
                            }}
                          >
                            <Shirt className="w-6 h-6 text-white drop-shadow" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base text-white">
                                {outfit.name}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/15 text-yellow-300">
                                {outfit.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5">
                              {outfit.subtitle}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            active
                              ? 'bg-cyan-400 text-slate-950 border-white'
                              : 'border-slate-600 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==========================================
                ABA 4: ACESSÓRIOS (HEADSET, VARINHAS DE LUZ, BRACELETES)
               ========================================== */}
            {activeTab === 'accessories' && (
              <div className="space-y-6">
                {/* Acessórios de Cabeça */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2 mb-3">
                    <Crown className="w-4 h-4" /> Headsets, Visores & Tiaras
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HEADPIECES.map((item) => {
                      const active = customState.headpiece === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => updateItem('headpiece', item.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${
                            active
                              ? 'bg-amber-500/20 border-amber-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-white shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs font-bold text-white">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Acessórios de Mão */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-pink-300 flex items-center gap-2 mb-3">
                    <Wand2 className="w-4 h-4" /> Varinhas de Luz (Lightsticks) &
                    Microfones
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HAND_ITEMS.map((item) => {
                      const active = customState.handItem === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => updateItem('handItem', item.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${
                            active
                              ? 'bg-pink-500/20 border-pink-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-white shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs font-bold text-white">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Braceletes de Energia */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" /> Braceletes & Munhequeiras Neon
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {WRIST_ITEMS.map((item) => {
                      const active = customState.wristItem === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => updateItem('wristItem', item.id)}
                          className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${
                            active
                              ? 'bg-cyan-500/20 border-cyan-300 shadow-md'
                              : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-white shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs font-bold text-white">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

