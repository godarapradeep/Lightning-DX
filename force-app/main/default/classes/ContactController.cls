public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts() {
        List<Contact> contacts = 
                [SELECT Id, Name, MailingStreet, Phone, Email, LeadSource FROM Contact];
        System.debug(contacts);
        //Add isAccessible() check
        return contacts;
    }

    //Method to get last 10 contacts
    public List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Email FROM Contact ORDER BY CreatedDate DESC LIMIT 10];
    }

}