import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { connect } from 'react-redux'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


/******************************************************************************
 █████   ██████ ████████ ██  ██████  ███    ██ ███████
██   ██ ██         ██    ██ ██    ██ ████   ██ ██
███████ ██         ██    ██ ██    ██ ██ ██  ██ ███████
██   ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
██   ██  ██████    ██    ██  ██████  ██   ████ ███████
******************************************************************************/


function loadPostsSuccess(userId, response) {
  return {
    type: 'LOAD_POSTS_SUCCESS',
    userId,
    response
  }
}

function loadPostsFailure(userId, error) {
  return {
    type: 'LOAD_POSTS_FAILURE',
    userId,
    error
  }
}

function loadPostsRequest(userId) {
  return {
    type: 'LOAD_POSTS_REQUEST',
    userId
  }
}



/******************************************************************************
 ██████  ██████  ███    ███ ██████   ██████  ███    ██ ███████ ███    ██ ████████
██      ██    ██ ████  ████ ██   ██ ██    ██ ████   ██ ██      ████   ██    ██
██      ██    ██ ██ ████ ██ ██████  ██    ██ ██ ██  ██ █████   ██ ██  ██    ██
██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██ ██ ██      ██  ██ ██    ██
 ██████  ██████  ██      ██ ██       ██████  ██   ████ ███████ ██   ████    ██
******************************************************************************/


class Posts extends Component {
  loadData(userId) {
    // Injected into props by React Redux `connect()` call:
    let { dispatch, posts } = this.props

    if (posts[userId]) {
      // There is cached data! Don't do anything.
      return
    }

    // Reducer can react to this action by setting
    // `isFetching` and thus letting us show a spinner.
    dispatch(loadPostsRequest(userId))

    // Reducer can react to these actions by filling the `users`.
    fetch(`http://myapi.com/users/${userId}/posts`).then(
      response => dispatch(loadPostsSuccess(userId, response)),
      error => dispatch(loadPostsFailure(userId, error))
    )
  }

  componentDidMount() {
    this.loadData(this.props.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.loadData(nextProps.userId)
    }
  }

  render() {
    if (this.props.isFetching) {
      return <p>Loading...</p>
    }

    let posts = this.props.posts.map(post =>
      <Post post={post} key={post.id} />
    )

    return <div>{posts}</div>
  }
}


/*
  parte de react-redux
  Cpnecta un componente REACT a la store de Redux
  Es un envoltorio de connectAdvanced
  No modifica el componente sino que devuelve uno nuevo.
  Argumentos:
    * mapStateToProps: Se trata de una función cuyo primer argumento es el estado,
        su segundo argumento opcional son props propios.
        * Si se presenta este argumento, cada vez que se actualice la store
        mapStateToProps será llamado.
        * El resultado de esta función debe ser un objeto plano y opcionalmente
        una función en casos avanzados.
        * El resultado será mergeado en los props del componente.
        * Si no queremos subscribirnos a las actualizaciones del store podemos pasar
        null o undefined.
        * Si se especifica el segudo argumento, ownprops, su valor será pasado al
        componente y mapStateToProps será reinvocado cuando el componente reciba
        nuevos props.
        function(state, ownprops){return {...}}
        function(state[, ownprops]){return {...}}
        function(state[, ownprops]){return function(){...}}
    * mapDispatchToProps:
        Puede recibir un unico objeto como argumento o una función
          En este caso se trataŕa de un objeto cada clave del mismo se asume que
          es una función que será un action creator de Redux.
          Un objeto con los mismos nombres de funciones, pero con cada action
          creator envuelta en una llamada a dispatch para que puedan ser invocados
          directamente, será mergeado dentro de los props del componente.
        Función.
        1º Argumento, dispatch
        2º Argumento, ownProps
    * mergeProps
        Function
          1. Argumento, stateProps
            Resultado de mapStateToProps
          2. Argumento, dispatchProps
            Resultado de mapDispatchToProps
          3. ownProps
            Parent props

          Debe devolver un objeto que será pasado como props al componente

          Si se omite, Object.assign({}, ownProps, stateProps, dispatchProps)
            será usado por defecto.
    * options
        Se trata de un objeto
        Acepta las opciones pasadas a connectAdvanced ademas de:
          pure: true / false
            Si es true, connect() evitará re-renderizados y llamdas a
            mapStateToProps, mapDispatchToProps y mergeProps si los state/props
            relevantes se mantienen igual basados en sus respectivos checks de
            igualdad.
            Asume que el componente es puro y no depende de inputs u otros
            side effects.
          areStatesEqual
            Function
              Si pure es true, compara el estado actual con el anterior.
          areOwnPropsEqual
            Function
              Si pure es true, compara los props actuales con los anteriores.
          areMergedPropsEqual
            Function
              Si pure es true, compara el resultado de mergeProps con su estado
              previo.
 */

/*
  Cada vez que cambie el store se ejecutará la función pasada como argumento a
  connect y se le pasará el prop "post" al componente.
  También pasa la función dispatch de Redux al componente mediante un prop
 */
connect(state => ({
  posts: state.posts
}))(Posts)
