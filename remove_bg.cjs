const Jimp = require('jimp');

async function removeBlackBackground(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    
    // Threshold to consider a pixel "black"
    const threshold = 30; 

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is very dark, make it completely transparent
      if (red <= threshold && green <= threshold && blue <= threshold) {
        this.bitmap.data[idx + 3] = 0; // Alpha channel
      }
    });

    await image.writeAsync(outputPath);
    console.log(`Successfully processed ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  await removeBlackBackground('./public/logo.png', './public/logo.png');
  await removeBlackBackground('./public/team_logo.png', './public/team_logo.png');
}

main();
