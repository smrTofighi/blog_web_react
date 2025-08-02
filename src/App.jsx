import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/blog/BlogLandingPage";
import BlogPostView from "./pages/blog/BlogPostView";
import PostByTags from "./pages/blog/PostByTags";
import SearchPosts from "./pages/blog/SearchPosts";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UserProvider from "./providers/UserProvider";
import BlogPosts from "./pages/admin/blog/BlogPosts";
import BlogPostEditor from "./pages/admin/blog/BlogPostEditor";
import Comments from "./pages/admin/comment/Comments";

const App = () => {
  return (
    <UserProvider>
      <div>
      <Router>
        <Routes>
          {/* Defualt Route */}
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/:slug" element={<BlogPostView />} />
          <Route path="/tag/:tagName" element={<PostByTags />} />
          <Route path="/search" element={<SearchPosts />} />

          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Route */}
          <Route element={<PrivateRoute allowedRoles={[1,2]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route path="/admin/create" element={<BlogPostEditor />} />
            <Route
              path="/admin/edit/:postSlug"
              element={<BlogPostEditor isEdit={true} />}
            />
            <Route path="admin/comments" element={<Comments />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
    </UserProvider>
  );
};

export default App;
