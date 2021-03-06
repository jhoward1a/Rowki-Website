export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'carpetcolour',
        type: 'texture',
        path: 'textures/carpet/carpet.jpg'
    },
    {
        name: 'carpetnormal',
        type: 'texture',
        path: 'textures/carpet/carpet-normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'boxModel',
        type: 'gltfModel',
        path: 'models/Box/glTF/Box.gltf'
    },
    {
        name: 'openUnit',
        type: 'gltfModel',
        path: 'models/OpenUnit/OpenUnit.gltf'
    },
    {
        name: 'WDDH90224',
        type: 'gltfModel',
        path: 'models/WDDH90224/WDDH90224.gltf',
        size: '900',
        parttype: 'unit',
    },
    {
        name: 'Door90Slab',
        type: 'gltfModel',
        path: 'models/90DSLAB/90DSLAB.gltf',
        size: '900',
        parttype: 'door',
    },
    {
        name: 'Door60Slab',
        type: 'gltfModel',
        path: 'models/60DSLAB/Door60Slab.gltf',
        size: '600',
        parttype: 'door',
    },
    
]