import Experience from '../Experience.js'
import Camera from '../Camera.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import IMOS from './IMOS.js'
import WDDH90224 from './WDDH90224.js'
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
        this.posright = [
        ];
        this.posleft = null

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()

             //Axes Helper
            const axesHelper = new THREE.AxesHelper(200)
            this.scene.add(axesHelper)
            

              
            //Create Model (Loaded without Add - For Each?)
            const imos1 = new IMOS('openUnit',50,0)
            const unit90 = new WDDH90224('WDDH90224',50,0)
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2) 
            var bbox1 = new THREE.Box3().setFromObject(imos2);
            const bboxsize1 = bbox1.getSize( new THREE.Vector3() );

            this.posright.push(this.posright + (bboxsize1.x/2));
            this.allobj.push(imos2);
            
            //console.log(this.allobj)

            const scene1 = this.scene
            const allobj = this.allobj
            const posright = this.posright
            const posleft = this.posleft

            
            //Track buttons
            document.getElementById('OP600').onclick = function() {clicked(this,imos1,scene1,allobj,posright,posleft)};
            document.getElementById('WDDH90224').onclick = function() {clicked(this,unit90,scene1,allobj,posright,posleft)};

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
            

            
            
            this.environment = new Environment()
            
        })

        //When button clicked
        function clicked (obj,imos,scene,allobj,posright,posleft)
        {    
;
   
            const reducer = (accumulator, curr) => accumulator + curr;
             total = (posright.reduce(reducer));

            //Get ID
            var id = obj.id;
            console.log(id)
            //Clone & Add to scene
            var model1  = imos.model.clone(true);
            scene.add(model1)
            //Get last object in array (Size & Position)
            const lastElement = allobj[allobj.length - 1];
            const lastbox = new THREE.Box3().setFromObject( lastElement );
            const lastsize = lastbox.getSize( new THREE.Vector3() );
            const lastcenter = lastbox.getCenter( new THREE.Vector3() );

            var target = new THREE.Vector3(); // create once an reuse it
            lastElement.getWorldPosition( target );
            console.log(target)
            
            

            //Current model size
            var bbox = new THREE.Box3().setFromObject(model1);
            const bboxsize = bbox.getSize( new THREE.Vector3() );

            var diff = bboxsize.x - lastsize.x
            var half = bboxsize.x/2
            var move = half + diff
            console.log("posright 1 = " + total)
           

            model1.position.x = model1.position.x + 14 + half;    
            allobj.push(model1);


          

            //Box Highlight
            // const box = new THREE.BoxHelper( model1, 0xffff00 );
            // scene.add( box );
            //Add to array

        }

    
    }
}