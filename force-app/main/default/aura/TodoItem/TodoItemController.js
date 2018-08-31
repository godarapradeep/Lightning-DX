({
    updateTodo : function(component, event, helper) {
        var updateTodoEvent = component.getEvent("todoUpdated");
        updateTodoEvent.setParams({ "todo" : component.get("v.todo") });
        updateTodoEvent.fire();
    },
    deleteTodo : function(component, event, helper) {
        var deleteTodoEvent = component.getEvent("todoDeleted");
        deleteTodoEvent.setParams({ "todo" : component.get("v.todo") });
        deleteTodoEvent.fire();
    }
})
