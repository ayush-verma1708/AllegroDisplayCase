import { users, type User, type InsertUser, products, type Product, type InsertProduct } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product CRUD operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private userCurrentId: number;
  private productCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    
    // Initialize with sample product data
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Batman Black Oversized T-Shirt (Vengeance)",
        price: "Rs. 799",
        description: "Dark, Bold, and Unapologetically Gotham.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872494/18_b8hb1n.png",
            ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Sinner Black Oversized T-Shirt ",
        price: "Rs. 799",
        description: "Born to Sin, Destined to Rule",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872497/6_zexrhg.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872497/4_v8thos.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Simpsons Lavender Oversized T-Shirt",
        price: "Rs. 799",
        description: "Bold, Bright, and Cartoon-Inspired",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872511/9_mktsla.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "The Weeknd Inspired Black Oversized T-Shirt",
        price: "Rs. 799",
        description: "Dark, Dreamy, and Musically Charged",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872495/12_luttr7.png"
        ,"https://res.cloudinary.com/docmkserp/image/upload/v1744872499/13_ipmclg.png"
      ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "The Dark knight Offwhite Oversized T-Shirt",
        price: "Rs. 799",
        description: "Cinematic Cool Meets Street-Ready Style.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872498/7_x6e3th.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872504/8_ctbi80.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Goated White Oversized T-Shirt",
        price: "Rs. 799",
        description: "Premium Build. Iconic Energy.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872517/23_kgyth4.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872506/25_tfb77a.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872501/26_roupgw.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Venom Pulse Oversized Black T-Shirt",
        price: "Rs. 799",
        description: "Symbiote Energy. Streetwear Precision.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872506/3_ums15r.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872496/1_l9n6qp.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Love & War White Oversized T-Shirt",
        price: "Rs. 799",
        description: "Sword & Petals—Balance in Every Thread.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872517/22_fjeycv.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872516/21_n7hrmy.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      },
      {
        name: "Hashira Oversized Black T-Shirt",
        price: "Rs. 799",
        description: "Wear the Will of the Strongest.",
        category: "clothing",
        images: [
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872505/17_ggiwca.png",
          "https://res.cloudinary.com/docmkserp/image/upload/v1744872508/16_rol8qh.png"
        ],
        details: [
        "Material: 100% French Terry cotton for maximum comfort",

"Fabric Treatment: Biowash for enhanced softness and durability",

"GSM: 240 GSM for a premium, heavyweight feel",

"Fit: Oversized, relaxed fit for a streetwear vibe"],
        sizes: ["M", "L", "XL"]
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
