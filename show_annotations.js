// ==UserScript==
// @name           Show Annotations
// @namespace      openanno
// @description    Shows annotations on tweets
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://explore.twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

// test url http://api.twitter.com/1/statuses/show/15030304564.json
//

css = ""
css += ".annotations {                          "
css += "    display: none;background:#eee;                    "
css += "    font-size: 11px;                    "
css += "    clear: both;                        "
css += "    overflow: auto;padding:10px;                     "
css += "}                                       "
css += "                                        "
css += ".annotations li {                       "
css += "  margin: 5px;                          "
css += "}                                       "
css += "                                        "
css += ".annotations .annotation_type {         "
css += "  clear: both;                          "
css += "  text-decoration: underline;           "
css += "}                                       "
css += ".annotations dl {                       "
css += "  margin-bottom: 10px;                  "
css += "}                                       "
css += "                                        "
css += ".annotations dt {                       "
css += "  margin: 0px;                          "
css += "  margin-left: 10px;                    "
css += "  padding-right: 20px;                  "
css += "  font-weight: normal;width:100px;                  "
css += "  font-style: italic;float:left; clear: left;                   "
css += "}                                       "
css += ".annotations dl dd {                    "
css += "  margin-left: 10px;                    "
css += "  padding: 0 0  0;                      "
css += "}                                       "
css += ".annotation_button {                                                               "
css += "	background: #222 url(http://www.zurb.com/images/alert-overlay.png) repeat-x;     "
css += "	display: inline-block;                                                           "
css += "	width: 150px;   margin: 5px;                                                        "
css += "	text-align: center;                                                           "
css += "	padding: 5px 10px 6px;                                                           "
css += "	color: #fff;                                                                     "
css += "	text-decoration: none;                                                           "
css += "	-moz-border-radius: 5px;                                                         "
css += "	-webkit-border-radius: 5px;                                                      "
css += "	-moz-box-shadow: 0 1px 3px rgba(0,0,0,0.5);                                      "
css += "	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.5);                                   "
css += "	text-shadow: 0 -1px 1px rgba(0,0,0,0.25);                                        "
css += "	border-bottom: 1px solid rgba(0,0,0,0.25);                                       "
css += "	position: relative;                                                              "
css += "	cursor: pointer;                                                                 "
css += "	font-size: 9px; padding: 0px;                                                      "
css += "}                                                                                  "

$("head").append('<style>' + css + '</style>');


function processJson(response) {

    var statusId = response.id

    if (response.annotations) {

        status_div = $("#status_" + statusId);

        status_div.append("<div id=\"annotation_button_"+statusId+"\" class=\"annotation_button\">Show Annotations</div>");
        status_div.find(".annotation_button").toggle(
        function() {
            $("#annotation_list_"+statusId).slideDown();
            $("#annotation_button_" + statusId).text("Hide Annotations");
        },
        function() {
            $("#annotation_list_" + statusId).slideUp(function() {
            $("#annotation_button_" + statusId).text("Show Annotations")
            });
        });

        var output = "<ul class=\"annotations\" id=\"annotation_list_"+statusId+"\">"

        for (var i = 0; i < response.annotations.length; i++) {
          
            for( var type in response.annotations[i] ) {
          
            output += "<li><span class=\"annotation_type\">" + type + "</span>"
            output += "<dl>"

            for (var name in response.annotations[i][type]) {
                output += "<dt>" + name + "</dt><dd>" + response.annotations[i][type][name] + "</dd>"
            }

            output += "</dl>"
            output += "</li>"
          }
        }

        output += "</ul>";

        status_div.append(output);

    }

}


function pimpStatus(statusId) {

    var url = "http://api.twitter.com/1/statuses/show/" + statusId + ".json?callback=processJson"

    _my_script = document.createElement('script');
    _my_script.type = 'text/javascript';
    _my_script.src = url;
    document.getElementsByTagName('head')[0].appendChild(_my_script);

}


statusIds = []

$(".status").each(function(i) {
    statusIds[i] = $(this).attr("id").replace(/status_/, "");
})

for (var i = 0; i < statusIds.length; i++) {
    pimpStatus(statusIds[i])
}

//$(".status").fadeOut()
//$.get( url, [ data ], [ callback(data, textStatus, XMLHttpRequest) ]






