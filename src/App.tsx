import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { Button, Layout } from "antd";
import Navbar from "./features/navbar/Navbar";
import BusinessesPage from "./pages/BusinessesPage";
import { Content, Header } from "antd/lib/layout/layout";
import LoginPage from "./pages/login-page/LoginPage";
import AuthChecker from "./features/access-control/AuthChecker";

// // App.js
// function Home() {
//   return (
//     <>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>
//       <nav>
//         <Link to="/about">About</Link>
//       </nav>
//     </>
//   );
// }

// function About() {
//   return (
//     <>
//       <main>
//         <h2>Who are we?</h2>
//         <p>That feels like an existential question, don't you think?</p>
//       </main>
//       <nav>
//         <Link to="/">Home</Link>
//       </nav>
//     </>
//   );
// }

//
function App() {
  return (
    <Layout className="layout">
      <Header>
        <Navbar></Navbar>
      </Header>

      <Content className="content">
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="businesses"
            element={
              <AuthChecker>
                <BusinessesPage></BusinessesPage>
              </AuthChecker>
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
