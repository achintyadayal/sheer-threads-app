// Mock Products Data
export const initialProducts = [
  {
    id: 1,
    name: "Chikankari Kurta",
    price: 2499,
    category: "kurtas",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    description:
      "Hand-embroidered white kurta with traditional chikankari work"
  },
  {
    id: 2,
    name: "Embroidered Dupatta",
    price: 1299,
    category: "dupattas",
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1583391733981-5babdc9b6f94?w=400",
    description:
      "Delicate silk dupatta with mukaish detailing"
  },
  {
    id: 3,
    name: "Cotton Palazzo Set",
    price: 1899,
    category: "sets",
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400",
    description:
      "Comfortable cotton palazzo with matching kurta"
  },
  {
    id: 4,
    name: "Silk Saree",
    price: 4999,
    category: "sarees",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    description:
      "Handwoven silk saree with traditional borders"
  },
  {
    id: 5,
    name: "Block Print Kurta",
    price: 1799,
    category: "kurtas",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
    description: "Hand block printed cotton kurta"
  },
  {
    id: 6,
    name: "Embroidered Jacket",
    price: 3299,
    category: "jackets",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    description:
      "Contemporary jacket with traditional kaamdani work"
  }
];


// Mock Orders Data
export const initialOrders = [
  {
    id: "ORD001",
    customerName: "Priya Sharma",
    email: "priya@example.com",
    total: 4298,
    status: "pending",
    date: "2026-02-01",
    items: [
      {
        productId: 1,
        name: "Chikankari Kurta",
        quantity: 1,
        price: 2499
      },
      {
        productId: 2,
        name: "Embroidered Dupatta",
        quantity: 1,
        price: 1299
      }
    ]
  },
  {
    id: "ORD002",
    customerName: "Rahul Verma",
    email: "rahul@example.com",
    total: 4999,
    status: "shipped",
    date: "2026-01-30",
    items: [
      {
        productId: 4,
        name: "Silk Saree",
        quantity: 1,
        price: 4999
      }
    ]
  },
  {
    id: "ORD003",
    customerName: "Anjali Patel",
    email: "anjali@example.com",
    total: 3598,
    status: "delivered",
    date: "2026-01-28",
    items: [
      {
        productId: 5,
        name: "Block Print Kurta",
        quantity: 2,
        price: 1799
      }
    ]
  }
];
