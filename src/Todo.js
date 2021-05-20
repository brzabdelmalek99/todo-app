import { Button } from 'react-bootstrap';

const Todo = ({Id, Titre, Description, Etat, date, deleteTodo, etatIncremente}) => {
    return (
        <div className="span6 card" onDoubleClick={() => etatIncremente(Id)} style={{margin: "10px"}}>
            <div className="card-body">
                <h5 className="card-title">Todo : {Titre}</h5>
                <p className="card-text">Description : {Description}</p>
                {Etat===1 && <p className="card-text">Etat : Nouvelle </p>}
                {Etat===2 && <p className="card-text">Etat : En cours </p>}
                {Etat===3 && <p className="card-text">Etat : Terminée </p>}
                <p className="card-text">Date : {(new Date(date).toDateString())}</p>
                <Button className="btn btn-danger" onClick={()=>deleteTodo(Id)}>Delete</Button>   
            </div>
        </div>
    );
}

export default Todo
