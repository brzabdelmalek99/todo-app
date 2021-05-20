import { Component } from 'react';
import './App.css';
import TodoFilters from './TodoFilters';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';

class App extends Component {

  constructor(){
    super()
    this.state = {
      maListe : [],
      maListeAvecFiltre : []
    }
  }

  componentDidMount(){
    this.getTodos().then(res => this.setState({ maListe: res, maListeAvecFiltre: res}))
  }

  getTodos = async () => {
    return fetch ('http://localhost:5000/todos')
    .then(res => res.json())
    .then(data => data)
  }

  getTodo = async (id) => {
    return fetch (`http://localhost:5000/todos/${id}`)
    .then(res => res.json())
    .then(data =>  data)
  }

  addTodo = async (newTodo) => {
    const data = await fetch('http://localhost:5000/todos', 
      {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
          },
            body: JSON.stringify(newTodo)
      }
    ).then(res => res.json())

    this.setState(
      {
        maListe: [...this.state.maListe, data],
        maListeAvecFiltre: [...this.state.maListeAvecFiltre, data]
      }
    )
  }

  etatIncremente = async (id) => {
    const todo = await this.getTodo(id)
    if(todo.Etat===3){
      return
    }

    const newTodo = {
        ...todo,
        Etat: todo.Etat+1
    }

    fetch (`http://localhost:5000/todos/${id}`,
    {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => data)
    
    this.setState({ 
      maListe: (this.state.maListe.filter((todo) => todo.id === id ? {...todo, Etat: todo.Etat++} : todo))
    })
  }

  deleteTodo = async (id) => {
    fetch(`http://localhost:5000/todos/${id}`,{method: 'DELETE'})
    .then(res => this.setState({ 
      maListe: (this.state.maListe.filter((todo) => todo.id !== id)),
      maListeAvecFiltre: (this.state.maListeAvecFiltre.filter((todo) => todo.id !== id)) 
    }))
  }

  rafrechirList = (recherche) => {
    const choix = ["un","deux","trois"]
    this.setState({ 
      maListeAvecFiltre: (this.state.maListe.filter((todo) => 
        (recherche[choix[todo.Etat-1]]) 
        && (((new Date(todo.Date)) >= (new Date(recherche.deb))) || recherche.deb === "") 
        && (((new Date(todo.Date)) <= (new Date(recherche.fin))) || recherche.fin === "")   
      )) 
    })
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" style={{margin: "20px"}}>
            <TodoForm addTodo={this.addTodo}/>
          </div>
          <div className="col-8" style={{margin: "20px"}}>
            <TodoFilters rafrechirList={this.rafrechirList}/>
          </div>
        </div>
        <div className="row">
          <TodoStats/>
        </div>
        <div className="row">
            {this.state.maListeAvecFiltre.length === 0 && <center><h6 style={{marginTop:"30px"}}>Oops, pas de données, (ralonger vos filtres)</h6></center> }
            {this.state.maListeAvecFiltre.length !== 0 && <TodoList List={this.state.maListeAvecFiltre} deleteTodo={this.deleteTodo} etatIncremente={this.etatIncremente}/>}
        </div>
      </div>
    )
  }
}

export default App;