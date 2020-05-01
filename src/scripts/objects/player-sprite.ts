import "phaser";
import { SwordSprite } from "./sword-sprite"

const VELOCITY = 200;

interface ActionConfig {
    when: Array<Phaser.Input.Keyboard.Key>;
    anim: 'scolar-walk-up'|'scolar-walk-right'|'scolar-walk-down'|'scolar-walk-left'|
        'scolar-stand-up'|'scolar-stand-right'|'scolar-stand-down'|'scolar-stand-left';
    facing: 'up'|'down'|'left'|'right';
    velocityX: number,
    velocityY: number
}

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {

    UpKey: Phaser.Input.Keyboard.Key;
    DownKey: Phaser.Input.Keyboard.Key;
    LeftKey: Phaser.Input.Keyboard.Key;
    RightKey: Phaser.Input.Keyboard.Key;
    body: Phaser.Physics.Arcade.Body;

    facing:'up'|'down'|'left'|'right' = 'down';

    sword: SwordSprite;
    mousePointer: Phaser.Input.Pointer | null;

    actionConfigs: ActionConfig[]

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x * 32, y * 32, 'scolar', 0);
        this.setScale(0.2);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.UpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.DownKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.LeftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.RightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
            return this.mousePointer = p;
        });

        this.scene.input.on('pointerdown', () => {
            this.sword.hit();
        });
        this.updateAnimation = this.updateAnimation.bind(this);
        
        this.DownKey.on('down', this.updateAnimation).on('up', this.updateAnimation);
        this.UpKey.on('down', this.updateAnimation).on('up', this.updateAnimation);
        this.LeftKey.on('down', this.updateAnimation).on('up', this.updateAnimation);
        this.RightKey.on('down', this.updateAnimation).on('up', this.updateAnimation);
        
        this.sword = new SwordSprite(scene);
        
        const velocitySqrt = Math.sqrt(VELOCITY * VELOCITY / 2);
        this.actionConfigs = [
            {
                when: [this.UpKey],
                anim: 'scolar-walk-up',
                facing: 'up',
                velocityY: -VELOCITY,
                velocityX: 0
            },
            {
                when: [this.UpKey, this.RightKey],
                anim: 'scolar-walk-up',
                facing: 'up',
                velocityY: -velocitySqrt,
                velocityX: velocitySqrt
            },
            {
                when: [this.RightKey],
                anim: 'scolar-walk-right',
                facing: 'right',
                velocityY: 0,
                velocityX: VELOCITY
            },
            {
                when: [this.RightKey, this.DownKey],
                anim: 'scolar-walk-right',
                facing: 'right',
                velocityY: velocitySqrt,
                velocityX: velocitySqrt
            },
            {
                when: [this.DownKey],
                anim: 'scolar-walk-down',
                facing: 'down',
                velocityY: VELOCITY,
                velocityX: 0
            },
            {
                when: [this.LeftKey, this.DownKey],
                anim: 'scolar-walk-left',
                facing: 'left',
                velocityY: velocitySqrt,
                velocityX: -velocitySqrt
            },
            {
                when: [this.LeftKey],
                anim: 'scolar-walk-left',
                facing: 'left',
                velocityY: 0,
                velocityX: -VELOCITY
            },
            {
                when: [this.LeftKey, this.UpKey],
                anim: 'scolar-walk-left',
                facing: 'left',
                velocityY: -velocitySqrt,
                velocityX: -velocitySqrt
            }
        ];
    }

    getActionConfig() : ActionConfig|undefined {
        return this.actionConfigs
            .filter(cfg => cfg.when.every(key => key.isDown))
            .sort((a, b) => b.when.length - a.when.length)[0];
    }

    updateAnimation() {
        const actionConfig = this.getActionConfig();

        if (actionConfig) {
            this.facing = actionConfig.facing;
            this.play(actionConfig.anim);
        } else {
            if (this.facing === 'up') {
                this.play('scolar-stand-up');
            } else if (this.facing === 'right') {
                this.play('scolar-stand-right');
            } else if (this.facing === 'left') {
                this.play('scolar-stand-left');
            } else {
                this.play('scolar-stand-down');
            }
        }
    }

    update() {
        const actionConfig = this.getActionConfig();

        if (actionConfig) {
            this.body.setVelocity(actionConfig.velocityX, actionConfig.velocityY);
        } else {
            this.body.setVelocity(0, 0);
        }
        
        this.sword.updatePosition(this.body.position, this.mousePointer);
    }
    
};
