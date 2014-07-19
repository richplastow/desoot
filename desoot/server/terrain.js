// Terrain.remove({});

var
    //// Used to seamlessly join tiles.
    southEdges  = {}
  , eastEdges = {}

    //// Used by `getTerrainType()` to quickly identify which terrain-type to return.
  , xTerrainExtentMinus1 = config.xTerrainExtent - 1
  , zTerrainExtentMinus1 = config.zTerrainExtent - 1
  , xTerrainExtentMinus2 = config.xTerrainExtent - 2
  , zTerrainExtentMinus2 = config.zTerrainExtent - 2
  , xTerrainExtentMid  = Math.floor( config.xTerrainExtent / 2 )
  , zTerrainExtentMid  = Math.floor( config.zTerrainExtent / 2 )


    //// Returns an object which can be used to generates a semi-random terrain tile, which varies depending on its location.
  , getTerrainType = function (x, z) {

        //// The extreme edges of the terrain are impassable tall mountains.
        if (0 === x || 0 === z || xTerrainExtentMinus1 === x || zTerrainExtentMinus1 === z) {
            return {
                height: function () { return Math.floor( Math.random() * 35 ) + 10; }
              , colors: [ 'red','orange','brown' ]
            }
        }

        //// Terrain tiles next to the tall mountains are foothills.
        if (1 === x || 1 === z || xTerrainExtentMinus2 === x || zTerrainExtentMinus2 === z) {
            return {
                height: function () { return Math.floor( Math.random() * 15 ) + 10; }
              , colors: [ 'orange','yellow','green' ]
            }
        }

        //// The center of the terrain contains a lonely mountain.
        if (xTerrainExtentMid === x && zTerrainExtentMid === z) {
            return {
                height: function () { return Math.floor( Math.random() * 15 ) + 10; }
              , colors: [ 'orange','yellow','green' ]
            }
        }

        //// Anywhere else represents flatlands.
        return {
            height: function () { return Math.floor( Math.random() * 10 ); }
          , colors: [ 'green','cyan','pink' ]
        }

    }

    //// Generates a semi-random terrain tile.
    //// Returns an object containing:
    ////     1. A random color
    ////     2. An array of heights along the tile's North edge
    ////     3. An array of heights along the tile's East edge
    ////     4. A string of suitable for the `height` attribute of an <ElevationGrid> element:
    ////       - The first number is the elevation of the North-West corner, eg (-2, *, -2)
    ////       - The second number is for the adjacent point on the North edge, eg (-1, *, -2)
    ////       - After the North-East corner has been reached, eg (2, *, -2), the next number is one square to the South of the North-West corner, eg (-2, *, -1)
  , randomTile = function (northEdge, westEdge, terrainType) {
        var x, z, h
          , out = {
                color:     terrainType.colors[ Math.floor( Math.random() * terrainType.colors.length ) ]
              , height:    ''
              , eastEdge: []
              , southEdge:  []
            }
          , westEdge = westEdge || (function () {
                for (var o=[], z=0; z<config.zTileExtent; z++) {
                    if ( northEdge && 0 === z) {
                        o.push(northEdge[0]);
                    } else {
                        o.push( terrainType.height() );
                    }
                };
                return o;
            }())
          , northEdge = northEdge || (function () { 
                for (var o=[], x=0; x<config.xTileExtent; x++) {
                    o.push( terrainType.height() );
                };
                return o;
            }())
        ;

        //// Step through the tile, starting in the North-West corner, proceeding along the North edge, and ending at the South-East corner.
        for (z=0; z<config.zTileExtentPlus1; z++) {
            for (x=0; x<config.xTileExtentPlus1; x++) {

                //// If we are on the North or West edges, use the height passed in by the caller, so that this tile joins smoothly to the previous. Otherwise, generate a semi-random height.
                if (0 === x) {
                    h = westEdge[z] || 0; // @todo investigate why `westEdge[z]` is sometimes `undefined` for tiles on the edge of the terrain
                } else if (0 === z) {
                    h = northEdge[x] || 0; // @todo investigate why `northEdge[x]` is sometimes `undefined` for tiles on the edge of the terrain
                } else {
                    h = terrainType.height();
                }

                //// If we are on the South or East edges, make a record of the height which can be passed to a later `randomTile()` call.
                if (config.xTileExtent === x) {
                    out.eastEdge.push(h);
                }
                if (config.zTileExtent === z) {
                    out.southEdge.push(h);
                }

                //// Append to the string which will become the `height` attribute of an <ElevationGrid> element.
                out.height += h + ' ';
            }
        }

        //// Trim the trailing space from the height string, and return the finished tile.
        out.height = out.height.slice(0, -1);
        return out;
    }


    //// Generates a set of terrain tiles, and records them into the `Terrain` collection.
  , randomTerrain = function () {
        var x, z
          , xTerrainExtentMinus = config.xTerrainExtent - 1
          , zTerrainExtentMinus = config.zTerrainExtent - 1
        ;

        //// Step through the terrain, starting in the North-West corner, proceeding along the Westernmost edge, and ending at the South-East corner.
        for (z=0; z<config.zTerrainExtent; z++) {
            for (x=0; x<config.xTerrainExtent; x++) {
                var tile
                  , northEdge  = false
                  , westEdge = false
                ;

                //// Grab the cached edge-heights from the adjacent Northerly and Westerly tiles, unless we are on the North or West edges.
                if (0 !== z) {
                    northEdge = southEdges[ x + ' ' + (z-1) ];
                    delete southEdges[ x + ' ' + (z-1) ];
                }
                if (0 !== x) {
                    westEdge = eastEdges[ (x-1) + ' ' + z ];
                    delete eastEdges[ (x-1) + ' ' + z ];
                }

                //// Generate a random tile.
                tile = randomTile( northEdge, westEdge, getTerrainType(x, z) );

                //// Record the edge-heights ready for the adjacent Southerly and Easterly tiles, unless we are on the South or East edges.
                if (xTerrainExtentMinus !== x) {
                    eastEdges[x + ' ' + z] = tile.eastEdge;
                }
                if (zTerrainExtentMinus !== z) {
                    southEdges[x + ' ' + z]  = tile.southEdge;
                }

                //// Record the tile to the `Terrain` collection.
                Terrain.insert({
                    x:      x * config.xTileExtent
                  , z:      z * config.zTileExtent
                  , color:  tile.color
                  , height: tile.height
                });
            }
        }
    }
;

//// The first time the app starts, generate initial terrain into the DB.
if ( 0 !== Terrain.find().count() ) {
    // console.log( Terrain.find().count() );
} else {
    console.log('Terrain empty...');
    randomTerrain();
}
