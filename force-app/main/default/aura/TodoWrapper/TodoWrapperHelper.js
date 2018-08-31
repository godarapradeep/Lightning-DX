({
    getTodoList : function(component) {
        var action = component.get("c.getTodoList");
        this.callServer(action, function(todos){
            component.set("v.todos", todos);
        });
    },

    saveNewTodo: function(component, event) {
        var todo = event.getParam("todo");
        var action = component.get("c.saveTodo");
        action.setParams({"todo": todo});
        this.callServer(action, function(savedTodo){
            var todoList = component.get("v.todos");
            todoList.push(savedTodo);
            component.set("v.todos", todoList);
        });
    },

    updateTodo: function(component, event) {
        var todo = event.getParam("todo");
        var action = component.get("c.saveTodo");
        action.setParams({"todo": todo});
        this.callServer(action, function(updatedTodo){
            console.log(updatedTodo);
        });
    },

    deleteTodo: function(component, event) {
        var todo = event.getParam("todo");
        var action = component.get("c.deleteTodo");
        action.setParams({"todo": todo});
        this.callServer(action, function(deletedTodo){
            var todoList = component.get("v.todos");
            var newTodoList = [];
            todoList.forEach(function(todo){
                if(todo.Id !== deletedTodo.Id) {
                    newTodoList.push(todo);
                }
            });
            component.set("v.todos", newTodoList);
        });
    }
})