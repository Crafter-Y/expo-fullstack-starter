module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          unstable_transformImportMeta: true, // Required for Zustand on web
        },
      ],
      "nativewind/babel",
    ],
  };
};
