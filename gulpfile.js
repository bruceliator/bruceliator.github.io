const gulp = require('gulp');
const flatMap = require('flat-map').default;
const scaleImages = require('gulp-scale-images');
const path = require('path');

// Define the sizes
const sizes = {
  small: { width: 800, folder: 'small' },
  big: { width: 1280, folder: 'big' },
  thumb: { width: 133, folder: 'thumb' }
};

// Function to generate both small and big variants
const generateVariants = (file, cb) => {
  const smallFile = file.clone();
  smallFile.scale = { maxWidth: sizes.small.width, format: 'webp' };

  const bigFile = file.clone();
  bigFile.scale = { maxWidth: sizes.big.width, format: 'webp' };

  const thumbFile = file.clone();
  thumbFile.scale = { maxWidth: sizes.thumb.width, format: 'webp' };

  cb(null, [smallFile, bigFile, thumbFile]);
};

// Function to determine the destination folder dynamically
const dynamicDest = (file) => {
  // Determine the size folder ('small' or 'big')
  let sizeFolder;
  if (file.scale.maxWidth === sizes.small.width)
    sizeFolder = sizes.small.folder
  else if (file.scale.maxWidth === sizes.big.width)
    sizeFolder = sizes.big.folder
  else
    sizeFolder = sizes.thumb.folder

  // Build the final destination path
  return path.join('assets/images/nets', sizeFolder);
};

const computeFileName = (output, scale, cb) => {
  const fileName = [
    path.basename(output.path, output.extname), // strip extension
    scale.format || output.extname
  ].join('.')
  cb(null, fileName)
}

// Gulp task to process images
gulp.task('scale-images', function () {
  return gulp.src('src/*/*', { encoding: false })
      .pipe(flatMap(generateVariants))   // Generate small and big versions of each image
      .pipe(scaleImages(computeFileName))               // Scale the images
      .pipe(gulp.dest(dynamicDest));      // Save to dynamic destination folder
});

// Default task
gulp.task('default', gulp.series('scale-images'));
