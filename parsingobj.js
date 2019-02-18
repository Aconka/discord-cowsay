var textx;
var eyesx;
var cowx;
var tonguex;
var wrapx;
var wrapLengthx;
var modex;
function parsingobj(x)
{
var cmd = x.split(' '); //splits the input up at - for prossessing
text = "";
for (var i = 1; i < cmd.length; i++)
{ //putting my { on the corect line like a civilised person
	if (cmd[i].startsWith('-e')) //if eye
	{
		if(cmd[i].localeCompare('-e') == 0)//if eye
		{
			eyesx = cmd[i + 1];
			i += 1;
		}
		else
		{
			eyesx = cmd[i].substring('-e'.length);
		}
	}
	else if (cmd[i].startsWith('-f')) //if cow
	{
		if(cmd[i].localeCompare('-f') == 0)
		{
			cowx = cmd[i + 1];
			i += 1;
		}
		else
		{
			cowx = cmd[i].substring('-f'.length);
		}
	}
	else if (cmd[i].startsWith('-T')) //if tongue
	{
		if(cmd[i].localeCompare('-T') == 0)
		{
			tonguex = cmd[i + 1];
			i += 1;
		}
		else
		{
			tonguex = cmd[i].substring('-T'.length);
		}
	}
	else if (cmd[i].startsWith('-W')) //if wrapLength
	{
		if(cmd[i].localeCompare('-W') == 0)
		{
			wrapLengthx = parseInt(cmd[i + 1]);
			i += 1;
		}
		else
		{
			wrapLengthx = parseInt(cmd[i].substring('-W'.length));
		}
	}
	else if (cmd[i].localeCompare('-b') == 0) //if b mode
	{
		modex = 'b';
	}
	else if (cmd[i].localeCompare('-d') == 0) //if d mode
	{
		modex = 'd';
	}
	else if (cmd[i].localeCompare('-g') == 0) //if g mode
	{
		modex = 'g';
	}
	else if (cmd[i].localeCompare('-p') == 0) //if p mode
	{
		modex = 'p';
	}
	else if (cmd[i].localeCompare('-s') == 0) //if s mode
	{
		modex = 's';
	}
	else if (cmd[i].localeCompare('-t') == 0) //if t mode
	{
		modex = 't';
	}
	else if (cmd[i].localeCompare('-w') == 0) //if w mode
	{
		modex = 'w';
	}
	else if (cmd[i].localeCompare('-y') == 0) //if y mode
	{
		modex = 'y';
	}
	else if (cmd[i].localeCompare('-n') == 0) //if wrap
	{
		wrapx = true;
	}
	else //if not a comand then it adds it to the message
	{
		textx += cmd[i] + ' ';
	}
	//proboly should have uesd a case statement but what ever
}
text = text.slice(0, -1)
//at this point your command should be prossessed and split into strings / booleans ready 
//to be used by cow.say
return { text:textx , eyes:eyesx , cow:cowx , tongue:tonguex , wrap:wrapx , wrapLength:wrapLengthx , mode:modex};
}
