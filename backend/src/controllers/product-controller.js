import Product from "../models/product.js";

//function to get products
export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({
        message: "Products unavailable",
      });
    }
    res.status(200).json({
      message: "Products retrieval successful",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//function to add products
export async function addProducts(req, res) {
  try {
    const {
      name,
      price,
      promoPrice,
      category,
      description,
      flashSale,
      rating,
    } = req.body;             
    const imagesPath = req.files
      ? req.files.map((images) => images.path)
      : [];
    const product = new Product({
      name,
      price,
      promoPrice,
      category,
      description,
      flashSale,
      rating,
      images: imagesPath,
    });
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}

//function to get product by id
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product retrieval successful",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//function to update product
export async function updateProduct(req, res) {
  try {
    const {
      name,
      price,
      promoPrice,
      category,
      description,
      flashSale,
      rating,
    } = req.body;
    
    let updateData = {
      name,
      price,
      promoPrice,
      category,
      description,
      flashSale,
      rating,
    };

    if (req.files && req.files.length > 0) {
      const imagesPath = req.files.map((images) => images.path);
      updateData.images = imagesPath;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}

//function to delete product
export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}
