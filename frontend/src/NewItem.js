import { Button } from "antd"
import { useState } from "react"

function NewItem() {
    const [text, setText] = useState("");

    function updateText(e) {
        setText(e.target.value);
    }

    function save() {
        const newTodo = {
            name: text,
            completed: false,
        }

        fetch("/task/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo),
        })
    }

    return (
        <div>
            <h1>New Todo</h1>
            <input onChange={updateText} />
            <Button onClick={save}>Save</Button>
        </div>
    )
}

export default NewItem