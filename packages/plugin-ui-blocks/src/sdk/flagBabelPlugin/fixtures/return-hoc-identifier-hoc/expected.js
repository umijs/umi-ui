const App = Form.create()(() => (
  <div>
    <GUmiUIFlag filename="/tmp/pages/origin.tsx" index="0" />
    <h1>foo</h1>
    <GUmiUIFlag filename="/tmp/pages/origin.tsx" index="1" />
  </div>
));

export default connect()(App);
