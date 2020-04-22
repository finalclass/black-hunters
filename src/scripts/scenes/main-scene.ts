import "phaser"
import { PlayerSprite } from "../objects/player-sprite";

export default class MainScene extends Phaser.Scene {

    player: PlayerSprite;
    background: Phaser.GameObjects.TileSprite;
    walls: Phaser.Physics.Arcade.StaticGroup;
    level: integer[][];
    
    constructor() {
        super({ key: "MainScene" });

        this.level = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        
    }

    preload() {
        this.load.spritesheet("images", "/assets/img/ProjectUtumno_full.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        const { width, height } = this.cameras.main;
        
        this.background = this.add.tileSprite(0, 0, width, height, "images", 219)
        this.background.setOrigin(0, 0);

        // this.player = new PlayerSprite(this, );

        this.walls = this.physics.add.staticGroup();
        this.level.forEach((row, x) => {
            row.forEach((value, y) => {
                if (value === 1) {
                    this.walls.create(x * 32, y * 32, "images", 266);
                }
                if (value === 2) {
                    this.player = new PlayerSprite(this, x, y);
                }
            });
        });

        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.player.update();
    }
}
