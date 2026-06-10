// ╔══════════════════════════════════════════════════════════════════╗
// ║                        IMAGE PROCESSING                          ║
// ╠══════════════════════════════════════════════════════════════════╣
// ║  Drop source images into the matching src/ folder, then run:     ║
// ║                                                                  ║
// ║  npx gulp                    – process nets + awards, keep src   ║
// ║  npx gulp --delete-original  – process nets + awards, delete src ║
// ║  npx gulp resize-nets        – nets only                         ║
// ║  npx gulp resize-awards      – awards only                       ║
// ║                                                                  ║
// ║  SOURCE LAYOUT                                                   ║
// ║  src/nets/<color>/<files>  →  assets/images/nets/big|small/      ║
// ║  src/awards/<files>        →  assets/images/awards/big|small/    ║
// ║                                                                  ║
// ║  Output files are auto-numbered (next after highest in dest).    ║
// ╚══════════════════════════════════════════════════════════════════╝

const gulp = require('gulp');
const sharpResponsive = require('gulp-sharp-responsive');
const path = require('path');
const fs = require('fs');

const shouldDeleteOriginals = process.argv.includes('--delete-original');

const webpOptions = {
  quality: 80,
  effort: 6,
};

// Per-image-type configuration.
// Drop source images under the matching `src` folder:
//   nets   -> src/nets/<color>/*   =>  assets/images/nets/big|small/<color>/*.webp
//   awards -> src/awards/*         =>  assets/images/awards/big|small/*.webp
const imageTypes = {
  nets: {
    srcRoot: 'src/nets',
    glob: 'src/nets/*/*',
    dest: 'assets/images/nets',
    hasSubfolders: true,
    sizes: [
      { name: 'big', width: 1280 },
      { name: 'small', width: 800 },
    ],
  },
  awards: {
    srcRoot: 'src/awards',
    glob: 'src/awards/*',
    dest: 'assets/images/awards',
    hasSubfolders: false,
    sizes: [
      { name: 'big', width: 1200 },
      { name: 'small', width: 600 },
    ],
  },
};

// Return the highest numeric filename (without extension) found in dir, or 0.
const getMaxNum = (dir) => {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).reduce((max, f) => {
    const n = parseInt(path.basename(f, path.extname(f)), 10);
    return !isNaN(n) && n > max ? n : max;
  }, 0);
};

// Build a map of absoluteSrcPath -> assigned output number.
// For each group folder (color subfolder for nets, root for awards):
//   - find the max existing number across all size dest folders
//   - assign consecutive numbers (sorted source files, for determinism)
const buildNumberMap = (type) => {
  const map = new Map();
  const sizeNames = type.sizes.map((s) => s.name);
  const srcRoot = path.resolve(type.srcRoot);

  const groups = type.hasSubfolders
    ? fs.readdirSync(srcRoot)
        .filter((f) => fs.statSync(path.join(srcRoot, f)).isDirectory())
        .map((sub) => ({ sub, srcDir: path.join(srcRoot, sub) }))
    : [{ sub: '', srcDir: srcRoot }];

  for (const { sub, srcDir } of groups) {
    let maxNum = 0;
    for (const sizeName of sizeNames) {
      const destDir = sub
        ? path.join(type.dest, sizeName, sub)
        : path.join(type.dest, sizeName);
      maxNum = Math.max(maxNum, getMaxNum(destDir));
    }

    const files = fs.readdirSync(srcDir)
      .filter((f) => {
        const fp = path.join(srcDir, f);
        return fs.statSync(fp).isFile() && !f.startsWith('.');
      })
      .sort();

    let counter = maxNum + 1;
    for (const f of files) {
      map.set(path.join(srcDir, f), counter++);
    }
  }

  return map;
};

// Build the gulp-sharp-responsive `formats` array for a given image type.
const buildFormats = (type, numberMap) =>
  type.sizes.map((size) => ({
    name: size.name,
    width: size.width,
    format: 'webp',
    webpOptions,
    rename: (file) => {
      // Reconstruct the absolute source path from the parsed rename file object.
      const srcPath = path.join(file.dirname, file.basename + file.extname);
      const num = numberMap.get(srcPath);
      // Path of the source file relative to `src` (e.g. 'nets/koyot' or 'awards').
      const subFolder = path.relative(path.join(__dirname, 'src'), file.dirname);
      // Insert the size folder right after the type folder:
      //   nets/koyot -> nets/<size>/koyot ,  awards -> awards/<size>
      const [typeFolder, ...rest] = subFolder.split(path.sep);
      return path.join(typeFolder, size.name, ...rest, `${num}.webp`);
    },
  }));

// Create a resize task for one image type.
const makeTask = (type) => () => {
  const numberMap = buildNumberMap(type);
  return gulp.src(type.glob, { encoding: false, base: 'src' })
    .pipe(sharpResponsive({ formats: buildFormats(type, numberMap) }))
    .pipe(gulp.dest(type.dest));
};

// Delete all non-hidden source files for a given type (keeps .gitkeep and dirs).
const deleteSourceFiles = (type) => {
  const srcRoot = path.resolve(type.srcRoot);
  const dirs = type.hasSubfolders
    ? fs.readdirSync(srcRoot)
        .filter((f) => fs.statSync(path.join(srcRoot, f)).isDirectory())
        .map((sub) => path.join(srcRoot, sub))
    : [srcRoot];

  for (const dir of dirs) {
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith('.')) continue;
      const fp = path.join(dir, f);
      if (fs.statSync(fp).isFile()) fs.rmSync(fp);
    }
  }
};

gulp.task('resize-nets', makeTask(imageTypes.nets));
gulp.task('resize-awards', makeTask(imageTypes.awards));

gulp.task('delete-originals', (done) => {
  Object.values(imageTypes).forEach((type) => deleteSourceFiles(type));
  done();
});

// Run both by default. Pass --delete-original to also remove source files after processing.
gulp.task('resize-images', gulp.parallel('resize-nets', 'resize-awards'));
gulp.task('default', shouldDeleteOriginals
  ? gulp.series('resize-images', 'delete-originals')
  : gulp.series('resize-images'));
