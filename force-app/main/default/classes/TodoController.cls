public with sharing class TodoController {
    @AuraEnabled
    public static List<Todo__c> getTodoList(){
        return [SELECT Id, Is_Complete__c, Description__c FROM Todo__c ORDER BY CreatedDate DESC LIMIT 10];
    }

    @AuraEnabled
    public static Todo__c saveTodo(Todo__c todo){
        upsert todo;
        return todo;
    }
    @AuraEnabled
    public static Todo__c deleteTodo(Todo__c todo){
        delete todo;
        return todo;
    }
}
