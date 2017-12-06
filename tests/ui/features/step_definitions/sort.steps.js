const{Given,Then,When } = require ( 'cucumber' );

Given (/^The sort contact list is display$/, function (callback){
    this.browser.visit ("http://127.0.0.1:3000",(err) => {
        if (err) throw err;
        var tab = this.browser.queryAll('table tbody td');
        var liste = this.browser.tabs.current.Contact.Contacts.instance();
        var iterator = liste.iterator();
        var tabTest = [];
        var j = 0;
        var l = 0;

        var k = liste.iterator();
        while (k.hasNext()) {
            var val = k.next();
            this.browser.assert.equal(tabTest[j], tab[l + 1].innerText);
            j += 1;
            l += 6;
        }
        callback();
    });
});

When(/^User clicks on sort button$/, function(callback) {
    this.browser.visit("http://127.0.0.1:3000",(err)=> {
        if(err) throw err;

        var button = this.browser.query ('#button_sort');
        button[0].click();
    });
    callback();
});

Then(/^all contact sort$/, function(callback){
    this.browser.visit("http://127.0.0.1:3000",(err)=> {
        if(err) throw err;
        var listeContact = this.browser.tabs.current.Contact.Contacts.instance();
        var listeTempo = [];
        var i=listeContact.iterator();

        var cpt = 0;

        var tableau = this.browser.queryAll ('table tbody td');

        while(i.hasNext()){
            listeContact = i.next();
            listeTempo[cpt] = listeContact.lastName();
            cpt = cpt +1;
            }

            listeTempo.sort();

            var j = 1;

            for(var x=0; x < listeTempo.length; x++){
                this.browser.assert.success(listeTempo[x], tableau[j].innerText);
                j= j+6 ;
            }
    });
    callback();
});