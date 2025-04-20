// tasks_mfe/webpack.config.js

const { shareAll, withModuleFederationPlugin } =
  require('@angular-architects/module-federation/webpack');
const webpack = require('webpack');

const version = process.env.MFE_VERSION || '1.0.0';
const port    = 4201;
const mfeName = `tasks_mfe_v${version}`;
const publicPath = `http://localhost:${port}/v${version}/`;

module.exports = withModuleFederationPlugin(
  {
    name: mfeName,
    filename: 'remoteEntry.js',
    exposes: { './Module': 'src/app/feature/feature-home/feature.routes.ts' },
    shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  },
  {
    output: {
      publicPath,
      uniqueName: mfeName,
      chunkLoading: 'jsonp',
      library: { type: 'var', name: mfeName }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.MFE_APP_VERSION': JSON.stringify(version)
      })
      // no CopyWebpackPlugin here
    ]
  }
);
