const config = {
  screens: {
    Index: {
      screens: {
        Communaute: {
          path: "communaute",
        },
        Map: {
          path: "goto/:latlng",
          parse: {
            latlng: String,
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ["geobench://"],
  config,
};

export default linking;
