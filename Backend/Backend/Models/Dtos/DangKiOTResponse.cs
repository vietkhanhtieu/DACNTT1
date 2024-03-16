namespace Backend.Models.Dtos
{
    public class DangKiOTResponse
    {
        public int Maot { get; set; }

        public DateTime Giobatdau { get; set; }

        public DateTime Gioketthuc { get; set; }

        public string Lydo { get; set; } = null!;

        public string Trangthai { get; set; } = null!;

        public string TenNguoiDung { get; set; }

        public string? Lydotuchoi { get; set; }

        public DateOnly NgaydangKi { get; set; }
    }
}
