const MODULE_RESOLVER = [
  "module-resolver",
  {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@components": "./src/components", // Composants du projeg
      "@screens": "./src/screens", // Écrans du projet
      "@utils": "./src/utils", // Functions utilitaires du projet
      "@services": "./src/services", // localStorage
      "@constants": "./src/constants", // Langue et couleur
      "@images": "./src/assets/images", // Images du projet
      "@store": "./src/store", // Redux store
      "@api": "./src/api", // API
    },
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [MODULE_RESOLVER],
  };
};
