/*
 * Copyright (c) 2016, prussian <genunrest@gmail.com>
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

start = element

escape = "\\"
unescaped = [^\\/\[\]"]

qchar
    = "/"
    / "["
    / "]"
    / char

char
  = unescaped
  / escape '"' { return '"' }
  / escape 'n' { return '\n' }
  / escape 'r' { return '\r' }
  / escape 'f' { return '\f' }
  / escape escape { return '\\' }

quote_string 'string'
    = '"' string:qchar* '"' { 
        return string.join('') 
      }

unquote_string 'unquoted string'
    = string:char* {
        var str = string.join('')  
        if (/^\d+$/.test(str)) return +str
        return str
      }

element
    = "/" elem:(quote_string / unquote_string) next:(element) { return {
        [elem]: next
      }}
    / "/" elem:(quote_string / unquote_string) "[" [0-9]* "]" next:(element) { return {
        [elem]: [next] 
      }}
    / "/" elem:(quote_string / unquote_string) {
        return elem  
      }

