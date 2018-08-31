public with sharing class UserController {
    
    @AuraEnabled
    public static User getUserDetails(){
        return [SELECT Id, Name, Email FROM User where Id =: UserInfo.getUserId()];
    }
}
