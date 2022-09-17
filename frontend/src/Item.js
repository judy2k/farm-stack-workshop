function Item(props) {
    const task = props.task;

    return (<div className="todo-item">
        <input type="checkbox" defaultChecked={task.completed} />
        <span style={{ paddingLeft: "1ex" }}>{task.name} <small>({task._id})</small></span>
    </div>)
}

export default Item
