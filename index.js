const express = require('express')
const app = express()
const port = 3000
var cowsay = require("cowsay");

console.log(cowsay  .say({
    text : "Hello World",
    e : "^^",
    T : "U "
}));
