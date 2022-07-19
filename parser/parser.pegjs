
Command
= cmd:Cmd _ "," _ type:Type _ "," args:Argument

Cmd 
= cmd:Word {
	return cmd
}
Type 
= type:Word 
Word
= word:[a-zA-Z0-9\.\$]+ {
	return word.join("").toLowerCase()
}

Argument
=  wrd:Word _ "," _  args:Argument {
	return {args:[text()]}
}

/ wrd:Word 

_ "whitespace"
  = [ \t\n\r]*