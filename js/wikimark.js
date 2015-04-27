(function(window){
    'use strict';
    window.wikimark = function wikimark(text){

        var code = [];
        var index = [];
        var footnote = [];

        console.log('start parsing wikimark')

        //code
        var rCode = /@@@([\S\s]*?)@@@/;
        for (var i=rCode.exec(text);i!==null;i=rCode.exec(text)){
            var content = i[1];
            text = text.replace(rCode, '@<<<<' + code.length + '>>>>@');
            code.push(content);
        }

        console.log('saved code block')

        //titles
        var rTitle = /^(#+)(.*?)$/m;
        var indexBuf = [];
        for (var i=rTitle.exec(text);i!==null;i=rTitle.exec(text)){
            var level = i[1].length;
            var content = i[2];

            indexBuf = indexBuf.slice(0, level);
            indexBuf[level -1] = indexBuf[level -1] ? indexBuf[level -1] +1 : 1;
            index.push('<b>' + indexBuf.join('.') + '</b> ' + content);
            text = text.replace(rTitle, '<hr><h3 id="wikimark-title-' + indexBuf.join('-') + '"><strong>' + indexBuf.join('.') + ' ' + content + '</strong></h3>')
        }

        console.log('parsed titles')

        //footnotes
        var rFootnote = /\(\((.*?)\)\)/m;
        for (var i=rFootnote.exec(text);i!=null;i=rFootnote.exec(text)){
            var content = i[1];
            footnote.push(content);
            text = text.replace(rFootnote, '<a class="badge footnote-marker">' + footnote.length + '</a>');
        }

        console.log('parsed footnotes')

        //link
        var rLink = /\{\{(.*?)\}\}/m;
        for (var i=rLink.exec(text);i!==null;i=rLink.exec(text)){
            var content = i[1];
            if (content.includes('.')) {
                text = text.replace(rLink, '<a href="' + content + '">' + content + '</a>');
            } else {
                text = text.replace(rLink, '<a href="#/wiki/' + content + '">' + content + '</a>');
            }
        }

        console.log('parsed links')

        //image
        var rImage = /\[\[(.*?)\]\]/m;
        for (var i=rImage.exec(text);i!==null;i=rImage.exec(text)){
            var content = i[1];
            if (content.includes('.')) {
                text = text.replace(rLink, '<img src="' + content + '">');
            } else {
                text = text.replace(rLink, '<img src="https://hyeonu.com/i/' + content + '">');
            }
        }

        console.log('parsed images')

        //restore code
        var rsCode = /@<<<<(\d+)>>>>@/
        for (var i=rsCode.exec(text);i!==null;i=rsCode.exec(text)){
            var content = Number(i[1]);
            text = text.replace(rsCode, '<code class="code-highlight">' + code[content] + '</code>')
        }

        console.log('reloaded code blocks')

        var result = '<div><ol class="no-order">';
        for (var i in index) {
            result += '<li>' + index[i] + '</li>';
        }
        result += '</ol><pre>' + text + '</pre><ol class="no-order">';
        for (var i in footnote) {
            result += '<li><a class="badge footnote">' + (Number(i) +1) + '</a>' + footnote[i] + '</li>';
        }
        result += '</ol></div>'

        return result;
    };
})(this);