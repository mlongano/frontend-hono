import "./App.css";
import Comments from "./components/Comments";
import Layout from "./components/Layout";

function App() {
  const apiUrl = "https://be.loma.im";
  return (
    <Layout>
      <Comments apiUrl={apiUrl} slug="hello-world" />
    </Layout>
  );
}

export default App;
