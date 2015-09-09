  * Form based editing and presentation of RDF
  * Forms are designed via RForm-templates
  * Handles both flat and deep RDF (non-cyclic with a single root)
  * Handles repeated properties anywhere in the structure
  * Handles editing of both object _and_ predicate in triples
  * Special field editors for datatypes like dates, integers etc.
  * RForm-templates provides _choices_ that can be selected from expandable trees, dropdowns, radiobuttons etc.
    * Choices can be provided as fixed lists
    * Choices can be detected from external RDF Schemas (serverside support required or manual inclusion required)
  * Multi language support
  * Keeps RDF expression minimal by removing "empty constructs"
  * Intermediate RDF constructions can be hidden
  * Sections can be introduced in the form without there being a corresponding structure in RDF
  * A form can be assembled from a set of single-property form-templates for a specific resource.
  * Works with the RDF/JSON format internally
  * Repository of RForm-templates for well known RDF Schemas (work in progress)
  * Can be used both in RIA or for progressive enhancement of webpages