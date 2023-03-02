class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(productData) {
      if (this.products.some((product) => product.code === productData.code)) {
        throw new Error('Product code already exists');
      }
  
      const id = this.generateProductId();
      const product = { ...productData, id };
      this.products.push(product);
  
      return product;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      return product;
    }
  
    generateProductId() {
      let id = null;
  
      do {
        id = Math.floor(Math.random() * 1000000);
      } while (this.products.some((product) => product.id === id));
  
      return id;
    }
  }
  
  // Crear instancia de ProductManager
  const productManager = new ProductManager();
  
  // Llamar getProducts, debe devolver arreglo vacío []
  console.log(productManager.getProducts()); // []
  
  // Agregar un producto
  const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };
  
  const addedProduct = productManager.addProduct(newProduct);
  
  // Imprimir el producto recién agregado
  console.log(addedProduct);
  
  // Llamar getProducts, debe aparecer el producto recién agregado
  console.log(productManager.getProducts());
  
  // Agregar un producto con el mismo código, debe arrojar un error
  try {
    productManager.addProduct(newProduct);
  } catch (error) {
    console.log(error.message); // 'Product code already exists'
  }
  
  // Obtener producto por id
  const productId = addedProduct.id;
  const productById = productManager.getProductById(productId);
  
  // Imprimir producto por id
  console.log(productById);
  
  // Obtener producto por id que no existe, debe arrojar un error
  try {
    productManager.getProductById(99999);
  } catch (error) {
    console.log(error.message); // 'Product not found'
  }