
let ExtSlider = {};

ExtSlider.name = "UISlider";
ExtSlider.icon = "res/control/SliderBar.png";
ExtSlider.tag = 6;
ExtSlider.defBack = "res/default/SliderBack.png";
ExtSlider.defNormalBall = "res/default/SliderNodeNormal.png";
ExtSlider.defBarProgress = "res/default/SliderBar.png";

ExtSlider.GenEmptyNode = function() {
    node = new ccui.Slider(ExtSlider.defBack, ExtSlider.defNormalBall);
    node._barBg = ExtSlider.defBack;
    node._barNormalBall = ExtSlider.defNormalBall;

    setNodeSpriteFrame("barProgress", ExtSlider.defBarProgress, node, node.loadProgressBarTexture)
    node._className = ExtSlider.name;
    return node;
};

ExtSlider.GenNodeByData = function(data, parent) {
    return this.GenEmptyNode();
};

ExtSlider.SetNodePropByData = function(node, data, parent) {
    (data["percent"]) && (node.percent = data["percent"]);
    setNodeSpriteFrame("barBg", data["barBg"], node, node.loadBarTexture);
    setNodeSpriteFrame("barProgress", data["barProgress"], node, node.loadProgressBarTexture);
    setNodeSpriteFrame("barNormalBall", data["barNormalBall"], node, node.loadSlidBallTextureNormal);
    setNodeSpriteFrame("barSelectBall", data["barSelectBall"], node, node.loadSlidBallTexturePressed);
    setNodeSpriteFrame("barDisableBall", data["barDisableBall"], node, node.loadSlidBallTextureDisabled);
};

ExtSlider.ExportNodeData = function(node, data) {
    (node.percent) && (data["percent"] = node.percent);
    (node._barBg) && (data["barBg"] = node._barBg);
    (node._barProgress) && (data["barProgress"] = node._barProgress);
    (node._barNormalBall) && (data["barNormalBall"] = node._barNormalBall);
    (node._barSelectBall) && (data["barSelectBall"] = node._barSelectBall);
    (node._barDisableBall) && (data["barDisableBall"] = node._barDisableBall);
};

ExtSlider.SetPropChange = function(control, path, value) {
    if(path == "fontColor") {
        control._node.fontColor = new cc.Color(value.r, value.g, value.b, value.a);
    } else if(path == "placeholderFontColor") {
        control._node.placeholderFontColor = new cc.Color(value.r, value.g, value.b, value.a);
    } else if(path == "spriteBg") {
        ExtSlider.SetSpriteFrame(control._node, value);
    } else {
        control._node[path] = value;
    }
};

ExtSlider.ExportData = function(node) {
    this._node = node;
}

ExtSlider.ExportData.prototype = {
    __displayName__: "Slider",
    __type__: "cc.Slider",

    get totalLength() {
        return {
            path: "totalLength",
            type: "unit-input",
            name: "TotalLength",
            attrs: {
            },
            value: this._node.totalLength,
        };
    },

    get percent() {
        return {
            path: "percent",
            type: "slider",
            name: "percent",
            attrs: {
                expand: true,
                step: 0.1,
                precision: 1,
                min: 0,
                max: 100,
            },
            value: this._node.percent,
        };
    },


    get mode() {
        return {
            path: "mode",
            type: "select",
            name: "mode",
            attrs: {
                selects: {
                    0: "HORIZONTAL",
                    1: "VERTICAL",
                    2: "FILLED",
                }
            },
            value: this._node.mode || 0,
        };
    },

    get barBg() {
        return {
            path: "barBg",
            type: "asset",
            name: "barBg",
            attrs: {
            },
            value: this._node._barBg,
        };
    },

    get barProgress() {
        return {
            path: "barProgress",
            type: "asset",
            name: "barProgress",
            attrs: {
            },
            value: this._node._barProgress,
        };
    },

    get barNormalBall() {
        return {
            path: "barNormalBall",
            type: "asset",
            name: "barNormalBall",
            attrs: {
            },
            value: this._node._barNormalBall,
        };
    },

    get barSelectBall() {
        return {
            path: "barSelectBall",
            type: "asset",
            name: "barSelectBall",
            attrs: {
            },
            value: this._node._barSelectBall,
        };
    },

    get barDisableBall() {
        return {
            path: "barDisableBall",
            type: "asset",
            name: "barDisableBall",
            attrs: {
            },
            value: this._node._barDisableBall,
        };
    },

    get __props__() {
        return [
            // this.totalLength,
            this.percent,
            // this.mode,
            this.barBg,
            this.barProgress,
            this.barNormalBall,
            this.barSelectBall,
            this.barDisableBall,
        ];
    }
}

ExtSlider.PropComps = function(node) {
    let datas = [ new WidgetData(node) ];
    datas.push(new TouchData(node));
    datas.push(new ExtSlider.ExportData(node));
    return datas;
};

module.exports = ExtSlider;

RegisterExtNodeControl(ExtSlider.name, ExtSlider);
