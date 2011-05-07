tinyMCEPopup.requireLangPack();

var FileLinkDialog = {
	init : function() {
    var filesDiv = document.getElementById('filelink_available_files');
    var available_files = tinyMCE.activeEditor.getParam('filelink_available_files');
    var link_text = tinyMCEPopup.editor.selection.getContent({format : 'text'});
    for (var i=0; i<available_files.length; ++i) {
      var anc = document.createElement('a');
      anc.innerHTML = available_files[i].name;
      anc.href = available_files[i].url;
      anc.style.cursor = "pointer";
      if (link_text == '' || link_text === null) {
        anc.onclick = function() {
          tinyMCEPopup.editor.execCommand('mceInsertRawHTML', false, '<a href="'+this.href+'">'+this.innerHTML+'</a>');
          tinyMCEPopup.close();
          return false;
        };
      } else {
        anc.onclick = function() {
          tinyMCEPopup.restoreSelection();
          tinyMCEPopup.editor.execCommand('mceInsertLink', false, this.href);
          tinyMCEPopup.close();
          return false;
        };
      }
      filesDiv.appendChild(anc);
      filesDiv.appendChild(document.createElement('br'));
    }
	},

};

tinyMCEPopup.onInit.add(FileLinkDialog.init, FileLinkDialog);
