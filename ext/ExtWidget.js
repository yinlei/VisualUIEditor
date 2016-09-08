
let ExtWidget = {};

ExtWidget.name = "UIWidget";
ExtWidget.icon = "res/control/Node.png";
ExtWidget.tag = 0;

ExtWidget.GenEmptyNode = function() {
    let node = new ccui.Widget();
    node.setContentSize(cc.size(40, 40));
    node._className = ExtWidget.name;
    return node;
};

ExtWidget.GenNodeByData = function(data, parent) {
    return this.GenEmptyNode();
};


ExtWidget.SetNodePropByData = function(node, data, parent) {
};

ExtWidget.ExportNodeData = function(node, data) {

};

ExtWidget.SetPropChange = function(control, path, value) {
};

ExtWidget.ExportData = function(node) {
    this._node = node;
}

ExtWidget.ExportData.prototype = {
    __displayName__: "UIWidget",
    __type__: "ccui.UIWidget",

    get __props__() {
        return [];
    }
}

ExtWidget.PropComps = function(node) {
    let datas = [ new WidgetData(node) ];
    return datas;
};

module.exports = ExtWidget;

RegisterExtNodeControl(ExtWidget.name, ExtWidget);
