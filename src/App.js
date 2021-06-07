import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Posts} />
        <Route path="/post/:id" component={PostDetails} />
      </Router>
    </div>
  );
}

export default App;
