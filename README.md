# cricket-scoreboard
Simple Cricket Scoreboard in NodeJs, SQLite and Python(to handle hardware).

<a href="https://imgur.com/8OpC2Ft"><img src="https://i.imgur.com/8OpC2Ft.gif" title="source: imgur.com" /></a>

To install this, you need NodeJs in your machine. Download the repo and run npm install command. You also need Sqlite3 in your system because I have used Sqlite to store data. SB have five tables.

<a href="https://imgur.com/WSbMlL5"><img src="https://i.imgur.com/WSbMlL5.png" title="source: imgur.com" /></a>


1- match

<a href="https://imgur.com/89ReXdv"><img src="https://i.imgur.com/89ReXdv.png" title="source: imgur.com" /></a>


2- history (which has almost same structure as above)


3- login

<a href="https://imgur.com/WzgiLNl"><img src="https://i.imgur.com/WzgiLNl.png" title="source: imgur.com" /></a>


4- register (which has same structure as above)



5- board (this is to keep the Physical Scoreboard device ON OFF

<a href="https://imgur.com/cAoTaWj"><img src="https://i.imgur.com/cAoTaWj.png" title="source: imgur.com" /></a>





To run this properly, you need a RaspberryPi and a Scoreboard like this:

<a href="https://imgur.com/mAFQVw9"><img src="https://i.imgur.com/mAFQVw9.gif" title="source: imgur.com" /></a>





To control this board, there is a code in Python. You can control the board by ON OFF button in Admin Contol panel.

You can see clearly, there is an option of adding score from 1 - 6, wide ball, No ball, Bold, Turn ON OFF Board, Change overs due to rain or something else etc.


Login Password: 123

Register Password: admin


There is an option to change the passwords also.

Refresh Tables button will clear previous history of matches. So BE CAREFUL to use this button.

Restart Match button will ready the system for the next match.

Good Luck!
