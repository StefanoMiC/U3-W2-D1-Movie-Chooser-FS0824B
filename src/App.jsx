import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import MovieSelect from "./components/MovieSelect";
import MovieCard from "./components/MovieCard";

class App extends Component {
  // stato condiviso tra i due componenti MovieSelect e MovieCard
  state = {
    movieTitle: "Venom"
  };

  // questo metodo è disponibile all'interno di MovieSelect passando il riferimento attraverso le sue prop
  changeMovieTitle = newTitle => {
    this.setState({ movieTitle: newTitle });
  };

  render() {
    return (
      <Container className="mt-5 pt-5">
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            {/* questo componente legge e scrive nello stato di App */}
            <MovieSelect movieTitle={this.state.movieTitle} changeMovieTitle={this.changeMovieTitle} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            {/* questo componente legge dallo stato di App */}
            <MovieCard movieTitle={this.state.movieTitle} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
