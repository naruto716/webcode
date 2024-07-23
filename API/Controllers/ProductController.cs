using API.DataAccess;
using API.Entities;
using api.Extensions;
using api.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController  : BaseApiController
{
    private readonly StoreContext _context;

    public ProductsController (StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>>
        GetProducts([FromQuery]ProductParams productParams) // Not specifying params in HttpGet so assume query string
    {
        var query = _context.Products.Sort(productParams.OrderBy).Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable(); // Don't have to call AsQueryable explicitly, DbSet implements IQueryable

        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
        
        Response.AddPaginationHeader(products.MetaData);

        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

        return Ok(new { brands, types });
    }
}