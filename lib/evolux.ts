// Types
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type CosmeticType = 'aura' | 'coroa' | 'olhos' | 'armadura' | 'satelite' | 'particula' | 'arma';

export interface CosmeticItem {
  id: string;
  name: string;
  type: CosmeticType;
  rarity: Rarity;
  description: string;
  color?: string;
  unlockCondition: string;
  requirements: string[];
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  requirement: (profile: any) => boolean;
  rewardCosmeticId?: string;
}

export interface PlanetMissionDef {
  id: string;
  level: number;
  name: string;
  streakReq: number;
  color: string;
  size: number;
  atmosphere: string;
  phrase: string;
}

// ---------------------------
// 1. COSMETICS (REWARDS)
// ---------------------------
export const COSMETICS: CosmeticItem[] = [
  // Auras
  { id: 'aura_base', name: 'Aura Primária', type: 'aura', rarity: 'common', description: 'Energia básica de inicio de jornada.', color: 'rgba(0,240,255,0.2)', unlockCondition: 'Padrão', requirements: ['Nível 1'] },
  { id: 'aura_green', name: 'Aura da Constância', type: 'aura', rarity: 'rare', description: 'Energia estável e curativa do progresso diário.', color: 'rgba(0,255,150,0.4)', unlockCondition: 'Desbloqueado ao estabilizar a rotina.', requirements: ['Streak 14 dias'] },
  { id: 'aura_purple', name: 'Névoa Viciante', type: 'aura', rarity: 'rare', description: 'Energia densa da rotina implacável.', color: 'rgba(150,0,255,0.4)', unlockCondition: 'Obtido ao manter a disciplina por uma semana.', requirements: ['Streak 7 dias', 'Poder Evolux 1.000'] },
  { id: 'aura_orange', name: 'Aura Solar', type: 'aura', rarity: 'epic', description: 'Fúria estelar queimando fraquezas.', color: 'rgba(255,150,0,0.5)', unlockCondition: 'Desbloqueado ao conquistar o planeta infernal.', requirements: ['Planeta Pyros desbloqueado', 'Nível 5'] },
  { id: 'aura_red_black', name: 'Matéria Escura', type: 'aura', rarity: 'legendary', description: 'Você consome o espaço-tempo ao redor.', color: 'rgba(255,0,50,0.6)', unlockCondition: 'Recompensa por constância absoluta e poder superior.', requirements: ['Streak 60 dias', 'Poder Evolux 15.000', 'Planeta Kyber ativo'] },
  { id: 'aura_infinite', name: 'Núcleo Violeta', type: 'aura', rarity: 'legendary', description: 'A energia suprema da elite. O universo se curva.', color: 'rgba(157,0,255,0.8)', unlockCondition: 'Forjado na mais alta raridade evolutiva.', requirements: ['Top 10% Ranking Global', 'Nível 8', 'Poder Evolux 20.000'] },
  { id: 'aura_prime', name: 'Núcleo Prime', type: 'aura', rarity: 'legendary', description: 'Energia que transcende o cosmos.', color: 'rgba(255,255,255,0.9)', unlockCondition: 'A recompensa final por orbitar perto da singularidade.', requirements: ['Streak 180 dias', 'Top 1% Ranking', 'Planeta Oblivion desbloqueado'] },
  
  // Armaduras
  { id: 'tex_carbon', name: 'Chassi de Aço', type: 'armadura', rarity: 'common', description: 'A base humana resistente.', unlockCondition: 'Padrão', requirements: ['Nível 1'] },
  { id: 'tex_titanium', name: 'Exoesqueleto de Titânio', type: 'armadura', rarity: 'rare', description: 'Reforços metálicos que suportam mais dor.', unlockCondition: 'Desbloqueado com constância.', requirements: ['Streak 30 dias', 'Planeta Pyros ativo'] },
  { id: 'tex_crystal', name: 'Núcleo Exposto', type: 'armadura', rarity: 'rare', description: 'Com a quebra do limite frágil, a energia rege.', unlockCondition: 'Recompensa de dedicação inicial.', requirements: ['Concluir 20 missões', 'Streak 14 dias'] },
  { id: 'tex_obsidian', name: 'Peitoral Nebula', type: 'armadura', rarity: 'epic', description: 'Forjado sob pressão insana da disciplina.', unlockCondition: 'Desbloqueado por volume brutal de tarefas.', requirements: ['Concluir 100 missões', 'Nível 6', 'Poder Evolux 12.000'] },
  { id: 'tex_suprema', name: 'Armadura Suprema', type: 'armadura', rarity: 'legendary', description: 'Intocável pelas falhas mortais.', unlockCondition: 'O armamento dos deuses da disciplina.', requirements: ['Nível 15', 'Planeta Nexus Prime ativo', 'Poder Evolux 50.000'] },

  // Partículas
  { id: 'part_none', name: 'Limpo', type: 'particula', rarity: 'common', description: '', unlockCondition: 'Padrão', requirements: ['Nível 1'] },
  { id: 'part_shooting_stars', name: 'Estrelas Cadentes', type: 'particula', rarity: 'rare', description: 'Pequenos meteoros orbitando ao seu redor.', unlockCondition: 'Alcançou velocidades orbitais altas.', requirements: ['Planeta Aetheria desbloqueado'] },
  { id: 'part_stardust', name: 'Poeira Cósmica', type: 'particula', rarity: 'rare', description: 'Restos de planetas e desculpas superadas.', unlockCondition: 'Sua presença afeta a realidade.', requirements: ['Poder Evolux 5.000', 'Top 50% Ranking'] },
  { id: 'part_glitch', name: 'Falha Na Matrix', type: 'particula', rarity: 'epic', description: 'Seus dados começam a transcender o sistema.', unlockCondition: 'Volume e intensidade geram falhas na simulação.', requirements: ['Concluir 50 tarefas diárias', 'Streak 30 dias'] },
  { id: 'part_quantum', name: 'Partícula Quântica', type: 'particula', rarity: 'legendary', description: 'Dobra o espaço e tempo ao seu redor.', unlockCondition: 'Rachaduras quânticas ao aniquilar hábitos fracos.', requirements: ['Nível 8', 'Top 10% Ranking Global'] },

  // Olhos
  { id: 'eye_blue', name: 'Scan Óptico', type: 'olhos', rarity: 'common', description: 'Foco inicial.', color: '#00f0ff', unlockCondition: 'Padrão', requirements: ['Nível 1'] },
  { id: 'eye_red', name: 'Modo Combate', type: 'olhos', rarity: 'rare', description: 'Olhar letal direcionado as suas metas.', color: '#ff2222', unlockCondition: 'Desbloqueado ao abraçar o conflito diário.', requirements: ['Poder Evolux 10.000'] },
  { id: 'eye_purple', name: 'Olhos Nebula', type: 'olhos', rarity: 'epic', description: 'Quem olha para a disciplina, a disciplina olha de volta.', color: '#9d00ff', unlockCondition: 'Recompensa por visão a longo prazo focada.', requirements: ['Streak 45 dias', 'Concluir 150 missões totais'] },
  { id: 'eye_gold', name: 'Olhos Plasma', type: 'olhos', rarity: 'legendary', description: 'O universo reage e se curva ao seu olhar.', color: '#00f0ff', unlockCondition: 'A percepção definitiva de poder.', requirements: ['Planeta Astralis desbloqueado', 'Poder Evolux 80.000'] },
  
  // Coroas
  { id: 'halo_plasma', name: 'Coroa de Gelo', type: 'coroa', rarity: 'epic', description: 'Uma coroa gravitacional inatacável.', unlockCondition: 'Governe o frio cortante do início.', requirements: ['Nível 10', 'Planeta Glacius ativo', 'Streak 21 dias'] },
  { id: 'halo_chaos', name: 'Coroa do Caos', type: 'coroa', rarity: 'epic', description: 'Adquira o controle onde a maioria perde a cabeça.', color: '#ff4500', unlockCondition: 'Sobreviveu à tempestade inicial.', requirements: ['Streak 60 dias'] },
  { id: 'halo_void', name: 'Coroa Ônix', type: 'coroa', rarity: 'legendary', description: 'Puxa todas desculpas de perto e as destrói.', color: '#9d00ff', unlockCondition: 'O peso absoluto da constância.', requirements: ['Streak 90 dias', 'Planeta Lumina desbloqueado'] },
  { id: 'halo_angelic', name: 'Aérola de Ouro Branco', type: 'coroa', rarity: 'legendary', description: 'Luz pura, intocável pela preguiça.', color: '#ffffff', unlockCondition: 'Elevação máxima.', requirements: ['Top 1% Ranking Regional', 'Nível 18'] },

  // Armas
  { id: 'weapon_scythe', name: 'Foice Glacial', type: 'arma', rarity: 'rare', description: 'Talhada do gelo do primeiro planeta superado.', color: '#00aaff', unlockCondition: 'Uma arma de precisão fria.', requirements: ['Planeta Glacius desbloqueado', 'Streak 14 dias'] },
  { id: 'weapon_blade', name: 'Lâmina Cósmica', type: 'arma', rarity: 'legendary', description: 'Forjada no coração de uma supernova térmica.', color: '#00f0ff', unlockCondition: 'Corte a inércia pela raiz.', requirements: ['Concluir 300 missões', 'Poder Evolux 100.000'] },
  { id: 'weapon_trident', name: 'Foice Estelar', type: 'arma', rarity: 'epic', description: 'Arma pesada para quebrar a inércia.', color: '#ffb700', unlockCondition: 'Recompensa de força implacável.', requirements: ['Poder Evolux 50.000'] },

  // Satélites
  { id: 'sat_drone', name: 'Drone Disciplina', type: 'satelite', rarity: 'rare', description: 'Um vigia mecânico que orbita e analisa erros.', unlockCondition: 'Vigia automático para alta consistência.', requirements: ['Nível 5', 'Concluir 20 tarefas'] },
  { id: 'sat_orbital', name: 'Satélite Orbital', type: 'satelite', rarity: 'epic', description: 'Sua própria vigia tecnológica em órbita constante.', unlockCondition: 'Domínio orbital e de espaço.', requirements: ['Nível 12', 'Planeta Pyros desbloqueado'] }
];

// ---------------------------
// 2. ACHIEVEMENTS (SIDE QUESTS)
// ---------------------------
export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'ach_init', name: 'Protocolo Iniciado', description: 'Sua jornada na dor e glória começou.', rarity: 'common', requirement: () => true },
  
  { id: 'ach_fenix', name: 'Fênix', description: 'Voltou a progredir imediatamente após quebrar um streak. Você não desiste.', rarity: 'rare', requirement: (p) => p.totalTasksCompleted > 10 && p.streak >= 2, rewardCosmeticId: 'tex_crystal' },
  { id: 'ach_ritual', name: 'O Ritual', description: 'Manter sua rotina por 30 dias. Um mês de obediência inegociável.', rarity: 'rare', requirement: (p) => p.streak >= 30, rewardCosmeticId: 'aura_purple' },
  { id: 'ach_const_aura', name: 'Base Estável', description: 'Alcançou 14 dias de streak.', rarity: 'rare', requirement: (p) => p.streak >= 14, rewardCosmeticId: 'aura_green' },
  
  { id: 'ach_machine', name: 'Máquina de Execução', description: 'Completou 100 tarefas totais e destruiu a procrastinação.', rarity: 'epic', requirement: (p) => p.totalTasksCompleted >= 100, rewardCosmeticId: 'tex_obsidian' },
  { id: 'ach_centurion', name: 'Centurião', description: 'Completou 500 tarefas. Você não é mais operário, é líder do seu destino.', rarity: 'epic', requirement: (p) => p.totalTasksCompleted >= 500, rewardCosmeticId: 'part_glitch' },

  { id: 'ach_titanium', name: 'Metálico', description: 'Sobreviveu à Pyros.', rarity: 'rare', requirement: (p) => p.streak >= 30, rewardCosmeticId: 'tex_titanium' },
  { id: 'ach_athlete', name: 'Atleta Cibernético', description: 'Concluiu 50 treinos corporais. Moldando o prato físico da mente.', rarity: 'epic', requirement: (p) => (p.workoutLogs?.length || 0) >= 50, rewardCosmeticId: 'aura_orange' },
  { id: 'ach_workout_master', name: 'Senhor das Fibras', description: 'Superou 200 treinos intensos.', rarity: 'epic', requirement: (p) => (p.workoutLogs?.length || 0) >= 200, rewardCosmeticId: 'weapon_trident' },
  
  { id: 'ach_shooting_stars', name: 'Meteoritos', description: 'Atingiu a órbita de Aetheria.', rarity: 'rare', requirement: (p) => p.streak >= 7, rewardCosmeticId: 'part_shooting_stars' },
  { id: 'ach_mogul', name: 'Magnata', description: 'Realizou 30 registros de finanças. Domínio sobre matéria e valor.', rarity: 'rare', requirement: (p) => (p.financeLogs?.length || 0) >= 30, rewardCosmeticId: 'part_stardust' },
  { id: 'ach_billionaire', name: 'Barão Digital', description: 'Total de 100 registros de patrimônio. Controle absoluto.', rarity: 'legendary', requirement: (p) => (p.financeLogs?.length || 0) >= 100, rewardCosmeticId: 'halo_angelic' },
  
  { id: 'ach_combat_eye', name: 'Modo Ameaça', description: 'Alcançou poder de 10 mil Evolux.', rarity: 'rare', requirement: (p) => calculateEvoluxScore(p.streak, p.xp, p.totalTasksCompleted) >= 10000, rewardCosmeticId: 'eye_red' },
  { id: 'ach_archivist', name: 'Arquivista Cósmico', description: 'Você manteve os dados afiados por 200 tarefas completadas.', rarity: 'epic', requirement: (p) => p.totalTasksCompleted >= 200, rewardCosmeticId: 'eye_purple' },
  
  { id: 'ach_scythe', name: 'Ameaça Fria', description: 'Você desbloqueou Glacius em 14 dias.', rarity: 'rare', requirement: (p) => p.streak >= 14, rewardCosmeticId: 'weapon_scythe' },
  { id: 'ach_chaos', name: 'Domínio do Caos', description: 'Você ultrapassou Lumina e a tempestade de 60 dias.', rarity: 'epic', requirement: (p) => p.streak >= 60, rewardCosmeticId: 'halo_chaos' },

  { id: 'ach_invincible', name: 'Invencível', description: 'Manteve 100 dias de Streak sem misericórdia. O topo e a base são seus.', rarity: 'legendary', requirement: (p) => p.streak >= 100, rewardCosmeticId: 'aura_red_black' },
  { id: 'ach_shadow', name: 'Sombra Constante', description: '200 dias de Streak incansável.', rarity: 'legendary', requirement: (p) => p.streak >= 200 },
  { id: 'ach_ascension', name: 'Divindade em Ascensão', description: 'Alcançou Nível 5 do perfil.', rarity: 'epic', requirement: (p) => calculateAvatarLevel(p.streak) >= 5, rewardCosmeticId: 'halo_plasma' },
  { id: 'ach_devourer', name: 'Devorador de Hábitos', description: 'Eliminou 1000 tarefas da lista de obstáculos.', rarity: 'legendary', requirement: (p) => p.totalTasksCompleted >= 1000, rewardCosmeticId: 'weapon_blade' },
  { id: 'ach_supernova', name: 'Supernova', description: 'Ganho absoluto. Você tocou mais de 50 mil XP.', rarity: 'legendary', requirement: (p) => p.xp >= 50000, rewardCosmeticId: 'halo_void' },
  { id: 'ach_ego_death', name: 'A Morte do Ego', description: '1 Ano de evolução ininterrupta. 365 dias. A forma antiga evaporou.', rarity: 'legendary', requirement: (p) => p.streak >= 365, rewardCosmeticId: 'eye_gold' },
  { id: 'ach_infinite', name: 'Legado Infinite', description: 'Você faz parte da elite da Evolux.', rarity: 'legendary', requirement: (p) => p.plan === 'infinite', rewardCosmeticId: 'aura_infinite' }
];

// ---------------------------
// 3. PLANET MISSIONS (MAIN PROGRESSION)
// ---------------------------
// A extrema dificuldade é o balizador aqui. Sem recompensa fácil.
export const PLANET_MISSIONS: PlanetMissionDef[] = [
  { id: 'pl_1', level: 1, name: 'Glacius', streakReq: 3, color: '#00ccff', size: 5, atmosphere: 'Gelo Azul. Vento cortante.', phrase: 'A disciplina cristaliza a mente.' },
  { id: 'pl_2', level: 2, name: 'Aetheria', streakReq: 7, color: '#00ffd5', size: 7, atmosphere: 'Energia primária fluindo.', phrase: 'Sua base está sólida como rocha viva.' },
  { id: 'pl_3', level: 3, name: 'Kyber', streakReq: 14, color: '#0033ff', size: 9, atmosphere: 'Energia tecnológica azul imersiva.', phrase: 'Sua mente virou uma máquina de execução.' },
  { id: 'pl_4', level: 4, name: 'Zephyr', streakReq: 21, color: '#805ad5', size: 10, atmosphere: 'Tempestades iônicas radiantes.', phrase: 'Ventos de mudança absolutos.' },
  { id: 'pl_5', level: 5, name: 'Pyros', streakReq: 30, color: '#ff4500', size: 12, atmosphere: 'Lava vulcânica e calor extremo.', phrase: 'A pressão que queima as desculpas.' },
  { id: 'pl_6', level: 6, name: 'Centauri', streakReq: 45, color: '#e53e3e', size: 14, atmosphere: 'Chuva de plasma constante.', phrase: 'Temperando o aço pelo conflito.' },
  { id: 'pl_7', level: 7, name: 'Lumina', streakReq: 60, color: '#ffcc00', size: 16, atmosphere: 'Energia dourada divina.', phrase: 'Sua luz cega a procrastinação.' },
  { id: 'pl_8', level: 8, name: 'Nexus Prime', streakReq: 90, color: '#bb00ff', size: 18, atmosphere: 'Mar de gravidade e neon púrpura.', phrase: 'Controle absoluto do espaço e tempo.' },
  { id: 'pl_9', level: 9, name: 'Astralis', streakReq: 120, color: '#00f0ff', size: 21, atmosphere: 'Pura malha digital e dados luminosos.', phrase: 'Seu legado está gravado nas estrelas.' },
  { id: 'pl_10', level: 10, name: 'Oblivion', streakReq: 180, color: '#ff0055', size: 25, atmosphere: 'Gravidade esmagadora, colapso atômico.', phrase: 'Onde o antigo "você" foi desintegrado.' },
  { id: 'pl_11', level: 11, name: 'Infinitus', streakReq: 365, color: '#ffffff', size: 30, atmosphere: 'A própria estrela. Singularidade.', phrase: 'A morte do ego e o renascimento supremo.' },
];

export const getUnlockedPlanets = (streak: number) => {
  return PLANET_MISSIONS.filter(p => streak >= p.streakReq);
};

export const calculatePlanets = (streak: number) => {
  return getUnlockedPlanets(streak).length;
};

export const calculateAvatarLevel = (xp: number) => {
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
};

// IA Defined weights for balanced ranking
export const calculateEvoluxScore = (streak: number = 0, xp: number = 0, tasksCompleted: number = 0) => {
  const streakScore = (streak || 0) * 50; 
  const xpScore = (xp || 0);
  const taskScore = (tasksCompleted || 0) * 10;
  return streakScore + xpScore + taskScore;
};

// ---------------------------
// 4. RANK TIERS
// ---------------------------
export function getRankTier(level: number) {
  if (level === 0) return { name: 'Base', color: 'text-text-secondary', frame: 'frame-bronze' };
  if (level < 3) return { name: 'Desperto', color: 'text-neon-blue', frame: 'frame-bronze' };
  if (level < 6) return { name: 'Constante', color: 'text-emerald-400', frame: 'frame-silver' };
  if (level < 10) return { name: 'Focus', color: 'text-neon-purple', frame: 'frame-gold' };
  if (level < 15) return { name: 'Artífice', color: 'text-neon-pink', frame: 'frame-diamond' };
  if (level < 25) return { name: 'Executor', color: 'text-orange-500', frame: 'frame-diamond' };
  if (level < 40) return { name: 'Dominante', color: 'text-red-500', frame: 'frame-cosmic' };
  return { name: 'Transcendente', color: 'text-amber-500', frame: 'frame-transcendent' };
}

export function getPlanetTextureStyle(planetName: string): any {
  if (planetName === 'Glacius' || planetName === 'Oblivion') {
     return { background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 50%), repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 5px)' };
  } else if (planetName === 'Pyros' || planetName === 'Centauri') {
     return { background: 'radial-gradient(circle at 70% 70%, #000 0%, transparent 60%), radial-gradient(circle at 30% 30%, #ffeb3b 0%, transparent 40%)' };
  } else if (planetName === 'Kyber' || planetName === 'Astralis') {
     return { background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 255, 255, 0.4) 100%), linear-gradient(0deg, rgba(0,255,255,0.1) 50%, transparent 50%)', backgroundSize: '100% 4px' };
  } else if (planetName === 'Lumina' || planetName === 'Infinitus') {
     return { background: 'radial-gradient(circle at 50% 50%, #fff 10%, transparent 60%)' };
  } else {
     return { background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6) 0%, transparent 60%)' };
  }
}

export function getRankFrameStyle(frame: string) {
  switch(frame) {
    case 'frame-bronze': return { borderColor: '#cd7f32', boxShadow: '0 0 5px rgba(205,127,50,0.5)', background: 'linear-gradient(45deg, #cd7f32 0%, #8b4513 100%)' };
    case 'frame-silver': return { borderColor: '#c0c0c0', boxShadow: '0 0 10px rgba(192,192,192,0.8)', background: 'linear-gradient(45deg, #c0c0c0 0%, #708090 100%)' };
    case 'frame-gold': return { borderColor: '#ffd700', boxShadow: '0 0 15px rgba(255,215,0,0.8)', background: 'linear-gradient(45deg, #ffd700 0%, #daa520 100%)' };
    case 'frame-diamond': return { borderColor: '#00ffff', boxShadow: '0 0 20px rgba(0,255,255,0.8)', background: 'linear-gradient(45deg, #00ffff 0%, #00bfff 100%)' };
    case 'frame-cosmic': return { borderColor: '#9d00ff', boxShadow: '0 0 25px rgba(157,0,255,1)', background: 'linear-gradient(45deg, #9d00ff 0%, #ff0055 100%)' };
    case 'frame-transcendent': return { borderColor: '#ffffff', boxShadow: '0 0 30px rgba(255,255,255,1), 0 0 10px #ffb700 inset', background: 'linear-gradient(45deg, #ffffff 0%, #ffb700 100%)' };
    default: return { borderColor: '#333' };
  }
}
