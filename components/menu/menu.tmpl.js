function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function menuTmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"components\u002Fmenu\u002Fmenu.tmpl.pug":"div.menu\r\n  span.menu__title Заголовок\r\n  ul.menu__list\r\n    li.menu__item(data-index=\"0\")\r\n      a(href=\"mail.ru\", data-action=\"pick\") Сайт\r\n      i.close(data-action=\"remove\")\r\n"};
;pug_debug_line = 1;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Cdiv class=\"menu\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Cspan class=\"menu__title\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "Заголовок\u003C\u002Fspan\u003E";
;pug_debug_line = 3;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Cul class=\"menu__list\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Cli class=\"menu__item\" data-index=\"0\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Ca href=\"mail.ru\" data-action=\"pick\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "Сайт\u003C\u002Fa\u003E";
;pug_debug_line = 6;pug_debug_filename = "components\u002Fmenu\u002Fmenu.tmpl.pug";
pug_html = pug_html + "\u003Ci class=\"close\" data-action=\"remove\"\u003E\u003C\u002Fi\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}