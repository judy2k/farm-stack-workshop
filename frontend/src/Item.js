function Item(props) {
    const task = props.task;

    async function checkboxChange(event) {
        task.completed = event.target.value

        await fetch(`/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: task.completed
            }),
        })
    }

    return (<div className="todo-item">
        <input type="checkbox" defaultChecked={task.completed} onChange={checkboxChange} />
        <span style={{ paddingLeft: "1ex" }}>{task.name} <small>({task._id})</small></span>
    </div>)
}

export default Item
