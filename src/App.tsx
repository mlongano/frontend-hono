import "./App.css";
import Comments from "./components/Comments";
import Layout from "./components/Layout";

function App() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <Layout>
      <Comments apiUrl={apiUrl} slug="hello-world" />
    </Layout>
  );
}

export default App;
