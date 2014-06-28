Terrain.remove({});

//// The first time the app starts, generate initial terrain into the DB.
if ( 0 !== Terrain.find().count() ) {
    console.log( Terrain.find().count() );
} else {
    console.log('Terrain empty!', config.terrain.width);
    var x, z
      , gridLut = {} // used to seamlessly join sections
      , randomGrid = function () {
            var i
              , out = []
              , squareCount = config.section.width * config.section.length;
            ;
            for (i=0; i<squareCount; i++) {
               out.push(  Math.floor( Math.random() * 10 )  ); // random integer from 0 to 9
                // out.push(i); // random integer from 0 to 9
            }
            return out.join(' ');
        }
      , randomColor = function () {
            var colors = [
                'red'
              , 'orange'
              , 'yellow'
              , 'green'
              , 'cyan'
              , 'blue'
              , 'magenta'
              , 'pink'
              , 'white'
              , 'black'
            ];
            return colors[ Math.floor( Math.random() * 10 ) ];
        }
    ;
    for (x=0; x<config.terrain.width; x++) {
        for (z=0; z<config.terrain.length; z++) {
            var grid = randomGrid();
            var doc = {
                x:     x * config.section.width
              , z:     z * config.section.length
              , color: randomColor()
              , grid:  grid
            }
            if (0 !== x) {
                console.log(x, z, 'needs edge of', x-1, z);
            }
            if (0 !== z) {
                console.log(x, z, 'needs edge of', x, z-1);
            }
            gridLut[x + ' ' + z] = grid;
            Terrain.insert(doc);
            console.log(gridLut);
        }
    }
}
