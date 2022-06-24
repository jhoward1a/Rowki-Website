import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Box from './Box.js'
import IMOS from './IMOS.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.imos = new IMOS(50)

            this.fox = new Fox()

            const box1 = new Box(50,80)
            const box2 = new Box(50,0)
            this.environment = new Environment()
            
        })
        
        // window.addEventListener('click', () =>
        // {
        //   alert("Test");
        //   this.box = new Box()
        // })
        
    }
}