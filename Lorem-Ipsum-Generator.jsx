var panelGlobal = this;
var palette = (function () {

    //JSON
    "object" != typeof JSON && (JSON = {}), function () { "use strict"; function f(t) { return t < 10 ? "0" + t : t } var cx, escapable, gap, indent, meta, rep; function quote(t) { return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var n, r, o, f, u, i = gap, p = e[t]; switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), "function" == typeof rep && (p = rep.call(e, t, p)), typeof p) { case "string": return quote(p); case "number": return isFinite(p) ? String(p) : "null"; case "boolean": case "null": return String(p); case "object": if (!p) return "null"; if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(p)) { for (f = p.length, n = 0; n < f; n += 1)u[n] = str(n, p) || "null"; return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]" : "[" + u.join(",") + "]", gap = i, o } if (rep && "object" == typeof rep) for (f = rep.length, n = 0; n < f; n += 1)"string" == typeof rep[n] && (o = str(r = rep[n], p)) && u.push(quote(r) + (gap ? ": " : ":") + o); else for (r in p) Object.prototype.hasOwnProperty.call(p, r) && (o = str(r, p)) && u.push(quote(r) + (gap ? ": " : ":") + o); return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}" : "{" + u.join(",") + "}", gap = i, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }), "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, n) { var r; if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1)indent += " "; else "string" == typeof n && (indent = n); if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) { var j; function walk(t, e) { var n, r, o = t[e]; if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (void 0 !== (r = walk(o, n)) ? o[n] = r : delete o[n]); return reviver.call(t, e, o) } if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();

    if (app.settings.haveSetting("loremIpsumGenerator", "userSettings")) {
        var savedUserSettings = app.settings.getSetting("loremIpsumGenerator", "userSettings");
        var userSettings = JSON.parse(savedUserSettings);
    } else var userSettings = [1, 0, true, false];

    var loremIpsumGenerator = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) loremIpsumGenerator.text = "Lorem Ipsum Generator";
    loremIpsumGenerator.orientation = "column";
    loremIpsumGenerator.alignChildren = ["center", "top"];
    loremIpsumGenerator.spacing = 15;
    loremIpsumGenerator.margins = 16;

    var userSettingsGroup = loremIpsumGenerator.add("group", undefined, { name: "userSettingsGroup" });
    userSettingsGroup.orientation = "row";
    userSettingsGroup.alignChildren = ["left", "center"];

    var enteredAmount = userSettingsGroup.add('edittext {justify: "center", properties: {name: "enteredAmount"}}');
    enteredAmount.text = userSettings[0];
    enteredAmount.preferredSize.width = 36;

    var enteredStructure_array = ["Paragraphs", "Sentences", "Words"];
    var enteredStructure = userSettingsGroup.add("dropdownlist", undefined, undefined, { name: "enteredStructure", items: enteredStructure_array });
    enteredStructure.selection = userSettings[1];

    var tickBoxes = loremIpsumGenerator.add("group", undefined, { name: "tickBoxes" });
    tickBoxes.orientation = "column";
    tickBoxes.alignChildren = ["left", "center"];
    tickBoxes.spacing = 10;
    tickBoxes.margins = 0;

    var loremIpsum = tickBoxes.add("checkbox", undefined, undefined, { name: "loremIpsum" });
    loremIpsum.text = "Start with Lorem";
    loremIpsum.value = (userSettings[2] == true) ? true : false;


    var appendText = tickBoxes.add("checkbox", undefined, undefined, { name: "appendText" });
    appendText.text = "Append Text";
    appendText.value = (userSettings[3] == true) ? true : false;

    var generate = loremIpsumGenerator.add("button", undefined, undefined, { name: "generate" });
    generate.text = "Generate";
    generate.onClick = function () {
        userSettings = [enteredAmount.text, enteredStructure.selection.index, loremIpsum.value, appendText.value];
        app.settings.saveSetting("loremIpsumGenerator", "userSettings", JSON.stringify(userSettings));
        typelorem();
    };

    loremIpsumGenerator.layout.layout(true);
    loremIpsumGenerator.layout.resize();
    loremIpsumGenerator.onResizing = loremIpsumGenerator.onResize = function () { this.layout.resize(); }

    if (loremIpsumGenerator instanceof Window) loremIpsumGenerator.show();

    function typelorem() {

        if (app.project.activeItem == null || app.project.activeItem.selectedLayers[0] == null || app.project.activeItem.selectedLayers[0]("Source Text") == null) {
            alert("Please select a text layer to write to.")
            return false;
        } else {
            var activeComp = app.project.activeItem;
            var textLayer = activeComp.selectedLayers[0].property("Source Text");
        }

        var textProp, textDocument;
        var text = [];
        var startingSentence = ["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit,", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua. "];
        var loremWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "ut", "aliquam", "purus", "sit", "amet", "luctus", "venenatis", "lectus", "magna", "fringilla", "urna", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus", "viverra", "vitae", "congue", "eu", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum", "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor", "id", "aliquet", "lectus", "proin", "nibh", "nisl", "condimentum", "id", "venenatis", "a", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus", "urna", "et", "pharetra", "pharetra", "massa", "massa", "ultricies", "mi", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis", "purus", "sit", "amet", "volutpat", "consequat", "mauris", "nunc", "congue", "nisi", "vitae", "suscipit", "tellus", "mauris", "a", "diam", "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra", "magna", "ac", "placerat", "vestibulum", "lectus", "mauris", "ultrices", "eros", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum", "faucibus", "vitae", "aliquet", "nec", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lorem", "donec", "massa", "sapien", "faucibus", "et", "molestie", "ac", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi", "scelerisque", "eu", "ultrices", "vitae", "auctor", "eu", "augue", "ut", "lectus", "arcu", "bibendum", "at", "varius", "vel", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque", "volutpat", "ac", "tincidunt", "vitae", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est", "sit", "amet", "facilisis", "magna", "etiam", "tempor", "orci", "eu", "lobortis", "elementum", "nibh", "tellus", "molestie", "nunc", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan", "lacus", "vel", "facilisis", "volutpat", "est", "velit", "egestas", "dui", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit", "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc", "consequat", "interdum", "varius", "sit", "amet", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo", "laoreet", "sit", "amet", "cursus", "sit", "amet", "dictum", "sit", "amet", "justo", "donec", "enim", "diam", "vulputate", "ut", "pharetra", "sit", "amet", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis", "nisl", "rhoncus", "mattis", "rhoncus", "urna", "neque", "viverra", "justo", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis", "bibendum", "ut", "tristique", "et", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum", "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus", "dictum", "at", "tempor", "commodo", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit", "scelerisque", "in", "dictum", "non", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus", "in", "mollis", "nunc", "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci", "ac", "auctor", "augue", "mauris", "augue", "neque", "gravida", "in", "fermentum", "et", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum", "odio", "eu", "feugiat", "pretium", "nibh", "ipsum", "consequat", "nisl", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris", "cursus", "mattis", "molestie", "a", "iaculis", "at", "erat", "pellentesque", "adipiscing", "commodo", "elit", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc", "faucibus", "a", "pellentesque", "sit", "amet", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi", "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna", "molestie", "at", "elementum", "eu", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie"]


        if (userSettings[1] == 0) {
            paragraph(userSettings[0]);
        } else if (userSettings[1] == 1) {
            sentence(userSettings[0], 0);
        }
        else {
            for (l = 0; l < userSettings[0]; l++) {
                if (l < 2 && userSettings[2] == true && userSettings[3] == false || textLayer.value == "") {
                    text.push(startingSentence[l] + " ")
                } else text.push(loremWords[getRandomInt(0, loremWords.length - 1)] + " ");
            }
        }

        function paragraph(amount) {
            for (var k = 0; k < amount; k++) {
                sentenceAmount = getRandomInt(3, 8);
                sentence(sentenceAmount, k)
                text.push("\n\n")
            }
        }

        function sentence(amount, firstLine) {
            for (var i = 0; i < amount; i++) {
                if (i == 0 && firstLine == 0 && userSettings[2] == true && userSettings[3] == false || textLayer.value == "") {
                    text.push(startingSentence.join(" "));
                } else words();
            }
        }

        function words() {
            var sentenceLength = getRandomInt(10, 30);
            var commaAmount = getRandomInt(5, 15);
            for (var j = 0; j < sentenceLength; j++) {
                var randomWord = getRandomInt(0, loremWords.length - 1);
                if (j == 0) {
                    text.push(loremWords[randomWord][0].toUpperCase() + loremWords[randomWord].substr(1));
                } else if (j == commaAmount && j < sentenceLength - 6) {
                    text.push(loremWords[randomWord] + ", ");
                    commaAmount = getRandomInt((5 + j), (15 + j));
                } else if (j == sentenceLength - 1) {
                    text.push(loremWords[randomWord] + ". ");
                } else {
                    text.push(loremWords[randomWord] + " ");
                }
            }
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (userSettings[3] == true) {
            textLayer.setValue(textLayer.value.toString() + text.join(" "));
        } else {
            textLayer.setValue(text.join(""));
        }


    }

    return palette;

}());