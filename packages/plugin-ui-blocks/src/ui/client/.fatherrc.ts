export default {
  entry: "./index.tsx",
  cssModules: true,
  typescriptOpts: {
    check: false
  },
  extraExternals: ["antd", "react", "react-dom"],
  umd: {
    name: "blocks",
    minFile: false,
    globals: {
      antd: "window.antd",
      react: "window.React",
      "react-dom": "window.ReactDOM"
    }
  }
};
