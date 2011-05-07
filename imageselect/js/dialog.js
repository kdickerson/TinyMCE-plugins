tinyMCEPopup.requireLangPack();

var ImageSelectDialog = {
	init : function() {
		var imagesDiv = document.getElementById('imageselect_available_images');
    var available_images = tinyMCE.activeEditor.getParam('imageselect_available_images');
    for (var i=0; i<available_images.length; ++i) {
      var image = document.createElement('img');
      var raw_html = available_images[i].raw_html;
      image.src = available_images[i].src;
      image.height = '50';
      image.style.marginRight = "5px";
      image.style.cursor = "pointer";
      image.raw_html = raw_html;
      image.onclick = function() {
        tinyMCEPopup.editor.execCommand('mceInsertRawHTML', false, this.raw_html); # 'this' will be the image
        tinyMCEPopup.close();
      };
      imagesDiv.appendChild(image);
    }
	}
};

tinyMCEPopup.onInit.add(ImageSelectDialog.init, ImageSelectDialog);
