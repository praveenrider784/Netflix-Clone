const router = require("express").Router();
const List = require("../models/List");
const verify = require("../middleware/VerifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
  const{type,query}=req.query;
  const queryobject={};
  if(type){
  queryobject.type=type;
  }
  if(query){
  queryobject.genre=genre;
  }

  let list = [];
 try {
  list=await List.find(queryobject).limit(10);
  console.log(queryobject);
  res.status(200).json(list);
 } catch (error) {
  console.log(err);
 }
});
module.exports = router;
