/*global dojo, rdfjson*/
dojo.provide("rdfjson.tests.data");

rdfjson.tests.uris = ["http://slashdot.org/", "http://dn.se/"];
rdfjson.tests.predicates = ["http://purl.org/dc/terms/title", "http://purl.org/dc/terms/maker"];
rdfjson.tests.graph1 = {
    "http://example.org/about" : {
        "http://purl.org/dc/terms/creator" : [ { "value" : "Anna Wilder", "type" : "literal" } ],
        "http://purl.org/dc/terms/title"   : [ { "value" : "Anna's Homepage", "type" : "literal", "lang" : "en" } ] ,
        "http://xmlns.com/foaf/0.1/maker"         : [ { "value" : "_:person", "type" : "bnode" } ],
        "http://xmlns.com/foaf/0.1/nick"          : [ { "type" : "literal", "value" : "strange, for testing only"} ],
        "http://purl.org/dc/terms/related" : [ { "value" : "http://example.org/about", "type" : "uri" } ]
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

rdfjson.tests.graph2 = {
    "http://example.org/about" : {
		"http://www.w3.org/TR/rdf-schema/type"	  : [ { "value" : "http://xmlns.com/foaf/0.1/Document", "type" : "uri" } ],
        "http://purl.org/dc/terms/publisher" : [ { "value" : "_:person", "type" : "bnode" } ],
        "http://purl.org/dc/terms/creator" : [ { "value" : "_:person2", "type" : "bnode" } ],
        "http://purl.org/dc/terms/title"   : [ { "value" : "Anna's Homepage", "type" : "literal", "lang" : "sv" },
											   { "value" : "Anna hemsida", "type" : "literal", "lang" : "no" } ] ,
        "http://xmlns.com/foaf/0.1/nick"          : [ { "type" : "literal", "value" : "strange, for testing only"} ],
        "http://purl.org/dc/terms/related" : [ { "value" : "http://example.org/about", "type" : "uri" } ],
        "http://purl.org/dc/terms/subject" : [ { "value" : "http://example.com/instance1", "type" : "uri" } ]
    } ,
 
    "_:person" : {
		"http://www.w3.org/TR/rdf-schema/type"	  : [ { "value" : "http://xmlns.com/foaf/0.1/Person", "type" : "uri" } ],
        "http://xmlns.com/foaf/0.1/homepage"      : [ { "value" : "http://example.org/about", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/made"          : [ { "value" : "http://example.org/about", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/name"          : [ { "value" : "Anna Wilder", "type" : "literal" } ] ,
        "http://xmlns.com/foaf/0.1/firstName"     : [ { "value" : "Anna", "type" : "literal" } ,
													  { "value" : "Annie", "type" : "literal" } ] ,
        "http://xmlns.com/foaf/0.1/surname"       : [ { "value" : "Wilder", "type" : "literal" } ] , 
        "http://xmlns.com/foaf/0.1/depiction"     : [ { "value" : "http://example.org/pic.jpg", "type" : "uri" } ] ,
        "http://xmlns.com/foaf/0.1/nick"          : [ 
                                                      { "type" : "literal", "value" : "wildling"} , 
                                                      { "type" : "literal", "value" : "wilda" } 
                                                    ] ,
        "http://xmlns.com/foaf/0.1/mbox_sha1sum"  : [ {  "value" : "69e31bbcf58d432950127593e292a55975bc66fd", "type" : "literal" } ] 
    } ,
	"_:person2" : {
		"http://www.w3.org/TR/rdf-schema/type"	  : [ { "value" : "http://xmlns.com/foaf/0.1/Person", "type" : "uri" } ],
        "http://xmlns.com/foaf/0.1/firstName"     : [ { "value" : "Steve", "type" : "literal" } ],
        "http://xmlns.com/foaf/0.1/surname"       : [ { "value" : "Jobs", "type" : "literal" } ] 
    }
};
