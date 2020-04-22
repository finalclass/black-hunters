import "phaser"
import MainScene from "../scenes/main-scene"

const DEFAULT_WIDTH = window.innerWidth * window.devicePixelRatio;
const DEFAULT_HEIGHT =  window.innerHeight * window.devicePixelRatio

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#ffffff",
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}
