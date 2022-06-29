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
            const imos1 = new IMOS('imos',50,0)
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2)
            imos2.position.x = imos2.position.x + 30; 
            this.allobj.push(imos2);
            
            //console.log(this.allobj)

            const scene1 = this.scene
            const allobj = this.allobj

            
            //Track buttons
            document.getElementById('OP600').onclick = function() {clicked(imos1,scene1,allobj)};

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
        function clicked (imos,scene,allobj)
        {
            //Get ID

            //Clone & Add to scene (this.id.model.clone(true);)
            var model1  = imos.model.clone(true);
            console.log(model1)
            scene.add(model1)
            //Get last object position
            let lastElement = allobj[allobj.length - 1];
            model1.position.x = lastElement.position.x - 30;    
            allobj.push(model1);
        }

    
        
        // window.addEventListener('click', () =>
        // {
        //   alert("Test");
        //   this.box = new Box()
        // })

        // window.addEventListener("click", myFunction);
        // function myFunction() {
        // document.getElementById("labels");
        // alert(document.getElementById("buttn").value);
        // }
        
    }
}