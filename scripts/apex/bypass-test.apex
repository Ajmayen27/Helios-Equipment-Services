Savepoint sp = Database.setSavepoint();
try {
    insert new Capacity__c(Capacity_Date__c = Date.today(), Available_Hours__c = 8);
    System.debug('SAVED: bypass is ON');
} catch (DmlException e) {
    System.debug('BLOCKED: ' + e.getDmlMessage(0));
}
Database.rollback(sp);   // nothing is kept either way