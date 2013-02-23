/**
* The MIT License (MIT)
* Copyright (c) 2013 Juan M. Hidalgo
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
* associated documentation files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
* of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
* LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
* OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var localCache = (function(){
    var LocalCache = function(){
    };

    var expires_key = '_expires',
        cache_key_prefix = 'cached-';

    LocalCache.prototype.setItem = function(key, value, expires){
        localStorage.setItem(cache_key_prefix + key, JSON.stringify(value));
        if(expires){
             localStorage.setItem(cache_key_prefix + key + expires_key, (new Date()).getTime() + (+expires * 1000));
        }
    };

    LocalCache.prototype.getItem = function(key){
        var val = localStorage.getItem(cache_key_prefix + key),
            expires;
        if(val && localStorage.getItem(cache_key_prefix + key + expires_key)){
            expires = +localStorage.getItem(cache_key_prefix + key + expires_key);
            if( (expires - (new Date()).getTime() ) / 1000 < 0){
                val = null;
                localStorage.removeItem(cache_key_prefix + key);
                localStorage.removeItem(cache_key_prefix + key + expires_key);
            }
        }
        if(val){
            return JSON.parse(val);
        }else{
            return null;
        }
    };

    LocalCache.prototype.removeItem = function(key){
        localStorage.removeItem(cache_key_prefix + key);
        localStorage.removeItem(cache_key_prefix + key + expires_key);
    };

    LocalCache.prototype.clear = function(){
        setTimeout(function(){
            var re = /^cached\-/, p;
            for(p in localStorage){
                if(re.test(p)){
                    localStorage.removeItem(p);
                }
            }
        },0);
    };

    return new LocalCache();

}());