
# MongoDB Queries for Online Shopping Platform

This document contains a set of MongoDB queries designed for an online shopping platform with the following collections:

1. **users**: Stores user details.
2. **orders**: Stores order information.
3. **products**: Stores product information.
4. **warehouses**: Stores warehouse information.

---

## Queries

### 1. Find High-Spending Users
- **Description**: This query identifies users who have spent more than $500 across all their orders.
- **Collections Involved**: `users`, `orders`
- **Techniques Used**: `$lookup`, `$unwind`, `$group`, `$match`

#### Query
```javascript
db.orders.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
        }
    },
    { $unwind: "$userDetails" },
    {
        $group: {
            _id: "$userDetails._id",
            totalSpent: { $sum: "$totalAmount" },
            userName: { $first: "$userDetails.name" }
        }
    },
    { $match: { totalSpent: { $gt: 500 } } },
    {
        $project: {
            _id: 0,
            userName: 1,
            totalSpent: 1
        }
    }
]);
```

---

### 2. List Popular Products by Average Rating
- **Description**: Retrieves products that have an average rating of 4 or higher.
- **Collections Involved**: `products`
- **Techniques Used**: `$unwind`, `$group`, `$match`

#### Query
```javascript
db.products.aggregate([
    { $unwind: "$reviews" },
    {
        $group: {
            _id: "$_id",
            averageRating: { $avg: "$reviews.rating" },
            productName: { $first: "$name" }
        }
    },
    { $match: { averageRating: { $gte: 4 } } },
    {
        $project: {
            _id: 0,
            productName: 1,
            averageRating: 1
        }
    }
]);
```

---

### 3. Search for Orders in a Specific Time Range
- **Description**: Finds all orders placed between December 1, 2024, and December 31, 2024, and includes the user's name in the result.
- **Collections Involved**: `orders`, `users`
- **Techniques Used**: `$match`, `$lookup`, `$unwind`, `$project`

#### Query
```javascript
db.orders.aggregate([
    {
        $match: {
            orderDate: { $gte: new ISODate("2024-12-01"), $lte: new ISODate("2024-12-31") }
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
        }
    },
    { $unwind: "$userDetails" },
    {
        $project: {
            _id: 0,
            orderId: "$_id",
            userName: "$userDetails.name",
            orderDate: 1,
            totalAmount: 1
        }
    }
]);
```

---

### 4. Update Stock After Order Completion
- **Description**: Reduces the stock of each product by the quantity ordered when an order is completed.
- **Collections Involved**: `products`
- **Techniques Used**: `updateOne`, `$inc`

#### Example Code
```javascript
db.orders.findOne({ _id: "order123" }).products.forEach(product => {
    db.products.updateOne(
        { _id: product.productId },
        { $inc: { stock: -product.quantity } }
    );
});
```

---

### 5. Find Nearest Warehouse
- **Description**: Finds the nearest warehouse within a 50-kilometer radius that stocks a specified product (e.g., "P001").
- **Collections Involved**: `warehouses`
- **Techniques Used**: `$geoNear`

#### Query
```javascript
db.warehouses.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance",
            maxDistance: 50000, // 50 kilometers in meters
            query: { "products.productId": "P001" },
            spherical: true
        }
    },
    {
        $project: {
            _id: 0,
            warehouseName: 1,
            distance: 1,
            availableStock: "$products.stock"
        }
    }
]);
```

---

## Notes
- Replace `longitude` and `latitude` in the `$geoNear` query with the user's actual coordinates.
- Ensure that the `warehouses` collection has a geospatial index on the location field:
  ```javascript
  db.warehouses.createIndex({ location: "2dsphere" });
  ```

