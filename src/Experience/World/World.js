import Experience from '../Experience.js'
import Camera from '../Camera.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import IMOS from './IMOS.js'
import * as THREE from 'three'


export default class World
{

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.resources = this.experience.resources
        this.allobj = [
        ];

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()

              
            //Create Model (Loaded without Add - For Each?)
            const imos1 = new IMOS('openUnit',50,0)
            //const WDDH90224 = new IMOS('imos',50,0)
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2) 
            this.allobj.push(imos2);
            
            //console.log(this.allobj)

            const scene1 = this.scene
            const allobj = this.allobj

            
            //Track buttons
            document.getElementById('OP600').onclick = function() {clicked(this,imos1,scene1,allobj)};
            document.getElementById('WDDH90224').onclick = function() {clicked(this,imos1,scene1,allobj)};

            // // //Labels
            // const tempV = new THREE.Vector3();
        
            //  // get the position of the center of the cube
            // this.allobj[0].model.updateWorldMatrix(true, false);
            // this.allobj[0].model.getWorldPosition(tempV);
            // // get the normalized screen coordinate of that position
            // // x and y will be in the -1 to +1 range with x = -1 being
            // // on the left and y = -1 being on the bottom
            // tempV.project(this.experience.camera.instance);
            // // convert the normalized position to CSS coordinates
            // const x = (tempV.x *  .5 + .5) * this.experience.canvas.clientWidth;
            // const y = (tempV.y * -.5 + .5) * this.experience.canvas.clientHeight;
            
            // // move the elem to that position
            // const elem = document.querySelector('#labels');
            // elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
            

            //Box Highlight
            // const box = new THREE.BoxHelper( imos2, 0xffff00 );
            // this.scene.add( box );
            
            this.environment = new Environment()
            
        })

        //When button clicked
        function clicked (obj,imos,scene,allobj)
        {
            //Get ID
            var id = obj.id;
            console.log(id)
            //Clone & Add to scene
            var model1  = imos.model.clone(true);
            scene.add(model1)
            //Get last object in array
            let lastElement = allobj[allobj.length - 1];
            //Get new model size info
            const box = new THREE.Box3().setFromObject( model1 );
            const size = box.getSize( new THREE.Vector3() );
            //Position model to last object + new model width
            model1.position.x = lastElement.position.x + size.x;    
            //Add to array
            allobj.push(model1);
        }

    
    }
}