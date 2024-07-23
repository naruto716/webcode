namespace api.RequestHelpers;

public class PaginationParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 6; // if larger than maxpagesize set it to max otherwise whatever the page size is

    public int PageNumber { get; set; } = 1;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}