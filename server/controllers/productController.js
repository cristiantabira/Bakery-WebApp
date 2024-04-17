const upload = require("../config/uploadConfig");
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.updateProduct = async (req, res) => {};

exports.deleteProduct = async (req, res) => {};

(exports.addProduct = upload.single("image")),
    (req, res) => {
        console.log(req.file);
        console.log(req.body);

        res.status(201).send({
            message: "Product added successfully!",
            data: {
                ...req.body,
                imageUrl: `/assets/${req.file.filename}`,
            },
        });
    };
