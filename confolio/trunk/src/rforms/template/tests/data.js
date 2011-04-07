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
				"cardinality": {"min": 2, "pref": "4", "max": 5}
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
			"cardinality": {"min": 0, "max": 5},
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
					"cardinality": {"min": 0, "max": 1},
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
			[{"top":true, d: "http://example.com/instanceTop", selectable: false, label: {"sv": "Toppen", "en":"Ze top!"}, children:[
			    {"_reference": "http://example.com/instance1"},{"_reference": "http://example.com/instance2"}]},
			 {d: "http://example.com/instance1", label: {"sv": "Matematik", "en":"Mathematics"}, description: {"sv": "Matematik är ett coolt ämne", "en":"Mathematics is a cool subject"}},
			 {d: "http://example.com/instance2", label: {"sv": "Kemi", "en":"Chemistry"}}],
		"http://example.com/DCOntology?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23inScheme%22%3A%22http%3A%2F%2Fexample.com%2FauthorPredicates%22%7D":
			[{d: "http://purl.org/dc/terms/creator", label: {"sv": "Skapare", "en":"Creator"}},
			 {d: "http://purl.org/dc/terms/contributor", label: {"sv": "Bidragare", "en":"Contributor"}}]
	}
};





rforms.template.tests.template2 ={
 "label": {
  "en": "Default Base formlet in compound formlets",
  "sv": "Default formulet bas i sammansatta formuletter"
 },
 "cachedChoices": {
  "http://localhost:8080/ontologies/Model0.rdf?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23type%22%3A%7B%22uri%22%3A%22http%3A%2F%2Fltsc.ieee.org%2Frdf%2Flomv1p0%2Flom%23InteractivityLevel%22%7D%7D": [
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityLevel-low",
    "top": true,
    "label": {
     "hu": "2: alacsony",
     "et": "2: madal",
     "de": "2: niedrig",
     "no": "2: lav",
     "ro": "2: scazut",
     "el": "2: χαμηλό",
     "es": "2: bajo",
     "en": "2: Low",
     "sv": "2: Låg",
     "ru": "2: низкий"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityLevel-medium",
    "top": true,
    "label": {
     "hu": "3: közepes",
     "et": "3: keskmine",
     "de": "3: mittel",
     "no": "3: middels",
     "ro": "3: mediu",
     "el": "3: μεσαίο",
     "es": "3: medio",
     "en": "3: Medium",
     "sv": "3: Medium",
     "ru": "3: средний"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityLevel-veryLow",
    "top": true,
    "label": {
     "hu": "1: nagyon alacsony",
     "de": "1: sehr niedrig",
     "et": "1: väga madal",
     "no": "1: veldig lav",
     "ro": "1: foarte scazut",
     "el": "1: πολύ χαμηλό",
     "es": "1: muy bajo",
     "en": "1: Very low",
     "sv": "1: Väldigt låg",
     "ru": "1: очень низкий"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityLevel-high",
    "top": true,
    "label": {
     "hu": "4: magas",
     "de": "4: hoch",
     "et": "4: kõrge",
     "no": "4: høy",
     "ro": "4: ridicat",
     "el": "4: υψηλό",
     "es": "4: alto",
     "en": "4: High",
     "sv": "4: Hög",
     "ru": "4: высокий"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityLevel-veryHigh",
    "top": true,
    "label": {
     "hu": "5: nagyon magas",
     "de": "5: sehr hoch",
     "et": "5: väga kõrge",
     "no": "5: veldig høy",
     "ro": "5: foarte ridicat",
     "el": "5: πολύ υψηλό",
     "es": "5: muy alto",
     "en": "5: Very High",
     "sv": "5: Väldigt hög",
     "ru": "5: очень высокий"
    }
   }
  ],
  "http://localhost:8080/ontologies/Model0.rdf?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23inScheme%22%3A%7B%22uri%22%3A%22http%3A%2F%2Fwww.ehaweb.org%2Frdf%2F2011-passport%23CurriculumPassportScheme%22%7D%7D&ipp=http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23member&ihp=http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23member": [
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AE",
    "label": {"": "4Ae) Acute and chronic graft versus host disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AK",
    "label": {"": "2Ak) Other Myeloproliferative and Myelodysplastic disorders including pediatric disorders (e.g. JMML)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyStemCellTransplantationAndSpecialTherapy",
    "label": {"": "4) Clinical Hematology: Stem Cell Transplantation and Special Therapy"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#TreatmentOfHematologicalDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#StemCellTransplantation"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#CellAndGeneTherapy"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SupportiveAndEmergencyCare"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#InfectiousComplications"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1EA",
    "label": {"": "1Ea) Genetic counseling"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DG",
    "label": {"": "7DG?"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AC",
    "label": {"": "3Ac) Burkitt´s lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#AcuteMyeloidLeukemiaAndLeukemiasOfAmbiguousLineage",
    "label": {"": "2B) Acute Myeloid Leukemia and Leukemias of Ambiguous Lineage"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2BB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AC",
    "label": {"": "4Ac) Administration of high-dose therapy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#EndOfLife",
    "label": {"": "8H) End Of Life"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8HA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4BB",
    "label": {"": "4Bb) Clinical potential and limits of gene therapy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HC",
    "label": {"": "8Hc) Recognizing physical, psychological, social or spiritual distress and identifying the need for specialist palliative care"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DD",
    "label": {"": "7Dd) Rate and conditions of administration and monitoring"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AG",
    "label": {"": "8Ag) Strategic and economic implications of combining drugs and clinical biomarkers (personalized medicine)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6ED",
    "label": {"": "6Ed) Post-thrombotic complications"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AD",
    "label": {"": "1Ad) Pure red cell aplasia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BB",
    "label": {"": "2Bb) AML with MDS related changes"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#PsychosocialIssues",
    "label": {"": "8F) Psychosocial Issues"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8FB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8FC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8FA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#BloodDonation",
    "label": {"": "7A) Blood Donation"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7AD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7AC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AL",
    "label": {"": "1Al) Erythrocytosis (other than PV)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1EC",
    "label": {"": "1Ec) Hematological manifestations of non hematological disorders"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#EthicsAndLaw",
    "label": {"": "8D) Ethics and Law"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8DC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8EA",
    "label": {"": "8Ea) Communication with patients with hematological disorders (including communicating sad, bad and difficult information and managing patients with different cultural backgrounds)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EA",
    "label": {"": "7Ea) Hemolytic disease of the newborn"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7CC",
    "label": {"": "7Cc) Blood derivatives (incl. immunoglobulins)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HD",
    "label": {"": "8Hd) Potential indicators of the quality of end-of-life care "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CE",
    "label": {"": "6Ce) Other bleeding disorders (e.g. deficiency of factor XIII,  XI, X, VII, V and II, and hypofibrinogenaemia)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6DC",
    "label": {"": "6Dc) Heparin-induced thrombocytopenia "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AD",
    "label": {"": "3Ad) Other aggressive B-cell lymphomas (e.g. unclassifiable, primary mediastinal large B-cell lymphoma, intravascular, plasmablastic, ALK+ large B-cell lymphoma)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#GoodLaboratoryPractice",
    "label": {"": "5B) Good Laboratory Practice"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5BB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3BB",
    "label": {"": "3Bb) Peripheral T-cell lymphoma, NOS"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7AD",
    "label": {"": "7Ad) Preparation and preservation of standard and special blood components (Whole Blood; Red cells; Plasma; Platelets. Cryoprecipitate; irradiated; leukocyte depleted; washed; pathogen reduced; Pediatric Units)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3BA",
    "label": {"": "3Ba) Acute lymphoblastic leukemia/lymphoblastic lymphoma of T-cell origin"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HG",
    "label": {"": "8Hg) The national legal requirements regarding euthanasia "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AA",
    "label": {"": "5Aa) Hematopoiesis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AB",
    "label": {"": "3Ab) Diffuse large B-cell lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#GeneticsAndMolecularBiology",
    "label": {"": "5F) Genetics and Molecular Biology"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5FA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5FC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5FB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5FD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7BC",
    "label": {"": "7Bc) Minor red cell antigens and antibodies "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8GB",
    "label": {"": "8Gb) The impact of age on the pharmacodynamics, pharmacokinetics and risks of drugs used to treat hematologic disorders "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8FC",
    "label": {"": "8Fc) Patients’ rights according  to national legislation"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3ED",
    "label": {"": "3Ed) Monoclonal immunoglobulin deposition diseases (amyloidosis)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3BD",
    "label": {"": "3Bd) Other T- and NK-cell lymphomas (incl. AILT, T-PLL, T-LGL, NK-cell lymphoma/leukemia)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AE",
    "label": {"": "5Ae) Basic concepts of transcription and translation, epigenetic regulation, signal transduction, cell cycle regulation and apoptosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4CE",
    "label": {"": "4Ce) Hematological malignancies in pregnancy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6AC",
    "label": {"": "6Ac) Establishing ranges, including relevance to gender and age"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AN",
    "label": {"": "1An) Secondary hemochromatosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EF",
    "label": {"": "6Ef) Acquired thrombotic tendency, (e.g. APS, HIT, PNH and MPN) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HA",
    "label": {"": "8Ha) Communication with patients and family about death and dying"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BD",
    "label": {"": "2Bd) Other AML"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6DA",
    "label": {"": "6Da) Platelet structure, function and vessel wall interactions"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#BloodCountAndMorphology",
    "label": {"": "5C) Blood Count and Morphology"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5CE"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AJ",
    "label": {"": "1Aj) Acquired non-immune hemolytic anemias"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6AA",
    "label": {"": "6Aa) Techniques for assessing coagulation and platelets"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EI",
    "label": {"": "7Ei) Multi-component collection "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3EB",
    "label": {"": "3Eb) Solitary plasmacytoma "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8CD",
    "label": {"": "8Cd) Procedures and systematic post-marketing surveillance studies aimed at assessing the full safety profile of drugs (e.g., risk management plan, risk evaluation mitigation strategy, post-authorization safety studies)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1DA",
    "label": {"": "1Da) Acquired platelet function disorders"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CC",
    "label": {"": "5Cc) Preparation, fixation, staining, reading and reporting of peripheral blood smears and bone marrow aspirates"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HE",
    "label": {"": "8He) Collaboration of the multi-professional team with patients and family"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AG",
    "label": {"": "1Ag) Red blood cell membrane disorders (e.g.Spherocytosis)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4DD",
    "label": {"": "4Dd) Cytomegalovirus (CMV) infection"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5EB",
    "label": {"": "5Eb) Essential cellular markers applied in the diagnosis of hematological conditions (e.g. lineage, progenitor and differentiation markers)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#AdministrationOfTransfusionAndManagementOfComplications",
    "label": {"": "7D) Administration of Transfusion and Management of Complications"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7DG"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#MyeloproliferativeAndMyelodysplasticNeoplasms",
    "label": {"": "2A) Myeloproliferative and Myelodysplastic Neoplasms"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AI"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AK"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AJ"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item2AD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5FC",
    "label": {"": "5Fc) Other techniques for detection of genetic and epigenetic aberrations (e.g. Western blot, CGH, SNP, gene expression profiling, high-throughput sequencing, microRNA assays, methylation studies, proteomics)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AH",
    "label": {"": "2Ah) CMML"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7CE",
    "label": {"": "7Ce) Massive transfusion (in surgery, trauma, pregnancy, etc)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CC",
    "label": {"": "6Cc) Hemophilia A and B"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#AcquiredBleedingDisorders",
    "label": {"": "6B) Acquired Bleeding Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6BD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AB",
    "label": {"": "5Ab) Stem cell biology"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#TreatmentOfHematologicalDisorders",
    "label": {"": "4C) Treatment of Hematological Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4CD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4CE"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DA",
    "label": {"": "8Da) Principles of medical ethics central to the physician-patient relationship (e.g., principle of primacy of patients’ welfare, patients’ autonomy, social justice) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AA",
    "label": {"": "8Aa) Fundamental principles of evidence based medicine"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EC",
    "label": {"": "4Ec) Superior vena cava syndrome "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AJ",
    "label": {"": "2Aj) MDS intermediate and high risk disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3DA",
    "label": {"": "3Da) Lymphomas in immunodeficient patients (incl. PTLD, HIV-associated lymphomas)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#BoneMarrowFailure",
    "label": {"": "1B) Bone Marrow Failure"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1BB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1BA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AI",
    "label": {"": "3Ai) Chronic lymphocytic leukemia/small lymphocytic lymphoma/monoclonal B cell lymphocytosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionGeneralSkills",
    "label": {"": "8) General Skills"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#CommunicationSkills"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#HematologicalCareInTheElderlyPatient"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Pharmacovigilance"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#EndOfLife"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#EthicsAndLaw"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#GoodClinicalPracticeClinicalTrials"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#EvidenceBasedMedicineCriticalAppraisal"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#PsychosocialIssues"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7BA",
    "label": {"": "7Ba) Cross matching, direct and indirect antiglobulin (Coombs) tests, ABO and Rh typing of red blood cells"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3CA",
    "label": {"": "3Ca) Nodular lymphocyte predominant HL "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HB",
    "label": {"": "8Hb) Decision making related to end-of-life situations"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1BC",
    "label": {"": "1Bc) Fanconi’s anemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BC",
    "label": {"": "2Bc) Therapy related AML and MDS"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CF",
    "label": {"": "5Cf) Histopathology in regard to hematological conditions. Review of trephine biopsy, pathological lymph node and other tissue biopsies for diagnosis with a pathologist"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EB",
    "label": {"": "6Eb) Venous thromboembolism"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EJ",
    "label": {"": "6Ej) Adverse drug reactions to anticoagulant, antiplatelet and thrombolytic therapy "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#CellAndGeneTherapy",
    "label": {"": "4B) Cell and Gene Therapy"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4BB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4BA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#ConsultativeHematology",
    "label": {"": "1E) Consultative Hematology"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1EC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1EE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1EB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1EA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AF",
    "label": {"": "3Af) Follicular lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AA",
    "label": {"": "3Aa) Acute lymphoblastic leukemia/lymphoblastic lymphoma of B-cell origin"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyLymphoidMalignanciesAndPlasmaCellDisorders",
    "label": {"": "3) Clinical Hematology: Lymphoid Malignancies and Plasma Cell Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#T-CellLymphomasAndNK-CellNeoplasms"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#HodgkinLymphoma"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#OtherSpecialEntities"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#B-CellNeoplasms"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#PlasmaCellNeoplasms"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#BasicConcepts",
    "label": {"": "5A) Basic Concepts"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5AF"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Immunohematology",
    "label": {"": "7B) Immunohematology"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7BB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4BD",
    "label": {"": "4Bd) Tumor vaccines"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3CB",
    "label": {"": "3Cb) Classical HL"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#LaboratoryManagement",
    "label": {"": "6A) Laboratory Management"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6AC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BA",
    "label": {"": "2Ba) AML with recurrent genetic abnormalities"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CD",
    "label": {"": "6Cd) Von Willebrand’s disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AK",
    "label": {"": "1Ak) Other congenital anemias (CDA, sideroblastic anemia)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5FB",
    "label": {"": "5Fb) Polymerase chain reaction for the detection of gene mutations, fusion genes, clonality assessment, and gene expression (e.g. reverse transcription-polymerase chain reaction, qualitative and quantitative, sequencing)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BC",
    "label": {"": "8Bc) Applying the Appendix 2 to the Guideline on the evaluation of Anticancer Medicinal Products in Man on confirmatory studies in hematological malignancies (European Medicines Agency)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BE",
    "label": {"": "2Be) Myeloid proliferations related to Down syndrome"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CE",
    "label": {"": "1Ce) Hemophagocytic lymphohistiocytosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BE",
    "label": {"": "8Be) Obtaining the informed consent according to current regulations"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#PlateletDisordersAndAngiopathies",
    "label": {"": "1D) Platelet Disorders and Angiopathies"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1DD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1DC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1DA"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AA",
    "label": {"": "4Aa) Indications, risks and benefits of autologous and allogeneic transplants"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3EC",
    "label": {"": "3Ec) Plasma cell myeloma (Multiple myeloma)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4CC",
    "label": {"": "4Cc) Short and long term complications of chemotherapy and radiotherapy (including infertility and secondary neoplasias)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EC",
    "label": {"": "7Ec) Laboratory work-up of immune hemolytic anemias"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EB",
    "label": {"": "7Eb) Neonatal thrombocytopenia and neutropenia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#B-CellNeoplasms",
    "label": {"": "3A) B-Cell Neoplasms"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AI"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3AD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BD",
    "label": {"": "6Bd) Bleeding related to anticoagulants and antithrombotic therapy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DA",
    "label": {"": "7Da) Information to the patient "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4DE",
    "label": {"": "4De) Other viral infections in immunocompromised hosts"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#HematologicalCareInTheElderlyPatient",
    "label": {"": "8G) Hematological Care in the Elderly Patient"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8GB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8GA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8GC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7AC",
    "label": {"": "7Ac) Donor preparation; venesection, donation screening, donation associated adverse events "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1DC",
    "label": {"": "1Dc) Thrombotic thrombocytopenic purpura and microangiopathic hemolytic anemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AC",
    "label": {"": "5Ac) Chromosome and gene structure"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EJ",
    "label": {"": "7Ej) Performing therapeutic phlebotomy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5BB",
    "label": {"": "5Bb) Laboratory quality management (incl. internal and external quality control)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DC",
    "label": {"": "7Dc) Proper identification of the unit and recipient"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AA",
    "label": {"": "2Aa) Chronic myeloid leukemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BA",
    "label": {"": "8Ba) Identifying the different phases, types and purposes of clinical trials (e.g., phase 1-4, observational studies) as well as understanding the differences between industry-driven and investigator-driven clinical trials "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EB",
    "label": {"": "4Eb) Spinal cord compression"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8CA",
    "label": {"": "8Ca) Using terms relevant to drug-related harms (e.g., serious adverse event, adverse drug reaction, risk-benefit ratio, toxicity, medication error)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BG",
    "label": {"": "6Bg) Adverse effects of treatment used in acute bleeding (blood products, pro-haemostatic drugs  )"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3DB",
    "label": {"": "3Db) Cutaneous lymphomas"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CE",
    "label": {"": "5Ce) Cytochemical and special stains of blood and bone marrow smears"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#StemCellTransplantation",
    "label": {"": "4A) Stem Cell Transplantation"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4AH"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CG",
    "label": {"": "6Cg) Safety of treatment with blood products and factor concentrates"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyBenign",
    "label": {"": "1) Clinical Hematology: Benign"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#RedCellDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#NonMalignantWhiteBloodCellDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#ConsultativeHematology"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#PlateletDisordersAndAngiopathies"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#BoneMarrowFailure"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1DD",
    "label": {"": "1Dd) Pseudothrombocytopenia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Pharmacovigilance",
    "label": {"": "8C) Pharmacovigilance"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8CD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7CB",
    "label": {"": "7Cb) Granulocytes "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8EC",
    "label": {"": "8Ec) Communication within a multi-disciplinary team"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8CC",
    "label": {"": "8Cc) National and EU legislation regarding pharmacovigilance systems"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AE",
    "label": {"": "8Ae) Promotion by the industry and its effect on the rational use of diagnostic and therapeutic strategies."}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1BA",
    "label": {"": "1Ba) Acquired aplastic anemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5ED",
    "label": {"": "5Ed) Post-analytical phase (data analysis and determination of the lineage of cells of interest, clonality and specific subtype of hematological condition)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5EE",
    "label": {"": "5Ee) Applications, limitations and prognostic impact for diagnosis and classification, evaluation of minimal residual disease, stem cell quantification"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AF",
    "label": {"": "4Af) Pulmonary complications, veno-occlusive disease of the liver, and hemorrhagic cystitis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AE",
    "label": {"": "2Ae) Chronic eosinophilic leukemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AI",
    "label": {"": "1Ai) Acquired immune hemolytic anemias"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1EE",
    "label": {"": "1Ee) Hematological manifestations in HIV and other infectious diseases"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#InfectiousComplications",
    "label": {"": "4D) Infectious Complications"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4DE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4DD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4DC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8FA",
    "label": {"": "8Fa) Responding to normal psychological reactions to hematological diseases "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6AB",
    "label": {"": "6Ab) Assays for inhibitors (incl. anti-phospholipid antibodies) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EE",
    "label": {"": "7Ee) Red cell exchange"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AB",
    "label": {"": "4Ab) Criteria for selection of myeloablative or reduced dose preparative regimens"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#ManagementOfSpecialConditions",
    "label": {"": "7E) Management of Special Conditions"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EK"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EI"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EJ"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7EH"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DB",
    "label": {"": "8Db) The purpose and function of the Research Ethics Committee (ERC) and other regulatory bodies that oversee the conduct of clinical investigations"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3BC",
    "label": {"": "3Bc) Anaplastic large cell lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DG",
    "label": {"": "8Dg) Assessing quality of life measures"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CA",
    "label": {"": "5Ca) Automated complete blood count with white blood cell differential; “flagging”; causes of erroneous blood counts"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4BA",
    "label": {"": "4Ba) Clinical potential and limits of embryonic and adult stem cell therapy. Ethical considerations"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AE",
    "label": {"": "1Ae) Thalassemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EK",
    "label": {"": "7Ek) Special components (Leukoreduced, CMV safe, washed, gamma irradiated, pathogen reduced, cryopreserved)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CB",
    "label": {"": "1Cb) Granulocytopenia/agranulocytosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CF",
    "label": {"": "6Cf) Considerations in carriers of hemophilia in relation to pregnancy and management of neonates with hemophilia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EG",
    "label": {"": "7Eg) Leukapheresis (therapeutic)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#ThromboticDisorders",
    "label": {"": "6E) Thrombotic Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EJ"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EI"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6EC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EH",
    "label": {"": "7Eh) Donation by apheresis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#PlateletDisorders",
    "label": {"": "6D) Platelet Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6DD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6DC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4BC",
    "label": {"": "4Bc) Mesenchymal cells and NK cell therapy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#CommunicationSkills",
    "label": {"": "8E) Communication Skills"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8EC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8EB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#T-CellLymphomasAndNK-CellNeoplasms",
    "label": {"": "3B) T-Cell Lymphomas And NK-Cell Neoplasms"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3BB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3BC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EE",
    "label": {"": "6Ee) Thrombophilia (e.g. F V Leiden, II G20210A)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4CA",
    "label": {"": "4Ca) Drug therapy including targeted drugs: mechanisms of action, pharmacology and drug resistance "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyMyeloidMalignancies",
    "label": {"": "2) Clinical Hematology: Myeloid Malignancies"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#MyeloproliferativeAndMyelodysplasticNeoplasms"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#AcuteMyeloidLeukemiaAndLeukemiasOfAmbiguousLineage"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DH",
    "label": {"": "7Dh) Hemovigilance programs"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SupportiveAndEmergencyCare",
    "label": {"": "4E) Supportive and Emergency Care"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4EG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item4ED"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AG",
    "label": {"": "3Ag) Other indolent B-cell lymphomas (e.g. lymphoplasmacytic lymphoma/Waldenström´s macroglobulinemia, hairy cell leukemia)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionTransfusionMedicine",
    "label": {"": "7) Transfusion Medicine"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#GuidelinesAndRegulationsForUseOfBloodAndBloodComponents"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#AdministrationOfTransfusionAndManagementOfComplications"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Immunohematology"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#ManagementOfSpecialConditions"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#BloodDonation"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AD",
    "label": {"": "8Ad) Definition and disclosure of conflict of interest as well as current conflict-of-interest policies, (e.g., standards of conduct in collaboration between physicians and industry)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1BD",
    "label": {"": "1Bd) Other inherited bone marrow failure syndromes (e.g. Blackfan-Diamond, Schwachman)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4CD",
    "label": {"": "4Cd) Administration of immunosuppressive agents and growth factors"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AM",
    "label": {"": "1Am) Primary hemochromatosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DE",
    "label": {"": "7De) Fetal, neonatal and pediatric transfusion"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#GoodClinicalPracticeClinicalTrials",
    "label": {"": "8B) Good Clinical Practice / Clinical Trials"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8BE"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CB",
    "label": {"": "6Cb) Taking a relevant bleeding history (previous challenges and family history) with a focused clinical examination"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AD",
    "label": {"": "4Ad) Identification and selection of HPC source"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AH",
    "label": {"": "1Ah) Red blood cell enzymopathy (e.g. G6PD)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AO",
    "label": {"": "1Ao) Porphyria"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#NonMalignantWhiteBloodCellDisorders",
    "label": {"": "1C) Non Malignant White Blood Cell Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1CE"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5DC",
    "label": {"": "5Dc) Laboratory work-up on iron metabolism and vitamin deficiencies"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#HodgkinLymphoma",
    "label": {"": "3C) Hodgkin Lymphoma"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3CB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DE",
    "label": {"": "8De) The relationship between healthcare providers and national and European authorities, tissue banks, insurance companies, including legislation"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6CA",
    "label": {"": "6Ca)  Mechanisms in hemostasis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AB",
    "label": {"": "1Ab) Anemia of chronic disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#ImmunophenotypingByFlowCytometry",
    "label": {"": "5E) Immunophenotyping by Flow Cytometry"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5EB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5EE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5EC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CB",
    "label": {"": "5Cb) Performing aspiration and biopsy of bone marrow, lumbar puncture and lymph node fine needle aspiration and preparation of slides, touch preparations and trephine rolls"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5FA",
    "label": {"": "5Fa) Karyotyping (e.g. conventional cytogenetics and fluorescence in situ hybridization)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7AB",
    "label": {"": "7Ab) Epidemiology of infectious diseases in the area "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EF",
    "label": {"": "4Ef) Venous access management"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3DC",
    "label": {"": "3Dc) Primary CNS lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EE",
    "label": {"": "4Ee) Neurological and psychiatric disturbances"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5DA",
    "label": {"": "5Da) Hemoglobin analyses (e.g. hemoglobin electrophoresis)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8GC",
    "label": {"": "8Gc) Patients’ care based on a geriatric assessment "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7CA",
    "label": {"": "7Ca) Red Cells, Platelets, Plasma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AD",
    "label": {"": "2Ad) Essential thrombocythemia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5EA",
    "label": {"": "5Ea) Pre-analytical and analytical phase of flow cytometry of blood, bone marrow, and body fluids (e.g. specimen processing, surface vs. intracytoplasmic staining, acquiring data, gating strategies) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4DC",
    "label": {"": "4Dc) Fungal disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8EB",
    "label": {"": "8Eb) Communication with patients’ relatives"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CD",
    "label": {"": "5Cd) Examination of blood and bone marrow smears for RBC parasites"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CD",
    "label": {"": "1Cd) Inherited immune deficiency syndromes"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6DB",
    "label": {"": "6Db) Congenital platelet disorders, (e.g. Bernard-Soulier syndrome) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CA",
    "label": {"": "1Ca) Granulocyte dysfunction disorders"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BB",
    "label": {"": "6Bb) Disseminated intravascular coagulation (DIC)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BE",
    "label": {"": "6Be) Acquired bleeding disorders in adults (inhibitors to F VIII and vWF) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1EB",
    "label": {"": "1Eb) Hematological manifestations of congenital metabolism disorders"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7CD",
    "label": {"": "7Cd) Alternatives to allogeneic blood transfusion (autologous blood; use of r-huEPO, iron etc)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EA",
    "label": {"": "4Ea) Hyperleukocytosis, hyperviscosity, and tumor lysis syndrome"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5BD",
    "label": {"": "5Bd) Normal ranges of laboratory values, with relevance to gender, age and ethnicity"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7BB",
    "label": {"": "7Bb) HLA typing and anti-HLA antibody detection"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8HF",
    "label": {"": "8Hf) Best practice in the last hours and days of life, including use of effective symptomatic treatment for patients approaching death"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AB",
    "label": {"": "8Ab) Using scientific literature and critically evaluating information"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EC",
    "label": {"": "6Ec) Laboratory monitoring and dosing of anticoagulants"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DC",
    "label": {"": "8Dc) Professional responsibilities (e.g., respect for patient’s autonomy, non-maleficence, beneficence, justice)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5FD",
    "label": {"": "5Fd) Applications, limitations and prognostic impact of genetic and molecular aberrations for diagnosis and classification of hematological disorders, and for evaluating minimal residual disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8CB",
    "label": {"": "8Cb) Recognizing, documenting and treating adverse drug events"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4DA",
    "label": {"": "4Da) Neutropenic fever"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EA",
    "label": {"": "6Ea) Mechanisms and risk-factors in arterial and venous thromboembolism "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EG",
    "label": {"": "6Eg) Treatment and prophylaxis  of venous thromboembolism in pregnancy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8ED",
    "label": {"": "8Ed) Presentation of clinical cases"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DF",
    "label": {"": "7Df) Transfusion reactions and complications (non-hemolytic, hemolytic, allergic, transfusion-related acute lung injury TRALI, transfusion associated GvHD)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DF",
    "label": {"": "8Df) Cost-effectiveness reasoning and just allocation of scarce resources (e.g. rationalization, rationing, prioritization)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#RedCellDisorders",
    "label": {"": "1A) Red Cell Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AO"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AL"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AK"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AN"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AJ"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AI"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AM"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item1AH"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AF",
    "label": {"": "1Af) Sickle cell disease and other hemoglobinopathies"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AG",
    "label": {"": "4Ag) Evaluation of chimerism"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5BC",
    "label": {"": "5Bc) Hazards and safety"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7EF",
    "label": {"": "7Ef) Plateletpheresis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BC",
    "label": {"": "6Bc) Bleeding associated with renal and liver disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3DD",
    "label": {"": "3Dd) Histiocytic and dendritic cell neoplasms"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4CB",
    "label": {"": "4Cb) Administration of standard chemotherapy "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionThrombosisAndHemostasis",
    "label": {"": "6) Thrombosis and Hemostasis"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#LaboratoryManagement"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#AcquiredBleedingDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#CongenitalBleedingDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#ThromboticDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#PlateletDisorders"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AC",
    "label": {"": "2Ac) Primary Myelofibrosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#HematologyPassport",
    "top": true,
    "label": {"": "Hematology Curriculum Passport"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionGeneralSkills"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyBenign"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyLymphoidMalignanciesAndPlasmaCellDisorders"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionThrombosisAndHemostasis"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionLaboratoryDiagnosis"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyMyeloidMalignancies"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionTransfusionMedicine"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#SectionClinicalHematologyStemCellTransplantationAndSpecialTherapy"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5CG",
    "label": {"": "5Cg) Immunostaining in hematological malignancies (lymphoid-lineage, myeloid-lineage and differentiation markers)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#OtherLaboratoryTechniques",
    "label": {"": "5D) Other Laboratory Techniques"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5DC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item5DD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4ED",
    "label": {"": "4Ed) Mucositis, vomiting, and pain"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EH",
    "label": {"": "6Eh) Specific therapy in thrombotic disorders (e.g. caval filters)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1DB",
    "label": {"": "1Db) Immune thrombocytopenia"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6DD",
    "label": {"": "6Dd) Thrombocytopenia in pregnancy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4DB",
    "label": {"": "4Db) Bacterial disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AA",
    "label": {"": "1Aa) Anemias due to deficiency (iron, B12, folate)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5DD",
    "label": {"": "5Dd) Detection of immunoglobulin abnormalities (e.g. protein electrophoresis, immunoelectrophoresis/ immunofixation, cryoglobulin detection, light chain assays) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4AH",
    "label": {"": "4Ah) Mobilization, collection and manipulation of hemopoeitic stem cells"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#PlasmaCellNeoplasms",
    "label": {"": "3E) Plasma Cell Neoplasms"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3ED"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3EA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3EC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3EB"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1ED",
    "label": {"": "1Ed)  Hematological manifestations related to pregnancy"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AF",
    "label": {"": "5Af) Integrating data from various laboratory investigations, relate them to the clinical picture and formulate a diagnosis "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AG",
    "label": {"": "2Ag) Neoplasms with eosinophilia and abnormalities of PDGFR and/or FGFR1"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DD",
    "label": {"": "8Dd) Multidisciplinary discussion about ethical dilemmas in clinical practice (e.g., managing patients with reduced autonomy)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BA",
    "label": {"": "6Ba) Massive bleeding in obstetrics, trauma and surgery"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7AA",
    "label": {"": "7Aa) Council of Europe and other relevant regulations for donor eligibility"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3EA",
    "label": {"": "3Ea) Monoclonal gammopathy of undetermined significance (MGUS)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AE",
    "label": {"": "3Ae) Mantle cell lymphoma"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BD",
    "label": {"": "8Bd) Informing patients with various social, cultural, religious etc. backgrounds of all aspects related to clinical trials"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6EI",
    "label": {"": "6Ei) Purpura fulminans"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5AD",
    "label": {"": "5Ad) The role of deoxyribonucleic acid (DNA), ribonucleic acid (RNA) and proteins in normal cellular processes"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8FB",
    "label": {"": "8Fb) Recognizing psychological distress, socio-economic problems, and identifying the need for specialist resources "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AI",
    "label": {"": "2Ai) MDS low risk disease"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item6BF",
    "label": {"": "6Bf) Acquired bleeding disorders in children"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BF",
    "label": {"": "8Bf) Treating and managing patients according to protocol requirements and knowing when to diverge from the protocol"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8BB",
    "label": {"": "8Bb) Applying the current versions of clinical trial related guidelines and legislation (Directive 2001/20/EC on the implementation of Good Clinical Practice in Clinical Trials, World Medical Association Declaration of Helsinki (2008) on Ethical Principles for Medical Research Involving Human Subjects) "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#OtherSpecialEntities",
    "label": {"": "3D) Other Special Entities"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3DC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3DA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3DB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item3DD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#EvidenceBasedMedicineCriticalAppraisal",
    "label": {"": "8A) Evidence Based Medicine / Critical Appraisal"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AH"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item8AC"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AH",
    "label": {"": "8Ah) Problem based learning techniques"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#GuidelinesAndRegulationsForUseOfBloodAndBloodComponents",
    "label": {"": "7C) Guidelines and Regulations for Use of Blood and Blood Components"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7CE"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item7CD"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5BA",
    "label": {"": "5Ba) Principles of laboratory management and organization"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2BF",
    "label": {"": "2Bf) Acute leukemia of ambiguous lineage"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1BB",
    "label": {"": "1Bb) Paroxysmal Nocturnal Hemoglobinuria"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7DB",
    "label": {"": "7Db) Routine vs. emergency transfusions "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1AC",
    "label": {"": "1Ac) Anemia due to toxic exposure"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#SectionLaboratoryDiagnosis",
    "label": {"": "5) Laboratory Diagnosis"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#GoodLaboratoryPractice"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#ImmunophenotypingByFlowCytometry"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#BasicConcepts"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#BloodCountAndMorphology"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#OtherLaboratoryTechniques"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#GeneticsAndMolecularBiology"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AF",
    "label": {"": "8Af) Applying evidence based practice to the management of the individual patient"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AF",
    "label": {"": "2Af) Mastocytosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item4EG",
    "label": {"": "4Eg) Nutrition"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8GA",
    "label": {"": "8Ga) The effects of specific changes associated with aging and their impact on normal hematologic processes"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item2AB",
    "label": {"": "2Ab) Polycythemia Vera"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CC",
    "label": {"": "1Cc) Lymphopenia and lymphocyte dysfunction syndromes"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8AC",
    "label": {"": "8Ac) Biostatistics that will allow the trainee to interpret published literature"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5EC",
    "label": {"": "5Ec) General principles of disease-oriented antibody panels "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item3AH",
    "label": {"": "3Ah) Marginal Zone lymphomas (e.g. MALT, SMZL)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item5DB",
    "label": {"": "5Db) Other red blood cell laboratory techniques (e.g. sickling process,  oxygen affinity, red blood cell enzyme assays – pyruvate kinase, glucose-6-phosphate dehydrogenase)"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item1CF",
    "label": {"": "1Cf) Secondary Leukocytosis"}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item8DH",
    "label": {"": "8Dh) Current moral understanding of non-discrimination principles and human rights "}
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#CongenitalBleedingDisorders",
    "label": {"": "6C) Congenital Bleeding Disorders"},
    "children": [
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CG"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CF"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CD"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CC"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CA"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CB"},
     {"_reference": "http://www.ehaweb.org/rdf/2011-passport#Item6CE"}
    ],
    "selectable": false
   },
   {
    "d": "http://www.ehaweb.org/rdf/2011-passport#Item7ED",
    "label": {"": "7Ed) Plasmapheresis "}
   }
  ],
  "http://localhost:8080/ontologies/Model0.rdf?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23type%22%3A%7B%22uri%22%3A%22http%3A%2F%2Fltsc.ieee.org%2Frdf%2Flomv1p0%2Flom%23Difficulty%22%7D%7D" : [
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#Difficulty-veryDifficult",
    "top": true,
    "label": {
     "hu": "5: nagyon nehéz",
     "et": "5: väga raske",
     "de": "5: sehr schwierig",
     "no": "5: veldig vanskelig",
     "ro": "5: foarte dificil",
     "el": "5: πολύ δύσκολο",
     "es": "5: muy difícil",
     "en": "5: Very difficult",
     "sv": "5: Väldigt svår",
     "ru": "5: очень трудный"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#Difficulty-difficult",
    "top": true,
    "label": {
     "hu": "4: nehéz",
     "de": "4: schwierig",
     "et": "4: raske",
     "no": "4: vanskelig",
     "ro": "4: dificil",
     "el": "4: δύσκολο",
     "es": "4: difícil",
     "en": "4: Difficult",
     "sv": "4: Svår",
     "ru": "4: трудный"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#Difficulty-easy",
    "top": true,
    "label": {
     "hu": "2: könnyű",
     "et": "2: kerge",
     "de": "2: einfach",
     "no": "2: lett",
     "ro": "2: usor",
     "el": "2: εύκολο",
     "es": "2: fácil",
     "en": "2: Easy",
     "sv": "2: Lätt",
     "ru": "2: простой"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#Difficulty-veryEasy",
    "top": true,
    "label": {
     "hu": "1: nagyon könnyű",
     "de": "1: sehr einfach",
     "et": "1: väga kerge",
     "no": "1: veldig lett",
     "ro": "1: foarte usor",
     "el": "1: πολύ εύκολο",
     "es": "1: muy fácil",
     "en": "1: Very Easy",
     "sv": "1: Väldigt lätt",
     "ru": "1: очень простой"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#Difficulty-medium",
    "top": true,
    "label": {
     "hu": "3: közepes",
     "et": "3: keskmine",
     "de": "3: mittel",
     "no": "3: middels",
     "ro": "3: mediu",
     "el": "3: μεσαίο",
     "es": "3: medio",
     "en": "3: Medium",
     "sv": "3: Medium",
     "ru": "3: средний"
    }
   }
  ],
  "http://localhost:8080/ontologies/Model0.rdf?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23type%22%3A%7B%22uri%22%3A%22http%3A%2F%2Fltsc.ieee.org%2Frdf%2Flomv1p0%2Flom%23InteractivityType%22%7D%7D": [
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityType-mixed",
    "top": true,
    "label": {
     "hu": "vegyes",
     "et": "sega",
     "de": "gemischt",
     "no": "blandet",
     "ro": "mixt",
     "el": "μικτός",
     "es": "combinado",
     "en": "Mixed",
     "sv": "Blandad",
     "ru": "смешанный"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityType-active",
    "top": true,
    "label": {
     "hu": "tevékeny",
     "et": "aktiivne",
     "de": "aktiv",
     "no": "aktiv deltakelse",
     "ro": "activ",
     "el": "ενεργός",
     "es": "activo",
     "en": "Active",
     "sv": "Aktiv",
     "ru": "активный"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#InteractivityType-expositive",
    "top": true,
    "label": {
     "hu": "tapasztaló",
     "et": "tõlgendav",
     "de": "erklärend",
     "no": "opplysende informativt",
     "ro": "explicativ",
     "el": "αφηγηματικός",
     "es": "expositivo",
     "en": "Expositive",
     "sv": "Upplysande",
     "ru": "объяснительный"
    }
   }
  ],
  "http://localhost:8080/ontologies/Model0.rdf?constr=%7B%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23type%22%3A%7B%22uri%22%3A%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FAgentClass%22%7D%7D": [
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#IntendedEndUserRole-manager",
    "top": true,
    "label": {
     "hu": "igazgató",
     "et": "juht",
     "de": "manager",
     "no": "leder",
     "ro": "manager",
     "el": "διοικητικό στέλεχος",
     "es": "administrador",
     "en": "Manager",
     "sv": "Manager",
     "ru": "менеджер"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#IntendedEndUserRole-learner",
    "top": true,
    "label": {
     "hu": "tanuló",
     "de": "lerner",
     "et": "õppur",
     "no": "elev/student",
     "ro": "cursant",
     "el": "μαθητής",
     "es": "aprendiz",
     "en": "Learner",
     "sv": "Elev/Student",
     "ru": "ученик"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#IntendedEndUserRole-author",
    "top": true,
    "label": {
     "hu": "szerző",
     "et": "autor",
     "de": "autor",
     "no": "forfatter",
     "ro": "autor",
     "el": "συγγραφέας",
     "es": "autor",
     "en": "Author",
     "sv": "Författare",
     "ru": "автор"
    }
   },
   {
    "d": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#IntendedEndUserRole-teacher",
    "top": true,
    "label": {
     "hu": "tanár",
     "et": "õpetaja",
     "de": "lehrer",
     "no": "lærer",
     "ro": "invatator",
     "el": "δάσκαλος",
     "es": "profesor",
     "en": "Teacher",
     "sv": "Lärare",
     "ru": "учитель"
    }
   }
  ]
 },
 "description": {
  "en": "This is the formlet used as base in compound formlets by default. The formlets consists of a query with only a base variable and a minimal form specification. If the base formlet is not loaded (i.e. the containing formlet set) many compound formlets will break.",
  "sv": "Denna formuletten används som bas i många sammansatta formuletter som default. Formuletten består av en fråga med endast en basvariabel samt en minimal formulärspecifikation. Om denna basformulett inte är laddad (egentligen den omgivande formulett mängden) så kommer många sammansatta formuletter inte att fungera."
 },
 "root": {
  "nodetype": "RESOURCE",
  "label": {
   "de": "Ressource",
   "en": "Resource",
   "sv": "Resurs"
  },
  "@type": "group",
  "content": [
   {
    "styles": [
     "TextFormItem",
     "LanguageControlled"
    ],
    "nodetype": "LITERAL",
    "cardinality": {
     "min": 1,
     "pref": 1
    },
    "label": {"en": "Title"},
    "@type": "text",
    "property": "http://purl.org/dc/terms/title",
    "description": {"en": "This is the title of the resource"}
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 1,
     "pref": 1
    },
    "label": {"en": "Language"},
    "@type": "group",
    "property": "http://purl.org/dc/terms/language",
    "description": {"en": "The primary human language or languages used within this learning object to communicate to the intended user.\n"},
    "content": [{
     "styles": ["ChoiceFormItem"],
     "nodetype": "LITERAL",
     "cardinality": {
      "min": 1,
      "pref": 1,
      "max": 1
     },
     "@type": "choice",
     "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
     "datatype": "http://purl.org/dc/terms/RFC4646",
     "choices": [
      {
       "value": "sv",
       "label": {
        "en": "Swedish",
        "sv": "Svenska"
       }
      },
      {
       "value": "en",
       "label": {
        "en": "English",
        "sv": "Engelska"
       }
      },
      {
       "value": "de",
       "label": {"en": "German"}
      },
      {
       "value": "no",
       "label": {"en": "Norwegian"}
      },
      {
       "value": "el",
       "label": {"en": "Greek"}
      },
      {
       "value": "hu",
       "label": {"en": "Hungarian"}
      },
      {
       "value": "ro",
       "label": {"en": "Romanian"}
      },
      {
       "value": "et",
       "label": {"en": "Estonian"}
      },
      {
       "value": "es",
       "label": {"en": "Spanish"}
      },
      {
       "value": "ru",
       "label": {"en": "Russian"}
      },
      {
       "value": "da",
       "label": {"en": "Danish"}
      },
      {
       "value": "pt",
       "label": {"en": "Portugese"}
      },
      {
       "value": "fr",
       "label": {"en": "French"}
      },
      {
       "value": "nl",
       "label": {"en": "Dutch"}
      },
      {
       "value": "fi",
       "label": {"en": "Finnish"}
      },
      {
       "value": "it",
       "label": {"en": "Italian"}
      },
      {
       "value": "pl",
       "label": {"en": "Polish"}
      },
      {
       "value": "cs",
       "label": {"en": "Czech"}
      },
      {
       "value": "sk",
       "label": {"en": "Slovak"}
      }
     ]
    }],
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://purl.org/dc/terms/LinguisticSystem"}}
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 1,
     "pref": 1
    },
    "label": {"en": "Description"},
    "@type": "group",
    "property": "http://purl.org/dc/terms/description",
    "description": {"en": "Provide one paragraph describing the content of this resource"},
    "content": [{
     "styles": [
      "MultiLine",
      "TextFormItem",
      "LanguageControlled"
     ],
     "nodetype": "LITERAL",
     "cardinality": {
      "min": 1,
      "pref": 1
     },
     "label": {"en": ""},
     "@type": "text",
     "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
     "description": {"en": ""}
    }]
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "LITERAL",
    "cardinality": {
     "min": 1,
     "pref": 1,
     "max": 1
    },
    "label": {"en": "Copyright and Other Restrictions"},
    "@type": "choice",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#copyrightAndOtherRestrictions",
    "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
    "description": {"en": "Are there any copyrights involved in the use of this resource?"},
    "choices": [
     {
      "value": "true",
      "label": {"en": "Yes"}
     },
     {
      "value": "false",
      "label": {"en": "No"}
     }
    ]
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 0,
     "pref": 1
    },
    "label": {"en": "Keyword"},
    "@type": "group",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#keyword",
    "description": {"en": "Provide some keywords that describe the topic of this resource"},
    "content": [{
     "styles": [
      "TextFormItem",
      "LanguageControlled"
     ],
     "nodetype": "LITERAL",
     "cardinality": {
      "min": 0,
      "pref": 1
     },
     "@type": "text",
     "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"
    }],
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://ltsc.ieee.org/rdf/lomv1p0/lom#LangString"}}
   },
   {
    "styles": [
     "ChoiceFormItem",
     "ExpandableTree"
    ],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 1
    },
    "label": {"en": "EHA CV-passport Classification"},
    "@type": "choice",
    "property": "http://www.ehaweb.org/rdf/passport#passportSubfieldClassification",
    "description": {"en": "Points to a part of the EHA CV-passport that this resource deals with"},
    "constraints": {"http://www.w3.org/2004/02/skos/core#inScheme": {"uri": "http://www.ehaweb.org/rdf/2011-passport#CurriculumPassportScheme"}},
    "ontologyUrl": "http://localhost:8080/ontologies/Model0.rdf",
	"parentproperty": "http://www.w3.org/2004/02/skos/core#member",
	"hierarchyproperty": "http://www.w3.org/2004/02/skos/core#member",
    "isparentpropertyinverted": true,
	"ishierarchypropertyinverted": true
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 1
    },
    "label": {"en": "Intended End User Role"},
    "@type": "choice",
    "property": "http://purl.org/dc/terms/audience",
    "description": {"en": "Targeted user(s)\n\nThe principal users that can benefit from using this resource"},
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://purl.org/dc/terms/AgentClass"}},
    "ontologyUrl": "http://localhost:8080/ontologies/Model0.rdf"
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 1,
     "max": 1
    },
    "label": {"en": "Difficulty"},
    "@type": "choice",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#difficulty",
    "description": {"en": "How difficult is it to work with this resource?"},
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://ltsc.ieee.org/rdf/lomv1p0/lom#Difficulty"}},
    "ontologyUrl": "http://localhost:8080/ontologies/Model0.rdf"
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 0,
     "pref": 1
    },
    "label": {"en": "Educational description"},
    "@type": "group",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#educationalDescription",
    "description": {"en": "Comments on how this learning object is to be used."},
    "content": [{
     "styles": [
      "TextFormItem",
      "LanguageControlled"
     ],
     "nodetype": "LITERAL",
     "cardinality": {
      "min": 0,
      "pref": 1
     },
     "@type": "text",
     "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"
    }],
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://ltsc.ieee.org/rdf/lomv1p0/lom#LangString"}}
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 0,
     "pref": 1,
     "max": 1
    },
    "label": {"en": "Educational Language"},
    "@type": "group",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#educationalLanguage",
    "description": {"en": "The human language(s) used by the typical intended user of this learning object."},
    "content": [{
     "styles": ["ChoiceFormItem"],
     "nodetype": "LITERAL",
     "cardinality": {
      "min": 0,
      "pref": 1
     },
     "@type": "choice",
     "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
     "datatype": "http://purl.org/dc/terms/RFC4646",
     "choices": [
      {
       "value": "sv",
       "label": {
        "en": "Swedish",
        "sv": "Svenska"
       }
      },
      {
       "value": "en",
       "label": {
        "en": "English",
        "sv": "Engelska"
       }
      },
      {
       "value": "de",
       "label": {"en": "German"}
      },
      {
       "value": "no",
       "label": {"en": "Norwegian"}
      },
      {
       "value": "el",
       "label": {"en": "Greek"}
      },
      {
       "value": "hu",
       "label": {"en": "Hungarian"}
      },
      {
       "value": "ro",
       "label": {"en": "Romanian"}
      },
      {
       "value": "et",
       "label": {"en": "Estonian"}
      },
      {
       "value": "es",
       "label": {"en": "Spanish"}
      },
      {
       "value": "ru",
       "label": {"en": "Russian"}
      }
     ]
    }],
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://purl.org/dc/terms/LinguisticSystem"}}
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "LITERAL",
    "cardinality": {
     "min": 0,
     "pref": 1,
     "max": 1
    },
    "label": {"en": "Cost"},
    "@type": "choice",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#cost",
    "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
    "description": {"en": "Does the usage of this resource involves any costs to the users"},
    "choices": [
     {
      "value": "true",
      "label": {
       "hu": "igen",
       "et": "jah",
       "de": "ja",
       "no": "ja",
       "ro": "da",
       "el": "ναι",
       "es": "si",
       "en": "Yes",
       "sv": "Ja",
       "ru": "да"
      }
     },
     {
      "value": "false",
      "label": {
       "hu": "nem",
       "et": "ei",
       "de": "nein",
       "no": "nei",
       "ro": "nu",
       "el": "όχι",
       "es": "no",
       "en": "No",
       "sv": "No",
       "ru": "нет"
      }
     }
    ]
   },
   {
    "styles": ["GroupFormItem"],
    "nodetype": "BLANK",
    "cardinality": {
     "min": 0,
     "pref": 1
    },
    "label": {"en": "Copyright Description"},
    "@type": "group",
    "property": "http://purl.org/dc/terms/rights",
    "description": {"en": "Possible values:\n1) Are commercial uses of this resource allowed? (Yes/No)\n    Are modifications of this resource by other people allowed? (Yes/No)\n2) Free-text description of the rights\n\n\nDescription of restrictions and copyrights that may refer to the use of this resource"},
    "content": [
     {
      "styles": ["ChoiceFormItem"],
      "nodetype": "URI",
      "cardinality": {
       "min": 0,
       "pref": 1,
       "max": 1
      },
      "label": {"en": "Creative Commons"},
      "@type": "choice",
      "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
      "choices": [
       {
        "value": {"uri": "http://creativecommons.org/licenses/by/3.0/"},
        "label": {"en": "The owner ALLOWS commercial uses AND changes to the resource"}
       },
       {
        "value": {"uri": "http://creativecommons.org/licenses/by-nd/3.0/"},
        "label": {"en": "The owner ALLOWS commercial uses but does NOT allow changes to the resource"}
       },
       {
        "value": {"uri": "http://creativecommons.org/licenses/by-nc/3.0/"},
        "label": {"en": "The owner does NOT allow commercial uses but ALLOWS changes to the resource"}
       },
       {
        "value": {"uri": "http://creativecommons.org/licenses/by-nc-nd/3.0/"},
        "label": {"en": "The owner does NOT allow commercial uses OR changes to the resource"}
       }
      ]
     },
     {
      "styles": [
       "MultiLine",
       "TextFormItem",
       "LanguageControlled"
      ],
      "nodetype": "LITERAL",
      "cardinality": {
       "min": 0,
       "pref": 1
      },
      "label": {"en": "In text (if none of the above fits)"},
      "@type": "text",
      "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"
     }
    ]
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 0,
     "max": 1
    },
    "label": {"en": "Interactivity Type"},
    "@type": "choice",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#interactivityType",
    "description": {"en": "Is this resource causing some interaction from the learner's side? Is it partly inducing actions from the learner?"},
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://ltsc.ieee.org/rdf/lomv1p0/lom#InteractivityType"}},
    "ontologyUrl": "http://localhost:8080/ontologies/Model0.rdf"
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 0,
     "max": 1
    },
    "label": {"en": "Interactivity Level"},
    "@type": "choice",
    "property": "http://ltsc.ieee.org/rdf/lomv1p0/lom#interactivityLevel",
    "description": {"en": "Level of interaction\n\nWhat is the interactivity level between the resource and its users? Ranging from very low, low and medium to high and very high"},
    "constraints": {"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {"uri": "http://ltsc.ieee.org/rdf/lomv1p0/lom#InteractivityLevel"}},
    "ontologyUrl": "http://localhost:8080/ontologies/Model0.rdf"
   },
   {
    "styles": ["ChoiceFormItem"],
    "nodetype": "URI",
    "cardinality": {
     "min": 0,
     "pref": 1,
     "max": 10
    },
    "label": {"en": "Learning Resource Type"},
    "@type": "choice",
    "property": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "description": {"en": "What is the type of the resource?"},
    "choices": [
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-application"},
      "label": {
       "hu": "alkalmazás",
       "et": "rakendus",
       "de": "anwendung",
       "no": "søknad",
       "ro": "aplicatie",
       "el": "εφαρμογή",
       "es": "aplicación",
       "en": "Application",
       "sv": "tillämpning",
       "ru": "приложение"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-assessment"},
      "label": {
       "hu": "Értékelés",
       "et": "Hinnang",
       "de": "Beurteilung",
       "no": "Vurdering",
       "ro": "Evaluare",
       "el": "αξιολόγηση",
       "es": "Evaluación",
       "en": "Assessment",
       "sv": "Utvärdering",
       "ru": "оценка"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-broadcast"},
      "label": {
       "hu": "Mũsor",
       "et": "Ülekanne",
       "de": "Übertragung",
       "no": "Kringkasting",
       "ro": "Difuzare",
       "el": "εκπομπή",
       "es": "Programa",
       "en": "Broadcast",
       "sv": "Sändning",
       "ru": "передача"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-caseStudy"},
      "label": {
       "hu": "esettanulmány",
       "et": "Juhtumiuuring",
       "de": "fallstudie",
       "no": "Case studie",
       "ro": "Sudiu de caz",
       "el": "μελέτη περίπτωσης",
       "es": "Caso de estudio",
       "en": "Case study",
       "sv": "Fallstudie",
       "ru": "тематическое исследование"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-course"},
      "label": {
       "hu": "Kurzus",
       "et": "Suund",
       "de": "Kurs",
       "no": "Kurs",
       "ro": "Curs",
       "el": "μάθημα",
       "es": "Curso",
       "en": "Course",
       "sv": "Kurs",
       "ru": "курс"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-demonstration"},
      "label": {
       "hu": "Demonstráció",
       "et": "Esitlemine",
       "de": "Demonstration",
       "no": "Demonstrasjon",
       "ro": "Demonstratie",
       "el": "επίδειξη",
       "es": "Demonstración",
       "en": "Demonstration",
       "sv": "Demonstration",
       "ru": "демонстрация"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-enquiryOrientedActivity"},
      "label": {
       "hu": "adatgyűjtés",
       "et": "küsimuspõhine tegevus",
       "de": "fragegeleitete aktivität",
       "no": "nettbasert aktivitet",
       "ro": "activitate oriectata spre cercetare",
       "el": "δραστηριότητα προσανατολισμένη στην έρευνα",
       "es": "cuestionario orientado a la actividad",
       "en": "Enquiry-oriented activity",
       "sv": "Fråge-orienterad aktivitet",
       "ru": "ориентированная на опрос деятельность"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-educationalGame"},
      "label": {
       "hu": "Oktató játék",
       "et": "õppemäng",
       "de": "bilduns-spiel",
       "no": "Pedagogisk spill",
       "ro": "Jocuri educationale",
       "el": "εκπαιδευτικό παιχνίδι",
       "es": "Juego educativo",
       "en": "Educational game",
       "sv": "Pedagogiskt spel",
       "ru": "обучающая игра"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-drillAndPractice"},
      "label": {
       "hu": "Gyakorlat",
       "et": "treeni ja harjuta",
       "de": "Übung und praxis",
       "no": "øvelser og praktiske oppgaver",
       "ro": "Exercitii si aplicatii practice",
       "el": "άσκηση και πρακτική",
       "es": "Ejercicio y práctica",
       "en": "Drill and practice",
       "sv": "Praktiska uppgifter och övningar",
       "ru": "обучение и практика"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-experiment"},
      "label": {
       "hu": "Kísérlet",
       "et": "Katse",
       "de": "Experiment",
       "no": "Eksperiment",
       "ro": "Experiment",
       "el": "πείραμα",
       "es": "Experimento",
       "en": "Experiment",
       "sv": "Experiment",
       "ru": "эксперимент"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-exploration"},
      "label": {
       "hu": "Kutatás",
       "et": "Uurimine",
       "de": "Untersuchung",
       "no": "Utforskning",
       "ro": "Explorare",
       "el": "εξερεύνηση",
       "es": "Exploración",
       "en": "Exploration",
       "sv": "Utforskning",
       "ru": "исследование"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-glossary"},
      "label": {
       "hu": "szószedet",
       "et": "Sõnastik",
       "de": "Glossar",
       "no": "Ordliste",
       "ro": "Glosar",
       "el": "γλωσσάριο",
       "es": "Glosario",
       "en": "Glossary",
       "sv": "Ordlista",
       "ru": "словарь"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-guide"},
      "label": {
       "hu": "útmutató",
       "et": "juhend",
       "de": "Anleitung",
       "no": "Guide",
       "ro": "Ghid",
       "el": "οδηγός",
       "es": "gúia",
       "en": "Guide",
       "sv": "Guide",
       "ru": "руководство"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-audio"},
      "label": {
       "hu": "tananyag: audio",
       "et": "õppevara: audio",
       "de": "lernwert: audio",
       "no": "informasjonselement: lyd",
       "ro": "evaluarea invatarii: audio",
       "el": "μαθησιακό αντικείμενο: ήχος",
       "es": "actividad educativa: audio",
       "en": "Learning asset: Audio",
       "sv": "Läro-resurs: Audio",
       "ru": "учебное пособие: аудио"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-data"},
      "label": {
       "hu": "tananyag: adatok",
       "et": "õppevara: andmed",
       "de": "lernwert: daten",
       "no": "informasjonselement: data",
       "ro": "evaluarea invatarii: data",
       "el": "μαθησιακό αντικείμενο: δεδομένα",
       "es": "actividad educativa: datos",
       "en": "Learning asset: Data",
       "sv": "Läro-resurs: Data",
       "ru": "учебное пособие: данные"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-image"},
      "label": {
       "hu": "tananyag: image",
       "et": "õppevara: image",
       "de": "lernwert: bild",
       "no": "informasjonselement: bilde",
       "ro": "evaluarea invatarii: imagine",
       "el": "μαθησιακό αντικείμενο: εικόνα",
       "es": "actividad educativa: imagen",
       "en": "Learning asset: Image",
       "sv": "Läro-resurs: Bild",
       "ru": "учебное пособие: изображение"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-model"},
      "label": {
       "hu": "tananyag: modell",
       "et": "õppevara: mudel",
       "de": "lernwert: modell",
       "no": "informasjonselement: modell",
       "ro": "evaluarea invatarii: model",
       "el": "μαθησιακό αντικείμενο: μοντέλο",
       "es": "actividad educativa: modelo",
       "en": "Learning asset: Model",
       "sv": "Läro-resurs: Modell",
       "ru": "учебное пособие: модель"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-text"},
      "label": {
       "hu": "tananyag: text",
       "et": "õppevara: tekst",
       "de": "lernwert: text",
       "no": "informasjonselement: tekst",
       "ro": "evaluarea invatarii: text",
       "el": "μαθησιακό αντικείμενο: κείμενο",
       "es": "actividad educativa: texto",
       "en": "Learning asset: Text",
       "sv": "Läro-resurs: Text",
       "ru": "учебное пособие: текст"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-learningAsset-video"},
      "label": {
       "hu": "tananyag: videó",
       "et": "õppevara: video",
       "de": "lernwert: video",
       "no": "informasjonselement: video",
       "ro": "evaluarea invatarii: video",
       "el": "μαθησιακό αντικείμενο: βίντεο",
       "es": "actividad educativa: video",
       "en": "Learning asset: Video",
       "sv": "Läro-resurs: Video",
       "ru": "учебное пособие: видео"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-lessonPlan"},
      "label": {
       "hu": "tanterv",
       "et": "tunnikava",
       "de": "stundenplan",
       "no": "undervisningssplan",
       "ro": "planul lectiei",
       "el": "πλάνο μαθήματος",
       "es": "plan para una lección",
       "en": "Lesson plan",
       "sv": "Läroplan",
       "ru": "план урока"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-openActivity"},
      "label": {
       "hu": "szabad tevékenység",
       "et": "lahtine üritus",
       "de": "offene aktivität",
       "no": "åpen aktivitet",
       "ro": "activitate deschisa",
       "el": "ανοικτή δραστηριότητα",
       "es": "actividad abierta",
       "en": "Open activity",
       "sv": "Fri aktivitet",
       "ru": "открытая деятельность"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-presentation"},
      "label": {
       "hu": "prezentáció",
       "et": "esitlus",
       "de": "präsentation",
       "no": "presentasjon",
       "ro": "prezentarea",
       "el": "παρουσίαση",
       "es": "presentación",
       "en": "Presentation",
       "sv": "Presentation",
       "ru": "презентация"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-project"},
      "label": {
       "hu": "projekt",
       "et": "projekt",
       "de": "projekt",
       "no": "prosjektarbeid",
       "ro": "proiect",
       "el": "έργο",
       "es": "proyecto",
       "en": "Project",
       "sv": "Projekt",
       "ru": "проект"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-reference"},
      "label": {
       "hu": "hivatkozás",
       "et": "viide",
       "de": "referenz",
       "no": "kilde",
       "ro": "bibliografie",
       "el": "αναφορά",
       "es": "referencia",
       "en": "Reference",
       "sv": "Referens",
       "ru": "ссылка"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-tool"},
      "label": {
       "hu": "eszköz",
       "et": "vahend",
       "de": "werkzeug",
       "no": "verktøy",
       "ro": "mijloc de invatare",
       "el": "εργαλείο",
       "es": "herramienta",
       "en": "Tool",
       "sv": "Verktyg",
       "ru": "инструмент"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-simulation"},
      "label": {
       "hu": "szimuláció",
       "et": "simulatsioon",
       "de": "simulation",
       "no": "simulering",
       "ro": "simularea",
       "el": "προσομοίωση",
       "es": "simulación",
       "en": "Simulation",
       "sv": "Simulering",
       "ru": "моделирование"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-rolePlay"},
      "label": {
       "hu": "szerepjáték",
       "et": "rollimäng",
       "de": "rollenspiel",
       "no": "rollespill",
       "ro": "interpretarea unor roluri",
       "el": "παιχνίδι ρόλων",
       "es": "juego de rol",
       "en": "Role play",
       "sv": "Rollspel",
       "ru": "ролевая игра"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-webResource-wiki"},
      "label": {
       "hu": "internetes forrás: Wiki",
       "et": "veebiressurss: Wiki",
       "de": "web-ressource: Wiki",
       "no": "nettressurs: Wiki",
       "ro": "resurse web: Wiki",
       "el": "δικτυακή πηγή: Wiki",
       "es": "recurso web: Wiki",
       "en": "Web resource: Wiki",
       "sv": "Webb-resurs: Wiki",
       "ru": "веб-ресурс: вики"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-webResource-webPage"},
      "label": {
       "hu": "internetes forrás: Weboldal",
       "et": "veebiressurss: Veebileht",
       "de": "web-ressource: Web-site",
       "no": "nettressurs: Nettside",
       "ro": "resurse web: Pagina web",
       "el": "δικτυακή πηγή: ιστοσελίδα",
       "es": "recurso web: Página web",
       "en": "Web resource: Web Page",
       "sv": "webb-resurs: Webb-sida",
       "ru": "веб-ресурс: веб-страница"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-webResource-weblog"},
      "label": {
       "hu": "internetes forrás: internetes napló (weblog)",
       "et": "veebiressurss: blogi",
       "de": "web-ressource: weblog",
       "no": "nettressurs: blogg",
       "ro": "resurse web: blog web",
       "el": "δικτυακή πηγή: weblog",
       "es": "recurso web: bitácora web",
       "en": "Web resource: Weblog",
       "sv": "Webb-resurs: Blogg",
       "ru": "веб-ресурс: блог"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-webResource-otherWebResource"},
      "label": {
       "hu": "internetes forrás: egyéb internetes forrás",
       "et": "veebiressurss: muu veebiressurss",
       "de": "web-ressource: sonstige web-ressource",
       "no": "nettressurs: annen nettressurs",
       "ro": "resurse web: alte resurse web",
       "el": "δικτυακή πηγή: άλλη δικτυακή πηγή",
       "es": "recurso web: otro recurso web",
       "en": "Web resource: Other web resource",
       "sv": "Webb-resurs: Annan slags web-resurs",
       "ru": "веб-ресурс: другие веб-ресурсы"
      }
     },
     {
      "value": {"uri": "http://organic-edunet.eu/LOM/rdf/voc#LearningResourceType-other"},
      "label": {
       "hu": "egyéb",
       "et": "muu",
       "de": "sonstiges",
       "no": "annet",
       "ro": "altele",
       "el": "άλλο",
       "es": "otro",
       "en": "Other",
       "sv": "Annat",
       "ru": "другое"
      }
     }
    ]
   }
  ]
 }
}