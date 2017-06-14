#Welcome to my IDPA-project

for my project I wanted to create an interactive website where you can see
DO login/signup using simple flask
-Also some other little games made with pure javascript=>jQuery
-also some cool background arts
-it is deployed to heroku so you can watch it on idpa.herokuapp.com









### Get Started!

1. Clone this repo to your computer, and cd into the project directory:


  $ git clone https://github.com/alcatraz5yz/IDPA.git
  $ cd https://github.com/alcatraz5yz/IDPA.git

make a virtual environment:
$ virtualenv venv
$ virtualenv venv/bin/activate
you are now in your own virtual environment

now if you want to watch this website on your localhost:
$ pip install -r requirements.txt
$ python app.py
then go to your localhost


or if you want to deploy it to heroku:

$ heroku login

$ heroku create myflaskwebsite

$ git push heroku master

$ heroku open
