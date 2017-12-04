const{Given,Then,When } = require ( 'cucumber' );

Given(/^The contact list is display$/, function(callback) {
    this.browser.visit("http://127.0.0.1:3000",(err)=> {
        if(err) throw err;
        var contact = this.browser.tabs.current.Contact.Contacts;
        var iterator = contact.instance().iterator();
        var actualContact;
        iteListe = 0;
        var listeContact = this.browser.queryAll('table tbody tr td');
        while(iterator.hasNext() != ""){
            actualContact = iterator.next();
            this.browser.assert.success(listeContact[iteListe].innerText,actualContact.firstName());
            iteListe = iteListe + 1;
            this.browser.assert.success(listeContact[iteListe].innerText,actualContact.lastName());
            iteListe = iteListe + 5;
        }
        callback();
    });
});

When(/^User clicks on remove button of the first contact$/, function(callback) {
    this.browser.visit("http://127.0.0.1:3000",(err)=> {
        if(err) throw err;
        var button = this.browser.queryAll('table tbody tr td a');
        button[0].click();
    });
    callback();
});

Then(/^The first contact is removed$/, function(callback){
    this.browser.visit("http://127.0.0.1:3000",(err)=> {
        var contact = this.browser.tabs.current.Contact.Contacts;
        var iterator = contact.iterator();
        var actualContact = iterator.next();
        this.browser.assert.success(actualContact.firstName(), "Jacques");
    });
    callback();
});