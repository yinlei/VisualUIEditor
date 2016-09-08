"use strict";
Editor.polymerElement({
    properties: {
        info: {
            type: String,
            value: "Unknown"
        },
        path: {
            type: String,
            value: "",
            observer: "_pathChanged"
        },
        mtime: {
            type: Number,
            value: 0
        }
    },
    _getSize: function() {
        return {
            width: this._image.width, 
            height: this._image.height,
        }
    },
    _pathChanged: function() {
        if(!this.path) {
            return;
        }
        var self = this;
        this._image = new Image;
        this._image.onload = function() {
            var size = self._getSize();
            self.info = size.width + " x " + size.height, self.resize()
        };
        this._image.src = this.path;

    },
    resize: function() {
        var contentRect = this.$.content.getBoundingClientRect(),
            imageSize = this._getSize(),
            size = Editor.Utils.fitSize(imageSize.width, imageSize.height, contentRect.width, contentRect.height);
        
        this.$.canvas.width = Math.ceil(size[0]);
        this.$.canvas.height = Math.ceil(size[1]);
        this.repaint();
    },
    repaint: function() {
        var canvas = this.$.canvas.getContext("2d");
        canvas.imageSmoothingEnabled = false;

        var w = this.$.canvas.width,
            h = this.$.canvas.height;
        canvas.drawImage(this._image, 0, 0, w, h);
    }
});