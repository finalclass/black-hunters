import "phaser";

export class SwordSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "images", 2896);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    updatePosition(position: Phaser.Math.Vector2, pointer: Phaser.Input.Pointer | null) {
        if (!pointer) {
            return;
        }
        const sub = position.clone().subtract(pointer.position);
        const angle = sub.angle() + Math.PI;
        const x = 32 * Math.cos(angle);
        const y = 32 * Math.sin(angle);
        this.body.position.set(position.x + x, position.y + y);
        this.rotation = 5 * Math.PI / 4 + angle;
    }
};
