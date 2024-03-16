namespace Backend.Models.Dtos
{
    public class NghiPhepResponse
    {
        public int Manghiphep { get; set; }

        public DateOnly Ngaybatdau { get; set; }

        public DateOnly Ngayketthuc { get; set; }

        public string Loainghiphep { get; set; } = null!;

        public string Lydo { get; set; } = null!;

        public string Trangthai { get; set; } = null!;

        public string Tennguoidung { get; set; }

        public string? Lydotuchoi { get; set; }

        public DateOnly NgaydangKi { get; set; }
    }
}
