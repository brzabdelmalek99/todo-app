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
      list : [],
      listFiltered : []
    }
  }

  componentDidMount(){
    this.getTodos().then(res => {this.setState({ list: res, listFiltered: res})})
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
        list: [...this.state.list, data],
        listFiltered: [...this.state.listFiltered, data]
      }
    )
  }

  incrementerEtat = async (id) => {
    const todo = await this.getTodo(id)
    if(todo.etat===3){
      return
    }

    const newTodo = {
        ...todo,
        etat: todo.etat+1
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
      listFiltered: (this.state.list.filter((todo) => todo.id === id ? {...todo, etat: todo.etat++} : todo))
    })
  }

  deleteTodo = async (id) => {
    fetch(`http://localhost:5000/todos/${id}`,{method: 'DELETE'})
    .then(res => this.setState({ 
      list: (this.state.list.filter((todo) => todo.id !== id)),
      listFiltered: (this.state.listFiltered.filter((todo) => todo.id !== id)) 
    }))
  }

  rafrechirList = (recherche) => {
    const choix = ["nouveau","encours","terminee"]
    this.setState({ 
      listFiltered: (this.state.list.filter((todo) => 
        ( recherche[choix[todo.etat-1]] ) 
        && (((new Date(todo.date)) >= (new Date(recherche.datedeb))) || recherche.datedeb === "") 
        && (((new Date(todo.date)) <= (new Date(recherche.datefin))) || recherche.datefin === "")   
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
        {this.state.listFiltered.length === 0 && <center>
        <h1 style={{marginTop:"30px"}}>Oops, pas de données, (ralongez vos filtres)</h1></center> }
        {this.state.listFiltered.length !== 0 && 
        <>
          <div className="row">
            <TodoStats data={this.state.listFiltered} />
          </div>
          <div className="row">
            <TodoList list={this.state.listFiltered} deleteTodo={this.deleteTodo} incrementerEtat={this.incrementerEtat}/>
          </div>
        </>
        }
      </div>
    )
  }
}

export default App;