import { GoodTodoList } from './GoodTodoList'
import { BadTodoList } from './BadTodoList'
import { TodoListWithActions } from './TodoListWithActions'
const TodoList = () => {
    return (
        <div>
            <GoodTodoList />
            <BadTodoList />
            <TodoListWithActions />
        </div>
    )
}

export default TodoList


