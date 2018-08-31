({
    doInit : function(component, event, helper) {
        helper.getTodoList(component);
    },
    handleNewTodo: function(component, event, helper) {
        helper.saveNewTodo(component, event);
    },
    handleTodoUpdate: function(component, event, helper) {
        helper.updateTodo(component, event);
    },
    handleTodoDelete: function(component, event, helper) {
        helper.deleteTodo(component, event);
    },
})