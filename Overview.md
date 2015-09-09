# Introduction #
RForms, short for RDF Forms, is a javascript library that provides a way to declarative describe how editors and presentation views of RDF should look like. The configuration mechanism, RForm-templates elliminates the need for programming once the library has been deployed into an environment. The RDF/JSON format is supported natively in the client.

# Background #
RForms is the sixth iteration of building an editing framework for RDF that was started already in 2001. The configuration mechanism has been at the central stage of the development process almost from the beginning. For a long time the configuration mechanism consisted of two parts, a graph pattern and a form template. With RForms two major changes was introduced. First, the two parts of the configuration mechanism where merged and a dedicated format based on JSON was introduced. Second, the library was rewritten as a pure javascript library.

RForms was previously known as SHAME.