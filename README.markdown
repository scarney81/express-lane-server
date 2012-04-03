# express-lane-server

## Get the Code

```bash
    $ git clone git@github.com:scarney/express-lane-server.git
    $ cd express-lane-server
    $ npm install
```
    
## Configure MongoLab

```bash
    $ cd bin
    $ cp dev.example.sh dev.sh
    $ Enter your MongoLab connection string in to dev.sh
```

## Test

```bash
    $ npm install mocha -g
    $ mocha
```

## Run It

```bash
    $ npm start
    $ open http://localhost:3000
```


## Deploy It
    
```bash
    $ git push heroku master
```    