using api.DTOs;
using API.Entities;

namespace api.Extensions;

public static class BasketExtensions
{
    public static BasketDTO MapBasketToDto(this Basket basket)
    {
        return new BasketDTO
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            }).ToList()
        };
    }
}