//Terrain.remove({});

var
    //// Used to seamlessly join sections.
    eastEdges  = {}
  , northEdges = {}

    //// Used by `getTerrainType()` to quickly identify which terrain-type to return.
  , xTerrainExtentMinus1 = config.xTerrainExtent - 1
  , zTerrainExtentMinus1 = config.zTerrainExtent - 1
  , xTerrainExtentMinus2 = config.xTerrainExtent - 2
  , zTerrainExtentMinus2 = config.zTerrainExtent - 2
  , xTerrainExtentMid  = Math.floor( config.xTerrainExtent / 2 )
  , zTerrainExtentMid  = Math.floor( config.zTerrainExtent / 2 )


    //// Returns an object which can be used to generates a semi-random terrain section, which varies depending on its location.
  , getTerrainType = function (x, z) {

        //// The extreme edges of the terrain are impassable tall mountains.
        if (0 === x || 0 === z || xTerrainExtentMinus1 === x || zTerrainExtentMinus1 === z) {
            return {
                height: function () { return Math.floor( Math.random() * 35 ) + 10; }
              , colors: [ 'red','orange','brown' ]
            }
        }

        //// Sections of the terrain next to the tall mountains are foothills.
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

    //// Generates a semi-random section of terrain.
    //// Returns an object containing:
    ////     1. A random color
    ////     2. An array of heights along the section's North edge
    ////     3. An array of heights along the section's East edge
    ////     4. A string of suitable for the `height` attribute of an <ElevationGrid> element:
    ////       - The first number is the elevation of the South-West corner, eg (-2, *, -2)
    ////       - The second number is for the adjacent point on the Westernmost edge, eg (-1, *, -2)
    ////       - After the North-West corner has been reached, eg (2, *, -2), the next number is one-place Easterly of the South-West corner, eg (-2, *, -1)
  , randomSection = function (westEdge, southEdge, terrainType) {
        var x, z, h
          , out = {
                color:     terrainType.colors[ Math.floor( Math.random() * terrainType.colors.length ) ]
              , height:    ''
              , northEdge: []
              , eastEdge:  []
            }
          , southEdge = southEdge || (function () {
                for (var o=[], z=0; z<config.zSectionExtent; z++) {
                    if ( westEdge && 0 === z) {
                        o.push(westEdge[0]);
                    } else {
                        o.push( terrainType.height() );
                    }
                };
                return o;
            }())
          , westEdge = westEdge || (function () { 
                for (var o=[], x=0; x<config.xSectionExtent; x++) {
                    o.push( terrainType.height() );
                };
                return o;
            }())
        ;

        //// Step through the section, starting in the South-West corner, proceeding along the Westernmost edge, and ending at the North-East corner.
        for (z=0; z<config.zSectionExtentPlus1; z++) {
            for (x=0; x<config.xSectionExtentPlus1; x++) {

                //// If we are on the South or West edges, use the height passed in by the caller, so that this section joins smoothly to the previous. Otherwise, generate a semi-random height.
                if (0 === x) {
                    h = southEdge[z] || 0; // @todo investigate why `southEdge[z]` is sometimes `undefined` for sections on the edge of the terrain
                } else if (0 === z) {
                    h = westEdge[x] || 0; // @todo investigate why `westEdge[x]` is sometimes `undefined` for sections on the edge of the terrain
                } else {
                    h = terrainType.height();
                }

                //// If we are on the North or East edges, make a record of the height which can be passed to a later `randomSection()` call.
                if (config.xSectionExtent === x) {
                    out.northEdge.push(h);
                }
                if (config.zSectionExtent === z) {
                    out.eastEdge.push(h);
                }

                //// Append to the string which will become the `height` attribute of an <ElevationGrid> element.
                out.height += h + ' ';
            }
        }

        //// Trim the trailing space from the height string, and return the finished section.
        out.height = out.height.slice(0, -1);
        return out;
    }


    //// Generates a set of terrain sections, and records them into the `Terrain` collection.
  , randomTerrain = function () {
        var x, z
          , xTerrainExtentMinus = config.xTerrainExtent - 1
          , zTerrainExtentMinus = config.zTerrainExtent - 1
        ;

        //// Step through the terrain, starting in the South-West corner, proceeding along the Westernmost edge, and ending at the North-East corner.
        for (z=0; z<config.zTerrainExtent; z++) {
            for (x=0; x<config.xTerrainExtent; x++) {
                var section
                  , westEdge  = false
                  , southEdge = false
                ;

                //// Grab the cached edge-heights from the adjacent Southerly and Westerly sections, unless we are on the South or West edges.
                if (0 !== z) {
                    westEdge = eastEdges[ x + ' ' + (z-1) ];
                    delete eastEdges[ x + ' ' + (z-1) ];
                }
                if (0 !== x) {
                    southEdge = northEdges[ (x-1) + ' ' + z ];
                    delete northEdges[ (x-1) + ' ' + z ];
                }

                //// Generate a random section.
                section = randomSection( westEdge, southEdge, getTerrainType(x, z) );

                //// Record the edge-heights ready for the adjacent Northerly and Easterly sections, unless we are on the North or East edges.
                if (xTerrainExtentMinus !== x) {
                    northEdges[x + ' ' + z] = section.northEdge;
                }
                if (zTerrainExtentMinus !== z) {
                    eastEdges[x + ' ' + z]  = section.eastEdge;
                }

                //// Record the section to the `Terrain` collection.
                Terrain.insert({
                    x:      x * config.xSectionExtent
                  , z:      z * config.zSectionExtent
                  , color:  section.color
                  , height: section.height
                });
            }
        }
    }
;

//// The first time the app starts, generate initial terrain into the DB.
if ( 0 !== Terrain.find().count() ) {
    console.log( Terrain.find().count() );
} else {
    console.log('Terrain empty...');
    randomTerrain();
}
 