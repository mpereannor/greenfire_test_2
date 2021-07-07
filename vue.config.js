module.exports = { 
    pluginOptions: {
        electronBuilder: {
          builderOptions: {
            extraResources:[{
              from: 'node_modules/electron-vue-screen-capture/dist_electron/bundled/',
              to: './screen-capture'
            }]
          }
        }
      }
}