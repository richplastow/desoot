//// Based on https://gist.github.com/donpark/1796361
randomNoise = function(canvas, x, y, width, height, alpha) {
    x = x || 0;
    y = y || 0;
    width = width || canvas.width;
    height = height || canvas.height;
    alpha = alpha || 255;
    var g = canvas.getContext('2d'),
        imageData = g.getImageData(x, y, width, height),
        random = Math.random,
        pixels = imageData.data,
        n = pixels.length,
        i = 0,
        r
    ;
    while (i < n) {
        r = ( random() * 250) | 0;
        pixels[i++] = r;
        pixels[i++] = r + (  ( random() * 12 ) | 0  ) - 6;
        pixels[i++] = r + (  ( random() * 12 ) | 0  ) - 6;
        pixels[i++] = alpha;
    }
    g.putImageData(imageData, x, y);
    return canvas;
}

perlinNoise = function(canvas) {
    var offscreen = document.createElement('canvas');
    offscreen.width = 256;
    offscreen.height = 256;
    var noise = randomNoise(offscreen);
    var g = canvas.getContext('2d');
    g.save();
    
    /* Scale random iterations onto the canvas to generate Perlin noise. */
    for (var size = 4; size <= noise.width; size *= 2) {
        var x = (Math.random() * (noise.width - size)) | 0,
            y = (Math.random() * (noise.height - size)) | 0;
        g.globalAlpha = 4 / size;
        g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
    }
 
    g.restore();
    return canvas;
}

//// http://stackoverflow.com/a/18495093
contrastNoise = function(canvas, contrast, brightness, minBrightness, x, y, width, height) {

    perlinNoise(canvas);

    var
        contrast = contrast || 128
      , brightness = brightness || 128
      , minBrightness = minBrightness || 10
      , x = x || 0
      , y = y || 0
      , width = width || canvas.width
      , height = height || canvas.height
      , g = canvas.getContext('2d')
      , imageData = g.getImageData(x, y, width, height)
    ;

    var data = imageData.data;
    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    var darkness = 256 - brightness; 

    for (var i=0, l=data.length; i<l; i+=4) {
        data[i]   = Math.max(  factor * (data[i]   - darkness) + brightness, minBrightness  );
        data[i+1] = Math.max(  factor * (data[i+1] - darkness) + brightness, minBrightness  );
        data[i+2] = Math.max(  factor * (data[i+2] - darkness) + brightness, minBrightness  );
        if ( 765 === data[i] + data[i+1] + data[i+2] ) {
            data[i+3] = 0; // pure white areas go transparent
        }
    }

    g.putImageData(imageData, x, y);
    return canvas;
}














// function perlin_noise (canvas) {
//   var canvas_ctx = canvas.getContext ("2d"),
//       offscreen = document.createElement ("canvas"),
//       offscreen_ctx = offscreen.getContext ("2d"),
//       saved_alpha = canvas_ctx.globalAlpha

//   /* Fill the offscreen buffer with random noise. */
//   offscreen.width = canvas.width
//   offscreen.height = canvas.height

//   var offscreen_id = offscreen_ctx.getImageData (0, 0,
//                                                  offscreen.width,
//                                                  offscreen.height),
//       offscreen_pixels = offscreen_id.data

//   for (var i = 0; i < offscreen_pixels.length; i += 4) {
//     offscreen_pixels[i    ] =
//     offscreen_pixels[i + 1] =
//     offscreen_pixels[i + 2] = Math.floor (Math.random () * 256)
//     offscreen_pixels[i + 3] = 255
//   }

//   offscreen_ctx.putImageData (offscreen_id, 0, 0)

//   /* Scale random iterations onto the canvas to generate Perlin noise. */
//   for (var size = 4; size <= offscreen.width; size *= 2) {
//     var x = Math.floor (Math.random () * (offscreen.width - size)),
//         y = Math.floor (Math.random () * (offscreen.height - size))

//     canvas_ctx.globalAlpha = 4 / size
//     canvas_ctx.drawImage (offscreen, x, y, size, size,
//                                      0, 0, canvas.width, canvas.height)
//   }

//   canvas_ctx.globalAlpha = saved_alpha
// }