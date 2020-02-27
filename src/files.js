'use strict'

/**
 * Contains the string or Object representations of different files that need to be created by the application.
 */
module.exports = {
  /**
   * Returns the Object containing the package.json file.
   * 
   * @param {string} name The name of the application being created.
   * 
   * @returns {Object}
   */
  pkgJSON(name) {
    return {
      name: name,
      version: "0.1.0",
      description: "TODO",
      main: "index.js",
      scripts: {
        "tsconfig": "tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib",
        "type-check": "tsc --noEmit",
        "type-check:watch": "npm run type-check -- --watch",
        "build": "npm run build:types && npm run build:js",
        "build:types": "tsc --emitDeclarationOnly",
        "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
      },
      repository: {},
      keywords: [],
      author: '',
      license: 'MIT'
    };
  },

  /**
   * Returns the Object containing the .babelrc file.
   * 
   * @returns {Object}
   */
  babelRC() {
    return {
      presets: [
        "@babel/env",
        "@babel/typescript"
      ],
      plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
      ]

    }
  },

  /**
   * Returns a string containing a gitignore file for Node.js
   * 
   * @returns {string}
   */
  gitignore() {
    return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless`
  },

  /**
   * Returns a string containing a a basic CHANGELOG file.
   * 
   * @returns {string}
   */
  changelog() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `## 0.1.0 / ${year}-${month}-${day}
    - Initial release`;
  },

  /**
   * Returns the webpack config as a string.
   * 
   * @returns {string}
   */
  webpackConfig() {
    return `const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      // Include ts, tsx, js, and jsx files.
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  }
};`
  },

  /**
   * Returns the rollup config as a string.
   * 
   * @returns {string}
   */
  rollupConfig() {
    return `import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const name = 'RollupTypeScriptBabel';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'iife',
    name,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};`
  }
};