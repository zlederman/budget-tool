
SMSCommand  =
	cmd:Command _ "," _ type:Type _ "," _ args:Arguments {
	return {
		cmd:cmd,
		type:type,
		args:args
	}
}
Command =
	cmd:Word
Type = 
	type:Word
Arguments =
	Word _ "," _ args:Arguments 
    { return [text()]} 
    / Word
Word = 
	wrd:[a-zA-Z0-9 \$\.\+\;]+ {
 	return wrd.join("").toLowerCase()   
}
_ "whitespace"
  = [ \t\n\r]*

