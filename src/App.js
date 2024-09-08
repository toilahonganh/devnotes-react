import { Route, Routes } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import { UserContextProvider } from "./components/ui/UserContext";
import Layout from "./components/ui/Layout";
import IndexPage from "./pages/IndexPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import GetByType from "./pages/SortByType";
import SearchPage from "./pages/SearchPage"; // Import the SearchPage component

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/posts/type/:type" element={<GetByType />} />
          <Route path="/search" element={<SearchPage />} /> {/* Add this route */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
