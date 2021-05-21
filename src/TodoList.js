import Todo from './Todo';

const TodoList = ({list, deleteTodo, incrementerEtat}) => {
    return (
      <>
        <h1>Liste des todos :</h1>
        { list.map((item) => <Todo key={item.id} id={item.id} titre={item.titre} description={item.description} etat={item.etat} date={item.date} incrementerEtat={incrementerEtat} deleteTodo={deleteTodo}/>) }
     </>
    )
}

export default TodoList;