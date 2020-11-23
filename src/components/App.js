import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import Matches from "./pages/Matches"
import List from "./pages/List"
import Profile from "./pages/Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Footer from './Footer';
import Navbar from './Navbar';
import Maps from "./pages/Maps"


Window.value = {
animal: "dog",
location: 27514,
}

function App() {
return (
    <div>
      <Router>
      <div style={{minHeight: "calc(100vh - 40px)"}}>
      <Navbar />
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute  path='/list' component={List} />
            <PrivateRoute  path='/matches' component={Matches} />
            <PrivateRoute  path='/maps' component={Maps} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
        </div>
        <Footer />
      </Router>
    </div>
)
}
export default App
