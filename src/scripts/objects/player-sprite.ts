import "phaser";
import { SwordSprite } from "./sword-sprite"

const VELOCITY = 200;

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {

    UpKey: Phaser.Input.Keyboard.Key;
    DownKey: Phaser.Input.Keyboard.Key;
    LeftKey: Phaser.Input.Keyboard.Key;
    RightKey: Phaser.Input.Keyboard.Key;
    body: Phaser.Physics.Arcade.Body;

    sword: SwordSprite;
    mousePointer: Phaser.Input.Pointer | null;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x * 32, y * 32, 'images', 3806);

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
        
        this.sword = new SwordSprite(scene);
    }

    update() {
        // if both keys are pressed, lower the velocity
        const velocity = (this.UpKey.isDown || this.DownKey.isDown) && (this.LeftKey.isDown || this.RightKey.isDown)
            ? Math.sqrt(VELOCITY * VELOCITY / 2)
            : VELOCITY;
         
        if (this.UpKey.isDown) {
            this.body.setVelocityY(-velocity);
        } else if (this.DownKey.isDown) {
            this.body.setVelocityY(velocity);
        } else {
            this.body.setVelocityY(0);
        }

        if (this.LeftKey.isDown) {
            this.body.setVelocityX(-velocity);
        } else if (this.RightKey.isDown) {
            this.body.setVelocityX(velocity);
        } else {
            this.body.setVelocityX(0);
        }

        this.sword.updatePosition(this.body.position, this.mousePointer);
    }
    
};
