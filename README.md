#Welcome to my IDPA-project

for my project I wanted to create an interactive website where you can:
Do login/signup
play with some games made with phaser which is a javascript framework
it is deployed to heroku so you can watch it on idpa.herokuapp.com









### Get Started for yourself!

1. Clone this repo to your computer, and cd into the project directory:


  $ git clone https://github.com/alcatraz5yz/IDPA.git
  $ cd into this folder on your machine

make a virtual environment:
$ virtualenv venv
$ virtualenv venv/bin/activate
you are now in your own virtual environment

now if you want to watch this website on your localhost:
$ pip install -r requirements.txt
$ python app.py
then go to your localhost:http://0.0.0.0:8000/


or if you want to deploy it to heroku:

create a heroku account with:
$ heroku login

$ heroku create myflaskwebsite

$ git push heroku master

$ heroku open
