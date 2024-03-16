using Backend.Models;

namespace Backend.Request
{
    public class DuAnRequest
    {
        public string TenDa { get; set; } = null!;

        public int? SonguoithamgiaDa { get; set; }

        public DateOnly? NgaybatdauDa { get; set; }

        public DateOnly? Ngayketthuc { get; set; }

        public int TrangthaiDa { get; set; }

        public string? Mota { get; set; }

        public string? MaNguoiDung {  get; set; }
    }
}
