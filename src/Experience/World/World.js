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
            var imos = new IMOS(10)

            const box1 = new Box('box1',60,80)

            // queen is a mesh
            var box2 = box1.model.clone(true);
            this.scene.add(box2)
            box2.position.x = -10; 
            box2.scale.set(50,50,50)
            
            
            
            this.environment = new Environment()
            
        })
        
        // window.addEventListener('click', () =>
        // {
        //   alert("Test");
        //   this.box = new Box()
        // })
        
    }
}