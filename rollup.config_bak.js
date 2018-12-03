import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import gzip from "rollup-plugin-gzip";
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import fs from 'fs'

export default {
    entry: 'src/main.js',
    dest: 'dist/ustack-comp-lib.js',
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        nodeResolve({
            module: true,
            jsnext: true,
            main: true
        }),
        vue({
            compileTemplate: true,
            css:true
        }),
        buble(),
        gzip(),
        serve('./'),
        livereload({
            watch: 'dist',
            verbose: false
        })
    ]
}