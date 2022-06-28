import * as THREE from 'three'
import Experience from '../Experience.js'

export default class IMOS
{
    constructor(name,scale,posx)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        //Variables
        this.scale = scale
        this.posx = posx

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        // Resource
        this.resource = this.resources.items.openUnit

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        //Set Scale
        this.model.scale.set(this.scale, this.scale, this.scale)
        
        //Axes Helper
        const axesHelper = new THREE.AxesHelper(200)
        this.scene.add(axesHelper)

        //Center Object
        const box = new THREE.Box3().setFromObject( this.model );
        const center = box.getCenter( new THREE.Vector3() );
        this.model.position.x += ( this.model.position.x - center.x );
        this.model.position.y = 7;
        this.model.position.z += ( this.model.position.z - center.z );

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