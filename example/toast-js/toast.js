function Toast(text, customObj) {
    var element = null;
    var targetEl = null;
    var inState = null;
    var outState = null;
    var shortTime = null;
    var longTime = null;
    var timer = null;
    var ticker = null;
    var customObj = customObj || {};
    
    init();

    // === Method ===
    function init() {
        element = document.createElement("DIV");
        element.className = "toastWrapper";
        element.innerText = text;
        if (customObj.targetEl) {
            targetEl = document.getElementById(customObj.targetEl);
        } else {
            targetEl = document.getElementsByTagName("body")[0];
            element.style.position = "fixed";
        }
        targetEl.appendChild(element);

        inState = setAnimateState(customObj.inState, "in");
        outState = setAnimateState(customObj.outState, "out");
        setJsTransition();

        //立即渲染
        element.style.cssText = outState;
        console.log(element.offsetHeight);

        shortTime = customObj.shortTime || 3000;
        longTime = customObj.longTime || 6000;
    }

    // === 設定層 ===
    //設定inState, outState
    function setAnimateState(customState, type) {
        //使用預設style
        if (customObj.style || !customObj.inState) {
            return styleKit(customObj.style, type);
        } else {
            //自訂style
            var state = "";
            for (var key in customState) {
                state += key + ":" + customState[key] + ";";
            }
            return state;
        }
    }

    //style library
    function styleKit(style, type) {
        var state = null;
        switch (style) {
            case "slide":
                theInState = "bottom:15px;";
                theOutState = "bottom:-50px";
                break;
            case "fadeInOut":
            default:
                theInState = "opacity:1";
                theOutState = "opacity:0";
                break;
        }
        state = (type === "in") ? theInState : theOutState;
        return state;
    }

    //若裝置不支援transition屬性，則用javascript實做漸變效果
    function setJsTransition() {
        if ("transition" in element.style || customObj.style) {
            return
        };
        if (!customObj.inState) {
            customObj.inState = {
                "opacity": 1
            };
            customObj.outState = {
                "opacity": 0
            };
        }
        customObj.transition = {};

        var inValue = null;
        var outValue = null;
        customObj.frame = (customObj.speed) ? (500 / customObj.speed) : 20;

        for (var key in customObj.inState) {
            customObj.transition[key] = {};
            inValue = parseFloat(customObj.inState[key]);
            outValue = parseFloat(customObj.outState[key]);
            customObj.transition[key].value = (inValue - outValue) / customObj.frame;
            customObj.transition[key].inValue = inValue;
            customObj.transition[key].outValue = outValue;
            //add unit
            if (typeof customObj.inState[key] === "string") {
                if (customObj.inState[key].indexOf("px") > 0) {
                    customObj.transition[key].unit = "px";
                } else if (customObj.inState[key].indexOf("%") > 0) {
                    customObj.transition[key].unit = "%";
                }
            }
        }
    }
    //=== 執行層 ===
    function show(duratation) {
        if (customObj.transition) {
            jsTransition(duratation);
        } else {
            cssTransition(duratation);
        }
    }

    function cssTransition(duratation) {
        element.style.cssText = inState;
        timer = setTimeout(function() {
            element.style.cssText = outState;
        }, duratation);
    }

    function jsTransition(duratation) {
        jsTransitionTicker("in");
        timer = setTimeout(function() {
            jsTransitionTicker("out");
        }, duratation);
    }

    function jsTransitionTicker(type) {
        var i = 0;
        ticker = setInterval(function() {
            if (i >= customObj.frame) {
                clearInterval(ticker)
            }
            jsTransitionClip(type, i);
            i++;
        }, customObj.speed);
    }

    function jsTransitionClip(type, i) {
        var theCssText = "";
        var startValue = (type === "in") ? "outValue" : "inValue";
        for (var key in customObj.transition) {

            theCssText += key + ":";
            if (type === "in") {
                theCssText += customObj.transition[key][startValue] + (customObj.transition[key].value * i);
            } else {
                theCssText += customObj.transition[key][startValue] - (customObj.transition[key].value * i);
            }
            theCssText += (customObj.transition[key].unit) ?
                customObj.transition[key].unit + ";" :
                ";";
        }
        element.style.cssText = theCssText;
    }

    function short() {
        show(shortTime)
    }

    function long() {
        show(longTime)
    }

    function closeMe() {
        clearTimeout(timer);
        clearInterval(ticker);
        element.style.cssText = outState;
    }

    // === API export ===
    return {
        "short": short,
        "long": long,
        "closeMe": closeMe
    };
}
