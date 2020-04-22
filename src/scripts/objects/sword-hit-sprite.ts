import "phaser";

export class SwordHitSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "images", 1495);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.visible = false;
    }
    
}
