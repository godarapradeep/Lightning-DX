({
    createTodo : function(component, event, helper) {
        if(event.getParam('keyCode') == 13) {
            helper.createTodo(component);
        }
    }
})
