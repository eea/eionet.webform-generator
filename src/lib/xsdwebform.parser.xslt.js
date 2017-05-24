/**
 * @file xsdwebform.parser.xslt.js
 * XSD Schema to HTML5 Web Form
 * @author George Bouris <gb@eworx.gr>
 * @copyright Copyright (C) 2017 EEA, Eworx, George Bouris. All rights reserved.
 */

/**
 * Class XSDWebFormParserXSLT
 * Parser for XSD to XSLT
 * Static
 */
class XSDWebFormParserXSLT {
	/**
	 * Class constructor
	 */
	constructor() {
		this.showLog = false;
		this.verbose = false;
	}

	/**
	 * createXSLTOutput
	 */
	createXSLTOutput(htmlItem) {
		var output = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h2>Data</h2>
  <table border="1">
    <tr bgcolor="#ECF4F5">
      `;
		var outputView = `    <xsl:for-each select="items/item">
    <tr>
    `;
		// Loop through Tag's childNodes
		let forms = htmlItem.childNamed("page").childrenNamed("form");
		for (let fi = 0, fl = forms.length; fi < fl; fi++) {
			let groups = forms[fi].childrenNamed("group");
			for (let gi = 0, gl = groups.length; gi < gl; gi++) {
				for (let i = 0, l = groups[gi].children.length; i < l; i++) {
					if (groups[gi].children[i].type === "element") {
						output += `\t<th style="text-align:left">${groups[gi].children[i].attr.name || groups[gi].children[i].attr.element}</th>\n`;						
						outputView += `\t<td><xsl:value-of select="${groups[gi].children[i].attr.name || groups[gi].children[i].attr.element}"/></td>\n`;						
					}
				}
			}
		}

		return `${output}    </tr> 
${outputView}    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>`;

	}


	/**
	 * setLog  - Show Log
	 * @param bool
	 */
	setLog(bool) {
		this.showLog = bool;
	}

	/**
	 * setVerbose - Show Log verbose
	 * @param bool
	 */
	setVerbose(bool) {
		this.verbose = bool;
	}

	/**
	 * getLog - Show Log
	 */
	getLog() {
		return this.showLog;
	}

	/**
	 * getLog - Show Log
	 */
	getVerbose() {
		return this.verbose;
	}
	
}


module.exports = XSDWebFormParserXSLT;