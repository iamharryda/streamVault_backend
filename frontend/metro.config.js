// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');

// module.exports = defaultConfig;


// Importing the default Metro config for Expo projects
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (() => {
  // Load the default Metro configuration for the current project
  const config = getDefaultConfig(__dirname);

  // Enable transformation for SVG files using 'react-native-svg-transformer'
  config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
  );

  // Remove '.svg' from asset extensions (otherwise it won't be treated as a JS component)
  config.resolver.assetExts = config.resolver.assetExts.filter(
    ext => ext !== 'svg'
  );

  // Add '.svg' to the list of source code file extensions
  config.resolver.sourceExts.push('svg');

  // Ensure 'extraNodeModules' is initialized
  if (!config.resolver.extraNodeModules) {
    config.resolver.extraNodeModules = {};
  }

  // Override 'react-native-maps' to use the web-compatible version in this project
  config.resolver.extraNodeModules['react-native-maps'] = path.resolve(
    __dirname,
    'node_modules/@teovilla/react-native-web-maps'
  );

  return config;
})();
