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
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ];
        
    }

    preload() {
        this.load.spritesheet("scolar", "/assets/img/scolar.png", {
            frameWidth: 160,
            frameHeight: 160,
        })
        this.load.spritesheet("images", "/assets/img/ProjectUtumno_full.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    createAnimations() {
        const frameRate = 4;
        const repeat = -1
        
        this.anims.create({
            key: "scolar-stand-down",
            frames: this.anims.generateFrameNames('scolar', { start: 0, end: 0 }),
            frameRate, repeat
        })
        
        this.anims.create({
            key: "scolar-walk-down",
            frames: this.anims.generateFrameNames('scolar', { start: 1, end: 2 }),
            frameRate, repeat
        });

        this.anims.create({
            key: "scolar-stand-left",
            frames: this.anims.generateFrameNames('scolar', { start: 3, end: 3 }),
            frameRate, repeat
        });
        
        this.anims.create({
            key: "scolar-walk-left",
            frames: this.anims.generateFrameNames('scolar', { start: 3, end: 4 }),
            frameRate, repeat
        });

        this.anims.create({
            key: "scolar-stand-right",
            frames: this.anims.generateFrameNames('scolar', { start: 5, end: 5 }),
            frameRate, repeat
        });
        
        this.anims.create({
            key: "scolar-walk-right",
            frames: this.anims.generateFrameNames('scolar', { start: 5, end: 6 }),
            frameRate, repeat
        });

        this.anims.create({
            key: "scolar-stand-up",
            frames: this.anims.generateFrameNames('scolar', { start: 7, end: 7 }),
            frameRate, repeat
        });
        
        this.anims.create({
            key: "scolar-walk-up",
            frames: this.anims.generateFrameNames('scolar', { start: 8, end: 9 }),
            frameRate, repeat
        });
    }
    
    create() {
        const { width, height } = this.cameras.main;
        
        this.background = this.add.tileSprite(0, 0, width, height, "images", 219)
        this.background.setOrigin(0, 0);

        this.createAnimations();

        this.walls = this.physics.add.staticGroup();
        this.level.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 1) {
                    this.walls.create(x * 32, y * 32, "images", 266);
                }
                if (value === 2) {
                    this.player = new PlayerSprite(this, x, y);
                }
            });
        });

        this.player.play('scolar-stand-still');
        
        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.player.update();
    }
}
