const config = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    transform: {
        "^.+\\.(js)$": "babel-jest",
      },
      transformIgnorePatterns: [
      ],
  };
  
module.exports = config;
  