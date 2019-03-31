const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
const md5 = require('md5')
const appKey = '1eebd64dff87e7ea';
const key = 'AcyAlPt6WUlI3C46m0HMlhXqjY1ccol5';

var translate = function (query) {
    var salt = (new Date).getTime()
    var str1 = appKey + query + salt + key
    var sign = md5(str1)
    console.log(query)
    $.ajax({
        url: 'http://openapi.youdao.com/api',
        type: 'post',
        dataType: 'jsonp',
        async: false,
        data: {
            q: query,
            appKey: appKey,
            salt: salt,
            from: '',
            to: 'en',
            sign: sign
        },
        success: function (data) {
            console.log(data) 
            return(data.translation[0]);
        }
    })
    console.log(3)
}


translate('你好aaaa')