namespace api.DTOs;

public class BasketDTO
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItemDto> Items { get; set; }
}
