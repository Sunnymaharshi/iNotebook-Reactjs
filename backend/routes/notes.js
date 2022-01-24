const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route:1 get all notes : POST:/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
});
// Route:2 add note : POST:/api/notes/addnote login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must have atleast 3 characters").isLength({
      min: 3
    }),
    body("description", "descriptiom must have atleast 3 characters").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id
      });
      const save = await note.save();
      res.json(save);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error occured");
    }
  }
);

// Route:3 update note : PUT:/api/notes/updatenote/:id login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    // find note to update
    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    // check if same user requesting update
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
});

// Route:4 delete note : DELETE:/api/notes/deletenote/:id login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find note to delete
    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    // check if same user requesting to delete
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ sucess: "note deleted", node: note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
});
module.exports = router;
