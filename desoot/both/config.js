config = {
    xSectionExtent: 8 // number of grid-squares (meters) from the Northmost to the Southmost edges of a terrain-section
  , zSectionExtent: 8 // number of grid-squares (meters) from the Eastmost to the Westmost edges of a terrain-section
  , xTerrainExtent: 8 // number of sections from the Northmost to the Southmost edges of the terrain
  , zTerrainExtent: 8 // number of sections from the Eastmost to the Westmost edges of the terrain

  , guides: true // whether to show guides (useful for develoopment)
}


//// Autogenerate some configs to simplify rendering the terrain.
config.xSectionExtentPlus1 = config.xSectionExtent + 1;
config.zSectionExtentPlus1 = config.zSectionExtent + 1;
