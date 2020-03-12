function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  var css = $('.MsPortalImpl\\/Base\\/Base\\.Images\\.css')[0].sheet.cssRules
  var classes = {};
  
  for(var i = 0; i < css.length; i++) {
      var style = css[i];
      var selectortext = style.selectorText;
      if (selectortext) 
      {
          var selectors = selectortext.split(',');
          for(var j = 0; j < selectors.length; j++) {
              var sel = selectors[j].trim();
              if (sel && sel.split(/[\s.>]/).length === 2) {
                  var selectorClass = sel.split(/[\s.>]/)[1];
                  var csstext = style.style.cssText;
                  classes[selectorClass] = csstext;
              }
          }
      }
      
      
  }
  
  
  var icons = $("#FxSymbolContainer > svg > defs")
  var i = 0;
  var files = [];
  var fileNames = {};
  
  function applyCss(v) {
    var children = $(v).find('g').children();
      $.each(children, function(kchild, vchild) {
          var classList = vchild.classList;
          for(var i = 0; i < classList.length; i++) {
              var className = classList[i];
              if (className && classes[className]) {
                  $(vchild)
                      .attr('style', classes[className])
                      .removeAttr('class');
              }
          }
      })
  }
  
  $.each(icons, function(k, v) {
      applyCss(v);
      var html = v.innerHTML.replace("<symbol", "<svg").replace("</symbol>", "</svg>")
      i++;
      
  })
  
  var buttons = $('.fxs-sidebar-flyout-item-link');
  var gradients = {};
  
  $.each(buttons, function(k, v) {
      var text = $(v).find('.fxs-sidebar-label').text().trim();
      var linked = $(v).find('.fxs-sidebar-icon use');
      if(linked[0]) {
          var id = $(linked[0].href.baseVal)
          applyCss(id);
          var html = id[0].outerHTML;
      } else {
          var svg = $(v).find('svg');
          if (svg.find('use').attr('href'))
              svg = $(svg.find('use').attr('href'))
          applyCss(svg);
          var html = svg[0].outerHTML;
      }
      $(":not([fill=''])", $(html)).each(function () {
          var fill = $(this).attr('fill');
          if (fill && fill.indexOf('url(#') != -1)
          {	
              var id = fill.replace('url(','').replace(')','');
              if ($(html).find('defs').length == 0) {
                  html = html.replace('<title></title>','<title></title><defs><defs/>');
              }
              if ($(html).find('defs').find(id).length == 0)
              {
                  html = html.replace("<defs>", "<defs>" + $(id)[0].outerHTML);
                  
              }
          }
      });
      html = html
          .replace("<symbol", "<svg")
          .replace("<svg", "<svg xmlns=\"http://www.w3.org/2000/svg\" ")
          .replace("xmlns:xlink=\"http://www.w3.org/1999/xlink\"", "")
          .replace("xmlns:svg=\"http://www.w3.org/2000/svg\"", "")
          .replace("</symbol>", "</svg>")
      console.log(html)
      if (!fileNames[text.trim()]) {
          fileNames[text.trim()] = 1;
          files.push({fileName: text.trim() + '.svg', html: html});
      }
  })
  
  queuedFileDownload = function(i, files) {
      if (i < files.length) {
          download(files[i].fileName, files[i].html);
          i++;
          setTimeout(function(){
              queuedFileDownload(i, files);
          }, 500);
          
      }
  }
  queuedFileDownload(0, files);