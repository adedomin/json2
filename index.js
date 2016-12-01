/* Copyright (c) 2016, prussian <genunrest@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var json2 = (obj, path, cb) => {
    if (obj instanceof Array) {
        obj.forEach((val, index) => {
            if (val.indexOf('"') > -1) val = val.replace(/"/g, '\\"')
            if (val.indexOf('/') > -1) val = `"${val}"`
            cb(`${path}[${index}]/${val}`)
        })
    }
    else if (obj instanceof Object) {
        Object.keys(obj).forEach(key => {
            if (key.indexOf('"') > -1) key = key.replace(/"/g, '\\"')
            if (key.indexOf('/') > -1) key = `"${key}"`
            json2(obj[key], `${path}/${key}`, cb)
        })
    }
    else {
        if (obj.indexOf('"') > -1) obj = obj.replace(/"/g, '\\"')
        if (obj.indexOf('/') > -1) obj = `"${obj}"`
        cb(`${path}/${obj}`)
    }
}

module.exports = json2
