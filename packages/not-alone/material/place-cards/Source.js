export const Source = {
  canUsePower: (game) => game.survivalCardsDeck.length > 0 || game.hunted.some(hunted => hunted.willCounters < 3)
}