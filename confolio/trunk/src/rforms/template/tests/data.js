/*global dojo, rforms*/
dojo.provide("rforms.template.tests.data");

rforms.template.tests.template1 = {
	"label":{"en":"Bibliography", "sv":"Bibliografi"},
	"description":{"en":"Some nice information about books", "sv":"Lite trevlig bokinformation"},
	"root":{"@type":"group",
		"@id":"http://example.ch/books/book",
		"label":{"en":"Book"},
		"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Document"},
		"nodetype":"RESOURCE",
		"content":[
			{"@id":"http://example.ch/people.sirff#author"},
			{
				"@type":"text",
				"label":{"en":"Title"},
				"nodetype":"LANGUAGE_LITERAL",
				"property":"http://purl.org/dc/terms/title",
				"cardinality": {"min": 2, "max": 2}
			},
			{"@id":"publisheddate"},
			{"@id":"subjectVocab"},
			{"@id":"http://example.ch/people.sirff#contribution"}
		]
	},
	"auxilliary":[
		{
			"@id":"publisheddate",
			"@type":"text",
			"label":{"en":"Published"},
			"description":{"en":"The date this book was first published"},
			"nodetype":"LITERAL",
			"datatype":"http://www.w3.org/2001/XMLSchema.xsd#date",
			"property":"http://purl.org/dc/terms/date"
		},{
			"@id":"subjectVocab",
			"@type":"choice",
			"label":{"en":"Subject"},
			"description":{"en":"The book's subject"},
			"nodetype":"RESOURCE",
			"constraints": {"http://www.w3.org/2004/02/skos/core#inScheme":"http://example.com/bookSubjects"},
			"ontologyUrl": "http://example.com/bookOntology",
			"property":"http://purl.org/dc/terms/subject",
			"cardinality": {"min": 0, "max": 1},
			"parentproperty": "http://something.se/doh",
			"hierarchyproperty": "http://somethingel.se/doh"
		},{
			"@id":"http://example.ch/people.sirff#author",
			"@type":"group",
			"label":{"en":"Author"},
			"description":{"en":"The author of the book"},
			"property":"http://purl.org/dc/terms/publisher",
			"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Person"},
			"nodetype":"RESOURCE",
			"cls": ["table"],
			"content":[
				{
					"@type":"text",
					"property":"http://xmlns.com/foaf/0.1/firstName",
					"label":{"en":"First name"},
					"nodetype":"LITERAL"
				},{
					"@type":"text",
					"property":"http://xmlns.com/foaf/0.1/surname",
					"label":{"en":"Surname"},
					"nodetype":"LITERAL"
				}
			]
		},{
			"@id":"http://example.ch/people.sirff#contribution",
			"@type":"propertygroup",
			"label":{"en":"Contribution"},
			"description":{"en":"A person who has contributed"},
			"content":[
				{
					"@type":"choice",
					"label":{"en":"Type"},
					"description":{"en":"Type of contribution"},
					"nodetype":"RESOURCE",
					"constraints": {"http://www.w3.org/2004/02/skos/core#inScheme":"http://example.com/authorPredicates"},
					"ontologyUrl": "http://example.com/DCOntology"
				},
				{"@id":"http://example.ch/people.sirff#author"}
			]
		}
	],
	"ontologies":["http://example.ru/library.rdf"],
	"cachedChoices": {
		"http://example.com/bookOntology?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23inScheme%22%3A%22http%3A%2F%2Fexample.com%2FbookSubjects%22%7D&pp=http%3A%2F%2Fsomething.se%2Fdoh&hp=http%3A%2F%2Fsomethingel.se%2Fdoh":
			[{"top":true, d: "http://example.com/instanceTop", label: {"sv": "Toppen", "en":"Ze top!"}, children:[
			    {"_reference": "http://example.com/instance1"},{"_reference": "http://example.com/instance2"}]},
			 {d: "http://example.com/instance1", label: {"sv": "Matematik", "en":"Mathematics"}},
			 {d: "http://example.com/instance2", label: {"sv": "Kemi", "en":"Chemistry"}}],
		"http://example.com/DCOntology?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23inScheme%22%3A%22http%3A%2F%2Fexample.com%2FauthorPredicates%22%7D":
			[{d: "http://purl.org/dc/terms/creator", label: {"sv": "Skapare", "en":"Creator"}},
			 {d: "http://purl.org/dc/terms/contributor", label: {"sv": "Bidragare", "en":"Contributor"}}]
	}
};