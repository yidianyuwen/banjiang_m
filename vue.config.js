/**
 * Author: Nicky
 * Data: 2020-04-07
 * Last Modify:
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9527; // TODO: get this variable from setting.ts
const mockServerPort = 9528; // TODO: get this variable from setting.ts
const name = "banjiang"; // TODO: get this variable from setting.ts

const apiIntranetUrl = "";

module.exports =   {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  lintOnSave: false,
  outputDir: "banjiang",
  assetsDir: "./",
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
  },
  pluginOptions: {},
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set("name", name);

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-eval-source-map")
    );

    // remove vue-cli-service's progress output
    config.plugins.delete("progress");
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config
      .plugin("simple-progress-webpack-plugin")
      .use(require.resolve("simple-progress-webpack-plugin"), [
        {
          format: "compact"
        }
      ]);

    config.when(process.env.NODE_ENV !== "development", config => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial" // only package third parties that are initially dependent
            },
            elementUI: {
              name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: path.resolve(__dirname, "src/components"),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });

    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
          .use("sass-resources-loader")
          .loader("sass-resources-loader")
          .options({
            // Provide path to the file with resources
            resources: path.resolve(__dirname, "./src/utils/common.scss")
          })
          .end();
    });
  }
};
