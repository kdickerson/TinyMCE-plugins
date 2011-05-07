/**
 * editor_plugin_src.js
 *
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * 
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('simplelinebreaks');

	tinymce.create('tinymce.plugins.SimpleLinebreaksPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceSimpleLinebreaks', function() {
				// Do the replacement here, no dialog
        var contents = ed.selection.getContent();
        if (contents === null || 
            contents == "" ||
            contents.indexOf("</p>") == -1 || 
            contents.indexOf("</p>") == contents.lastIndexOf("</p>")) {
          return null;
        }
        
        contents = contents.replace(/<p>/g, "");
        contents = contents.replace(/<\/p>/g, "<br />");
        contents = contents.substring(0, contents.length-6); // remove last br tag
        contents = "<p>" + contents + "</p>";
        
        ed.selection.setContent(contents);
        contents = ed.getContent();
        contents = contents.replace(/<p>&nbsp;<\/p>/g, ""); // selection stuff is screwy, 2 blank paragraphs get created, we'll just toss all blank paragraphs.
        ed.setContent(contents);
			});

			// Register example button
			ed.addButton('simplelinebreaks', {
				title : 'simplelinebreaks.desc',
				cmd : 'mceSimpleLinebreaks',
				image : url + '/img/simplelinebreaks.gif'
			});
		},

		/**
		 * Creates control instances based in the incoming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Simple Linebreaks plugin',
				author : 'Kyle Dickerson',
				authorurl : '',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('simplelinebreaks', tinymce.plugins.SimpleLinebreaksPlugin);
})();
