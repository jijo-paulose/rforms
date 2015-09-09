# Clean up style/class mixup #
Currently RForms-templates has both a class and a style attribute and their use is a bit unclear. A better approach would be to let the classes be transferred over to regular html classes, without any interpretation of RForms. Style should correspond to inline style similar to how it is done in HTML, although with RForms specific semantics. For instance, a style attribute could be "rows" with allowed values being either an integer or "auto" where "1" would be the default.

# Support for editing of RForms-templates #
Even though the json format are intended to be intuitive, there are many attributes and possible values to remember. A web based editor for editing the RForms-templates would be useful for both beginners and experienced authors of RForms-templates.

# Server side support for generating choices from ontologies #
Support for calculating choices from ontologies are today missing. The RForms-template allows an ontology to be specified via an URL. Combined with the constraints the choices can be calculated and possibly ordered into an hierarchy if the neccessary attributes are provided. A server-side solution would simply take this information and generate a set of (possibly ordered) choices as a response. Today the choices are manually incorporated into the RForms-template in the `cachedChoices` attribute.

# Server side support for managing RForms-templates #
There is today no support for managing RForms-templates. As described in the [Tutorial](Tutorial.md) and the [server integration](ServerIntegration.md) page the RForms-templates are today often made available inline or loaded into the application via script tags. A special service for managing RForms-templates could allow authors manage a stable library of RForms-templates for common vocabulary and also allow them to be combined easily without requiring copy paste. The service should also use the choice generation service described above to inline the choices to minimize the amount of requests from the client. It could also integrate the editor described above.

# Support W3C RDF API (still an editors draft) #
It would be nice if the rdfjson API implement the http://www.w3.org/2010/02/rdfa/sources/rdf-interfaces/