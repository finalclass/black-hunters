import "phaser";
import { SwordHitSprite } from "./sword-hit-sprite";

export class SwordSprite extends Phaser.Physics.Arcade.Sprite {

    swordHitSprite: SwordHitSprite;

    hasHit: boolean;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "images", 2896);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.swordHitSprite = new SwordHitSprite(this.scene);
        this.hasHit = false;
    }

    hit() {
        this.hasHit = true;
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
        this.swordHitSprite.update();
        if (this.hasHit) {
            this.swordHitSprite.body.position.set(this.body.position.x, this.body.position.y);
            this.swordHitSprite.visible = true;
            this.hasHit = false;
            setTimeout(() => this.swordHitSprite.visible = false, 100);
        }
    }
};
