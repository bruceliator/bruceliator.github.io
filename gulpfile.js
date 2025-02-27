const gulp = require('gulp');
const sharpResponsive = require('gulp-sharp-responsive');
const path = require('path');

const webpOptions = {
  quality: 80,
  effort: 6,
};

// Define image sizes
const sizes = [
  {
    name: 'big',     // Folder name for big images
    width: 1280,      // Max width for big images. !!! 1200 for awards
    format: 'webp',  // Format for big images
    webpOptions: webpOptions
  },
  {
    name: 'small',   // Folder name for small images
    width: 800,      // Max width for small images. !!! 600 for awards
    format: 'webp',  // Format for small images
    webpOptions: webpOptions
  }
];

const dynamicRename = (output, file) => {
  // Get the original folder name (flowers or animals)
  const originalFolder = path.relative(path.join(__dirname, 'src'), file.dirname); // Extract 'flowers' or 'animals'
  // Return the full destination path including the size folder (small/big) and original folder
  return path.join('nets', output.name, originalFolder, `${file.basename}.${output.format}`);
};

// Gulp task to process images
gulp.task('resize-images', function () {
  return gulp.src('src/*/*', { encoding: false })
      .pipe(sharpResponsive({
        formats: sizes.map(output => ({
          ...output,
          rename: (file) => dynamicRename(output, file),
        })),
      }))
      .pipe(gulp.dest('assets/images/nets'));  // Save output to 'dist' folder
});

// Default task
gulp.task('default', gulp.series('resize-images'));
