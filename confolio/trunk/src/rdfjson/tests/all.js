dojo.provide("rdfjson.tests.all");

rdfjson.tests.uris = ["http://slashdot.org/", "http://dn.se/"];
rdfjson.tests.predicates = ["http://purl.org/dc/elements/1.1/title", "http://purl.org/dc/elements/1.1/maker"];
rdfjson.tests.graph1 = {
    "http://example.org/about" : {
        "http://purl.org/dc/elements/1.1/creator" : [ { "value" : "Anna Wilder", "type" : "literal" } ],
        "http://purl.org/dc/elements/1.1/title"   : [ { "value" : "Anna's Homepage", "type" : "literal", "lang" : "en" } ] ,
        "http://xmlns.com/foaf/0.1/maker"         : [ { "value" : "_:person", "type" : "bnode" } ],
        "http://xmlns.com/foaf/0.1/nick"          : [ { "type" : "literal", "value" : "strange, for testing only"} ],
        "http://purl.org/dc/elements/1.1/related" : [ { "value" : "http://example.org/about", "type" : "uri" } ]
    } ,
 
    "_:person" : {
        "http://xmlns.com/foaf/0.1/homepage"      : [ { "value" : "http://example.org/about", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/made"          : [ { "value" : "http://example.org/about", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/name"          : [ { "value" : "Anna Wilder", "type" : "literal" } ] ,
        "http://xmlns.com/foaf/0.1/firstName"     : [ { "value" : "Anna", "type" : "literal" } ] ,
        "http://xmlns.com/foaf/0.1/surname"       : [ { "value" : "Wilder", "type" : "literal" } ] , 
        "http://xmlns.com/foaf/0.1/depiction"     : [ { "value" : "http://example.org/pic.jpg", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/nick"          : [ 
                                                      { "type" : "literal", "value" : "wildling"} , 
                                                      { "type" : "literal", "value" : "wilda" } 
                                                    ] ,
        "http://xmlns.com/foaf/0.1/mbox_sha1sum"  : [ {  "value" : "69e31bbcf58d432950127593e292a55975bc66fd", "type" : "literal" } ] 
    }
};

dojo.require("rdfjson.tests.Graph");
dojo.require("rdfjson.tests.Statement");