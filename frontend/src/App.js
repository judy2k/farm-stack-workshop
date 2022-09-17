import 'antd/dist/antd.min.css'

import { Col, Row } from "antd"
import { useEffect, useState } from "react"

import Item from "./Item"
import NewItem from "./NewItem"


function App() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchAllTasks = async () => {
            const response = await fetch("/task/")
            const tasks = await response.json()
            setTasks(tasks);
        }
        setTimeout(fetchAllTasks, 0)
        const interval = setInterval(fetchAllTasks, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <Row style={{ marginTop: 50 }}>
                <Col span={14} offset={5}>
                    <NewItem />
                    <div>{tasks.reverse().map((task) => (<Item key={task._id} task={task} />))}</div>
                </Col>
            </Row>
        </>
    )
}

export default App
