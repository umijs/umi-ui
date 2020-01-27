export default [
  {
    target: "node",
    cjs: { type: "babel", lazy: true },
    disableTypeCheck: true
  },
  {
    entry: "compatUI/ui.tsx",
    umd: {
      minFile: false,
      file: "index.umd"
    },
    extraExternals: ["antd", "react", "react-dom", "xterm"],
    typescriptOpts: {
      check: false,
      globals: {
        antd: "window.antd",
        react: "window.React",
        "react-dom": "window.ReactDOM"
      }
    }
  }
];
