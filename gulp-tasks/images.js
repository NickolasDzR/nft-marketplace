"use strict";

import {paths} from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("images", () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(gulpif(production, imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 99, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            }),
        ])))
        .pipe(gulp.dest(paths.images.dist))
        .pipe(debug({
            "title": "Images"
        }))
        .on("end", browsersync.reload);
});
