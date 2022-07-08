import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Door90Slab
{
    constructor(name,scale)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        //Variables
        this.scale = scale
        this.name = name

        //Get Sources (All loaded)
        const sources = this.experience.resources.sources

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }


        //Get model details from sources
        var model = sources.find(modelname => modelname.name === this.name);

        //this.resource = this.resources.items.WDDH90224

        //Load model into resources
        const { [model.name]: modelobj } = this.resources.items;
        this.resource = modelobj
        
        // Resource
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        //Set Scale
        this.model.scale.set(this.scale, this.scale, this.scale)
        
        this.model.position.y = 7;
        

        //Log Size
        // let measure = new THREE.Vector3();
        // let box2 = box.getSize(measure);
        // console.log( measure );
        
        //Add to scene
        //this.scene.add(this.model)


        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

}