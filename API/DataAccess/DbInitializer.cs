using API.Entities;

namespace API.DataAccess;

public static class DbInitializer
{
    public static void Initialize(StoreContext context)
    {
        if (context.Products.Any())
            return;

        var products = new List<Product>
        {
            new()
            {
                Name = "Product 1", Description = "This is product 1", Price = 100, CurrencyCode = "USD",
                ImageUrl = "http://example.com/product1.jpg",
                CategoryId = 1
            },
            new()
            {
                Name = "Product 2", Description = "This is product 2", Price = 200, CurrencyCode = "USD",
                ImageUrl = "http://example.com/product2.jpg",
                CategoryId = 1
            },
            new()
            {
                Name = "Product 3", Description = "This is product 3", Price = 300, CurrencyCode = "USD",
                ImageUrl = "http://example.com/product3.jpg",
                CategoryId = 2
            },
            new()
            {
                Name = "Product 4", Description = "This is product 4", Price = 400, CurrencyCode = "USD",
                ImageUrl = "http://example.com/product4.jpg",
                CategoryId = 2
            }
        };

        foreach (var product in products) context.Add(product);

        context.SaveChanges();
    }
}