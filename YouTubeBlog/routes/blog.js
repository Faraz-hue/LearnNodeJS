const { Router } = require("express");
const router = Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Blog = require("../models/blog");
const Comment = require("../models/comment");


// Multer Storage
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const uploadPath = path.resolve(
            `./public/uploads/${req.user._id}`
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },


    filename: function (req, file, cb) {

        cb(null, `${Date.now()}-${file.originalname}`);

    }

});


const upload = multer({
    storage
});


// Add new blog page
router.get("/add-new", (req, res) => {

    return res.render("addBlog", {
        user: req.user,
    });

});


// Create Blog
router.post("/", upload.single("coverImage"), async (req, res) => {

    const { title, body } = req.body;


    const blog = await Blog.create({

        title,
        body,

        createdBy: req.user._id,

        coverImageURL: req.file
            ? `/uploads/${req.user._id}/${req.file.filename}`
            : null

    });


    return res.redirect(`/blog/${blog._id}`);

});


// Edit Page
router.get("/:id/edit", async (req, res) => {

    const blog = await Blog.findById(req.params.id);


    if (!blog) {
        return res.status(404).send("Blog not found");
    }


    // Owner check
    if (blog.createdBy.toString() !== req.user._id.toString()) {

        return res.status(403).send("Unauthorized");

    }


    return res.render("editBlog", {

        user: req.user,
        blog,

    });

});


// Update Blog
router.put("/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id);


    if (!blog) {
        return res.status(404).send("Blog not found");
    }


    if (blog.createdBy.toString() !== req.user._id.toString()) {

        return res.status(403).send("Unauthorized");

    }


    await Blog.findByIdAndUpdate(

        req.params.id,

        {
            title: req.body.title,
            body: req.body.body,
        }

    );


    res.redirect(`/blog/${req.params.id}`);

});


// Delete Blog
router.delete("/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id);


    if (!blog) {

        return res.status(404).send("Blog not found");

    }


    if (blog.createdBy.toString() !== req.user._id.toString()) {

        return res.status(403).send("Unauthorized");

    }


    await Blog.findByIdAndDelete(req.params.id);


    res.redirect("/");

});


// View Single Blog
router.get("/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id)
        .populate("createdBy");


    if (!blog) {

        return res.status(404).send("Blog not found");

    }


    const comments = await Comment.find({

        blogId: req.params.id

    })
        .populate("createdBy");


    res.render("blog", {

        user: req.user,

        blog,

        comments,

    });

});


// Add Comment
router.post("/comment/:blogId", async (req, res) => {


    await Comment.create({

        content: req.body.content,

        blogId: req.params.blogId,

        createdBy: req.user._id,

    });


    return res.redirect(`/blog/${req.params.blogId}`);

});


module.exports = router;