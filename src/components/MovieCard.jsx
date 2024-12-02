import { Component } from "react";
import { Button, Card } from "react-bootstrap";

class MovieCard extends Component {
  state = {
    movie: null
  };

  fetchMovieData = async () => {
    // "http://www.omdbapi.com/?apikey=43a932c8&s="
    console.log("CARD fetch()");

    // la prop movieTitle mi corrisponde al dato aggiornato dello stato movieTitle in App.jsx
    // quando il metodo fetchMovieData verrà ri-chiamato sarà quello il momento in cui ri-leggeremo il valore di this.props.movieTitle aggiornato al momento attuale
    const resp = await fetch("http://www.omdbapi.com/?apikey=43a932c8&s=" + this.props.movieTitle);
    if (resp.ok) {
      const movieData = await resp.json();

      console.log("CARD setState()");
      this.setState({ movie: movieData.Search[0] });
    }
  };

  //   questo metodo ci permette di avviare la funzione fetchMovieData la prima volta al caricamento iniziale del componente (fase di MOUNT)
  componentDidMount() {
    console.log("CARD didMount()");
    this.fetchMovieData();
  }

  componentDidUpdate(prevProps, prevState) {
    // intercetta qualsiasi aggiornamento del componente (fase di UPDATE)
    // quindi verrà avviato ad ogni cambio di state o props

    // prevProps e prevState sono i due parametri propri di componentDidUpdate
    // sono ciò che lo differenzia da un comune render()

    // nel nostro caso vogliamo che this.fetchMovieData() venga invocato quando viene scelto un nuovo titolo in App.jsx
    // quindi quando il nostro componente MovieCard riceve nuove props corrispondenti a this.state.movieTitle in App
    console.log("CARD UPDATED didUpdate()");
    console.log("__PREV PROPS", prevProps.movieTitle);
    console.log("__THIS PROPS", this.props.movieTitle);

    // quello che non vogliamo succeda è di invocare this.fetchMovies() più di una volta

    // creare una condizione di guardia è OBBLIGATORIO quando si usa componentDidUpdate
    // la condizione è necessaria ad evitare loop infiniti di aggiornamento causati dal setState che fa aggiornare il componente ugualmente.
    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log("PROP CAMBIATE");

      this.fetchMovieData();
    } else {
      // saremo qui anche per via di un setState avviato dentro this.fetchMoviesData che scatena un nuovo update,
      // ma rispetto a prima le props non saranno diverse, questa volta, e quindi abbiamo lo STOP.
      console.log("PROP UGUALI A PRIMA. STOP. NIENTE FETCH");
    }
  }

  render() {
    // this.fetchMovies() // non posso chiamare fetchMovies dentro render === LOOP INFINITO
    console.log("CARD RENDER");
    return (
      <>
        {this.state.movie ? (
          <Card>
            <Card.Img variant="top" src={this.state.movie.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movie.Title}</Card.Title>
              <Card.Text>{this.state.movie.Year}</Card.Text>
              <Button variant="primary">{this.state.movie.imdbID}</Button>
            </Card.Body>
          </Card>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
}

export default MovieCard;
