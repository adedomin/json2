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

var handle_control = (val) => {
    val = val.replace(/\\/g, '\\\\')
             .replace(/"/g, '\\"')
             .replace(/\r/g, '\\r')
             .replace(/\n/g, '\\n')
             .replace(/\f/g, '\\f')
    return val
}

var escape_special = (val) => {
    if (typeof val == 'number') return val
    val = handle_control(val)
    if (val.indexOf('/') > -1) val = `"${val}"`
    else if (val.indexOf('[') > -1) val = `"${val}"`
    else if (val.indexOf(']') > -1) val = `"${val}"`
    else if (/^\d+$/.test(val)) val = `"${val}"`
    return val
}

var json2 = (obj, path, cb) => {
    if (obj instanceof Array) {
        obj.forEach((val, index) => {
            val = escape_special(val)
            cb(`${path}[${index}]/${val}`)
        })
    }
    else if (obj instanceof Object) {
        Object.keys(obj).forEach(key => {
            key = escape_special(key)
            json2(obj[key], `${path}/${key}`, cb)
        })
    }
    else {
        obj = escape_special(obj)
        cb(`${path}/${obj}`)
    }
}

module.exports = json2
