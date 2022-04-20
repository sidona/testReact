import React from 'react';
import './App.css';
import Posts from "./features/posts";
import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar";



function App() {
  return (
    <div className="App">
        <Navbar />
      <Container maxWidth="lg">
        <Posts />
      </Container>
    </div>
  );
}

export default App;
