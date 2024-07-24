
const express=require("express");
const {  getData } = require("../controllers/dataController");

const dataRouter= express.Router()

  
dataRouter.get('/data',getData );
  
  module.exports ={dataRouter}