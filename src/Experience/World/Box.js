import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Box
{
    constructor(scale,posx)
    {
        //Variables
        this.scale = scale
        this.posx = posx


        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('box')
        }

        // Resource
        this.resource = this.resources.items.boxModel
        
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        console.log(`I am ${this.scale}. Thank you creator`)
        this.model.scale.set(this.scale, this.scale, this.scale)
        this.scene.add(this.model)

        this.model.position.x = this.posx
        this.model.position.y = this.scale/2
        

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

}