({
    createTodo : function(component) {
        console.log(JSON.stringify(component.get("v.newTodo")));
        var newTodoEvent = component.getEvent("newTodoCreated");
        newTodoEvent.setParams({ "todo" : component.get("v.newTodo") });
        newTodoEvent.fire();
    }
})
