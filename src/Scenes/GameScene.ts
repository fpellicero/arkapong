import Phaser from "phaser";
import Paddle from "../Prefabs/Paddle";
import Ball from "../Prefabs/Ball";
import BaseRectangle from "../Prefabs/Blocks/BaseRectangle";
import Rectangles from "../Prefabs/Blocks";
import withProgressBar from "../Enhancers/withProgressBar";
import PaddleBallCollision from "../Mechanics/PaddleBallCollision";

@withProgressBar
export default class GameScene extends Phaser.Scene {

    private Player1: Paddle;
    private Player2: Paddle;
    private Ball: Ball;

    public preload() {        
        Paddle.Preload(this);
        Ball.Preload(this);
        Rectangles.forEach((rectangle) => rectangle.Preload(this));
        BaseRectangle.Preload(this);
    }

    public create() {
        const centerX = parseInt(this.game.config.width as string)/2;
        const paddleY = parseInt(this.game.config.height as string) - 50;

        this.Player1 = new Paddle(this, centerX, paddleY);
        this.Player2 = new Paddle(this, centerX, 50, {type: "blue"/*, autoPlay: true*/});

        this.Ball = new Ball(this, centerX, paddleY + 100);

        this.physics.add.collider(this.Player1, this.Ball, PaddleBallCollision);
        this.physics.add.collider(this.Player2, this.Ball, PaddleBallCollision);

        this.generateRectangles();
    }

    public update(time: number, delta: number) {
        this.Player1.update(delta);
        this.Player2.update(delta);
    }

    private generateRectangles() {
        const rows = 10;
        const blocksPerRow = 12;

        const blockSize = {
            width: 64,
            height: 32
        }

        const initialPoint = {
            x: 0,
            y: this.cameras.main.height / 2 - (rows * blockSize.height / 2)
        }

        const rectangles: BaseRectangle[] = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < blocksPerRow; j++) {
                const x = blockSize.width / 2 + blockSize.width * j;
                const y = blockSize.height / 2 + blockSize.height * i;

                const rectangle = Rectangles[Math.floor(Math.random() * Rectangles.length)];
                rectangles.push(new rectangle(this, initialPoint.x + x, initialPoint.y + y));
                
            }
        }

        rectangles.forEach((rectangle) => {
            this.physics.add.collider(this.Ball, rectangle, this.onBallCollision);
        })
    }

    onBallCollision(Ball: Ball, rectangle: BaseRectangle) {
        rectangle.destroy();
    }
}