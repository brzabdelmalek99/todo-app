import Todo from './Todo';

const TodoList = ({List, deleteTodo, etatIncremente}) => {
    return (
      <>
      <h1>Liste des todos :</h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {
            List.map((item) => <Todo key={item.id} Id={item.id} Titre={item.Titre} Description={item.Description} Etat={item.Etat} date={item.Date} etatIncremente={etatIncremente} deleteTodo={deleteTodo}/>)
        }
      </>
    );
}

export default TodoList;