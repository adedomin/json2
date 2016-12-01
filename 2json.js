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

var jsonline = require('./2json-line'),
    _ = require('lodash')

var _2json = (lines, obj = {}) => {
    if (lines.length > 0) {
        var line = lines.shift()
        if (/^\s*$/.test(line)) return _2json(lines, obj)
        line = jsonline.parse(line)
        return _2json(lines, _.mergeWith(obj, line, (l, r) => {
            if (l instanceof Array && r instanceof Array)
                return l.concat(r)
            return undefined
        }))
    }
    return obj
}

module.exports = _2json
