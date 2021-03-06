import Phaser from "phaser";
import { PlayerScore } from "../RegistryKeys";

const textOptions = {
    font: "32px Arial"
};

export default class HudScene extends Phaser.Scene {
    public static key = "hud-scene";
    
    private RedScore: Phaser.GameObjects.Text;
    private BlueScore: Phaser.GameObjects.Text;
    
    constructor () {
        super({key: "hud", active: true})
    }
    
    public create() {
        this.BlueScore = this.add.text(10, 10, "0", textOptions);
        this.RedScore = this.add.text(
            this.cameras.main.width - 42,
            this.cameras.main.height - 42,
            "0", 
            textOptions
        );
            
            this.registry.events.on(Phaser.Data.Events.CHANGE_DATA, this.updateScores, this);
        }
        
        updateScores(_, key: string, data: number) {
            console.log(key, data);
            switch (key) {
                case PlayerScore("red"):
                    this.RedScore.setText(data.toString());    
                    break;
                
                case PlayerScore("blue"):
                    this.BlueScore.setText(data.toString());
                    break;
                default:
                    break;
            }
        }
        
    }