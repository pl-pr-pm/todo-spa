new Vue({
    el: '#app',
    // todoの配列とtodoの内容をメンバとして保持する
    data: function() {
        return {
            todos: [],
            todo_text: ''
        };
    },
    methods: {
        // todoテキストボックスに入力されたtodoをtextメンバに代入
        inputText(inpute_text) {
            this.todo_text = inpute_text.target.value;
        },
        addTodo() {
            // todoが空だった場合、何も処理しない
            if (!this.todo_text) return;
            // todoが空ではない場合、入力されたtodoを元にtodo配列にtodo要素を追加する
            const todo_text = this.todo_text;
            const id = Math.ceil(Math.random() * 1000);
            const ymd = this.getCurrentYMD();
            const todo = {
                id,
                todo_text,
                isDone: false,
                ymd
            };
            this.todos.push(todo);
            this.resetText();
        },
        resetText() {
            this.todo_text = '';
        },
        deleteTodo(id) {
            const index = this.getIndexBy(id);
            this.todos.splice(index, 1)
        },
        toggleIsDone(id) {
            const index = this.getIndexBy(id);
            this.todos[index].isDone = !this.todos[index].isDone;
            if(!this.todos[index].isDone) {
                this.todos[index].ymd = '';
            } else {
                this.todos[index].ymd = this.getCurrentYMD();
            }
        },
        getIndexBy(id) {
            const filteredTodo = this.todos.filter(todo => todo.id === id)[0];
            const index = this.todos.indexOf(filteredTodo);
            return index;
        },
        getCurrentYMD() {
            var date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            // const ymd = toString(year) + '/' + toString(month) + '/' + toString(day);
            const ymd = year + '/' + month + '/' + day;
            return ymd;
        },
    },
    computed: {
        doneTodos() {
            return this.todos.filter( todo => todo.isDone === true);
        },
        incompleteTodos() {
            return this.todos.filter( todo => todo.isDone === false);
        }
    }
});