"use strict";
Editor.polymerElement({
    behaviors: [Editor.UI.PolymerFocusable],
    listeners: {
        keydown: "_onKeyDown"
    },
    properties: {
        prop: {
            value: function() {
                return {
                    path: "",
                    type: "",
                    name: "",
                    attrs: {},
                    value: null
                }
            },
            notify: true
        },
    },
    ready: function() {
        this._initFocusable(this)
    },
    _nameText: function(name) {
        return name ? Editor.UI._DomUtils.toHumanText(name) : "(Anonymous)"
    },
    _nameClass: function(name) {
        return name ? "name flex-1" : "name anonymous flex-1"
    },
    _onKeyDown: function(event) {
        if (13 === event.keyCode) {
            event.preventDefault();
            event.stopPropagation();
            var node = Editor.UI._DomUtils._getFirstFocusableChild(this.$.field);
            node && node.focus()
        }
    }
});