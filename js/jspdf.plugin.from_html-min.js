/*!
 * jsPDF fromHTML plugin
 * jsPDF, API, fromHTML
 * Minified 21/03/2013
 */
(function(k){if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!String.prototype.trimLeft){String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}}if(!String.prototype.trimRight){String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")}}function i(v){var p=0,n=v.length,o,u=false,s=false;while(!u&&p!==n){o=v[p]=v[p].trimLeft();if(o){u=true}p++}p=n-1;while(n&&!s&&p!==-1){o=v[p]=v[p].trimRight();if(o){s=true}p--}var q=/\s+$/g,t=true;for(p=0;p!==n;p++){o=v[p].replace(/\s+/g," ");if(t){o=o.trimLeft()}if(o){t=q.test(o)}v[p]=o}return v}function d(o,n,q,p){this.pdf=o;this.x=n;this.y=q;this.settings=p;this.init();return this}d.prototype.init=function(){this.paragraph={text:[],style:[]};this.pdf.internal.write("q")};d.prototype.dispose=function(){this.pdf.internal.write("Q");return{x:this.x,y:this.y}};d.prototype.splitFragmentsIntoLines=function(x,B){var r=12,s=this.pdf.internal.scaleFactor,n={},q,t,o,v,p,z,A,u,D=[],C=[D],w=0,y=this.settings.width;while(x.length){v=x.shift();p=B.shift();if(v){q=p["font-family"];t=p["font-style"];o=n[q+t];if(!o){o=this.pdf.internal.getFont(q,t).metadata.Unicode;n[q+t]=o}z={widths:o.widths,kerning:o.kerning,fontSize:p["font-size"]*r,textIndent:w};A=this.pdf.getStringUnitWidth(v,z)*z.fontSize/s;if(w+A>y){u=this.pdf.splitTextToSize(v,y,z);D.push([u.shift(),p]);while(u.length){D=[[u.shift(),p]];C.push(D)}w=this.pdf.getStringUnitWidth(D[0][0],z)*z.fontSize/s}else{D.push([v,p]);w+=A}}}return C};d.prototype.RenderTextFragment=function(q,o){var p=12,n=this.pdf.internal.getFont(o["font-family"],o["font-style"]);this.pdf.internal.write("/"+n.id,(p*o["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(q)+") Tj")};d.prototype.renderParagraph=function(){var w=i(this.paragraph.text),y=this.paragraph.style,v=this.paragraph.blockstyle,t=this.paragraph.blockstyle||{};this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:v};if(!w.join("").trim()){return}var z=this.splitFragmentsIntoLines(w,y),A,u,n=12,s=n/this.pdf.internal.scaleFactor,x=(Math.max((v["margin-top"]||0)-(t["margin-bottom"]||0),0)+(v["padding-top"]||0))*s,r=((v["margin-bottom"]||0)+(v["padding-bottom"]||0))*s,p=this.pdf.internal.write,q,o;this.y+=x;p("q","BT",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");while(z.length){A=z.shift();u=0;for(q=0,o=A.length;q!==o;q++){if(A[q][0].trim()){u=Math.max(u,A[q][1]["line-height"],A[q][1]["font-size"])}}p(0,(-1*n*u).toFixed(2),"Td");for(q=0,o=A.length;q!==o;q++){if(A[q][0]){this.RenderTextFragment(A[q][0],A[q][1])}}this.y+=u*s}p("ET","Q");this.y+=r};d.prototype.setBlockBoundary=function(){this.renderParagraph()};d.prototype.setBlockStyle=function(n){this.paragraph.blockstyle=n};d.prototype.addText=function(o,n){this.paragraph.text.push(o);this.paragraph.style.push(n)};var g={helvetica:"helvetica","sans-serif":"helvetica",serif:"times",times:"times","times new roman":"times",monospace:"courier",courier:"courier"},c={"100":"normal","200":"normal","300":"normal","400":"normal","500":"bold","600":"bold","700":"bold","800":"bold","900":"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},m={normal:"normal",italic:"italic",oblique:"italic"},a={normal:1};function e(n){var p,q=n.split(","),o=q.shift();while(!p&&o){p=g[o.trim().toLowerCase()];o=q.shift()}return p}function f(n){var o,q=16,p=a[n];if(p){return p}p=({"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0})[n];if(p!==o){return a[n]=p/q}if(p=parseFloat(n)){return a[n]=p/q}p=n.match(/([\d\.]+)(px)/);if(p.length===3){return a[n]=parseFloat(p[1])/q}return a[n]=1}function h(q){var n=$(q),p={},o;p["font-family"]=e(n.css("font-family"))||"times";p["font-style"]=m[n.css("font-style")]||"normal";o=c[n.css("font-weight")]||"normal";if(o==="bold"){if(p["font-style"]==="normal"){p["font-style"]=o}else{p["font-style"]=o+p["font-style"]}}p["font-size"]=f(n.css("font-size"))||1;p["line-height"]=f(n.css("line-height"))||1;p.display=n.css("display")==="inline"?"inline":"block";if(p.display==="block"){p["margin-top"]=f(n.css("margin-top"))||0;p["margin-bottom"]=f(n.css("margin-bottom"))||0;p["padding-top"]=f(n.css("padding-top"))||0;p["padding-bottom"]=f(n.css("padding-bottom"))||0}return p}function j(s,u,v){var r=false;var q,n,p,o=v["#"+s.id];if(o){if(typeof o==="function"){r=o(s,u)}else{q=0;n=o.length;while(!r&&q!==n){r=o[q](s,u);q++}}}o=v[s.nodeName];if(!r&&o){if(typeof o==="function"){r=o(s,u)}else{q=0;n=o.length;while(!r&&q!==n){r=o[q](s,u);q++}}}return r}function l(r,t,n){var o=r.childNodes,u,v=h(r),p=v.display==="block";if(p){t.setBlockBoundary();t.setBlockStyle(v)}for(var s=0,q=o.length;s<q;s++){u=o[s];if(typeof u==="object"){if(u.nodeType===1&&u.nodeName!="SCRIPT"){if(!j(u,t,n)){l(u,t,n)}}else{if(u.nodeType===3){t.addText(u.nodeValue,v)}}}else{if(typeof u==="string"){t.addText(u,v)}}}if(p){t.setBlockBoundary()}}function b(p,q,n,u,s){if(typeof q==="string"){q=(function(w){var v="jsPDFhtmlText"+Date.now().toString()+(Math.random()*1000).toFixed(0),r="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",x=$('<div style="'+r+'"><iframe style="height:1px;width:1px" name="'+v+'" /></div>').appendTo(document.body),y=window.frames[v];return $(y.document.body).html(w)[0]})(q)}var t=new d(p,n,u,s),o=l(q,t,s.elementHandlers);return t.dispose()}k.fromHTML=function(p,n,q,o){return b(this,p,n,q,o)}})(jsPDF.API);