Caustica is a Miiverse clone forked from Cedar which focuses on remaking Miiverse and adding some cool perks.
It's open source and pretty lightweight. (~1 MB)

## Features

- Miiverse-like experience

- Themes (you heard that right, you can change the style of the UI)

- Advanced drawing (made right)

## Installation

### Requirements

**For personal use:**

- A LAMPP package (XAMPP for example)

**For production:**

- Apache2 Server

- MariaDB/MySQL Server

- PHP 7.2 or higher

- PHPMyAdmin (Optional, but recommended)

### Instructions

- Configure your server so it points to your domain/where you like. (Production)

- Start your servers.

- Import "db-structure.sql" to your database.

- Open the "lib" folder inside "Caustica-PHP" and open the "connect.php" file.

- Edit the values of $dbc so they match to your database's credentials.

- Save the file and go back to the "Caustica-PHP" folder.

- [OPTIONAL] Edit signup.php and settings.php and change the Mii API URLs to your preffered ones.

- Drop the files inside the "Caustica-PHP" folder to your server directory (htdocs, /var/www/html, etc...)

- You're done! Start creating communities by inserting new rows to "titles"

## Special thanks to:

- EnergeticBark for the Cedar source code

- jo for the stripe theme.

- The Uiiverse team for all your help

- You for checking this out!
