"use strict";

import gulp from "gulp";

const smartgrid = require("smart-grid");

gulp.task("smart-grid", (cb) => {
    smartgrid("./src/styles/vendor/import/", {
        outputStyle: "scss",
        filename: "_smart-grid",
        columns: 12,
        offset: "30px",
        mobileFirst: true,
        mixinNames: {
            container: "container"
        },
        container: {
            fields: "15px"
        },
        breakPoints: {
            xs: {
                width: "480px"
            },
            sm: {
                width: "576px"
            },
            md: {
                width: "768px"
            },
            lg: {
                width: "992px"
            },
            xl: {
                width: "1200px"
            },
            xxl: {
                width: "1480px"
            }
        }
    });
    cb();
});
