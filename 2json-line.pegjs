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

quote_string 'string'
    = '"' string:qchar* '"' { 
        return string.join('') 
      }

unquote_string 'unquoted string'
    = string:char* {
        return string.join('')  
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

