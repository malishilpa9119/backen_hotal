const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

//POST Method to add MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newmenuItem = new MenuItem(data);
    const response = await newmenuItem.save();
    console.log("data save", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "inter server error" });
  }
});

//GET Method to get the Menu Item
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "inter server error" });
  }
});
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "menuItem not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "internal server error"});
  }
});

router.delete("/:id",async (req, res) => {
 try{
  const menuItemId = req.params.id;
  const response = await MenuItem.findByIdAndDelete(menuItemId)
  if(!response){
    return res.status(404).json({error: "menuItem not found"})
  }
  console.log("data delete");
  res.status(200).json(response);
 } catch(error){
  console.log(error);
  res.status(500).json({error: "internal server error"});
 }
})

module.exports = router;
