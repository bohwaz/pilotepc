/*!
 * jsPDF JavaScript plugin
 * global, jsPDF, API
 * Minified 21/03/2013
 */
(function(d){var b,a,c;d.addJS=function(e){c=e;this.internal.events.subscribe("postPutResources",function(f){b=this.internal.newObject();this.internal.write("<< /Names [(EmbeddedJS) "+(b+1)+" 0 R] >>","endobj");a=this.internal.newObject();this.internal.write("<< /S /JavaScript /JS (",c,") >>","endobj")});this.internal.events.subscribe("putCatalog",function(){if(b!==undefined&&a!==undefined){this.internal.write("/Names <</JavaScript "+b+" 0 R>>")}});return this}}(jsPDF.API));