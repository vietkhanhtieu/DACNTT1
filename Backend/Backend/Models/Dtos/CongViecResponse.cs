namespace Backend.Models.Dtos
{
    public class CongViecResponse
    {
        public int Macongviec { get; set; }

        public string TenCv { get; set; } = null!;

        public int SonguoithamgiaCv { get; set; }

        public DateOnly NgaybatdauCv { get; set; }

        public DateOnly NgayketthucCv { get; set; }

        public int TinhtrangCv { get; set; }

        public string MotaCv { get; set; } = null!;

        public int Maduan { get; set; }

        public string? Filename { get; set; }

        public string? Douutien { get; set; }

        public string? NguoiDungs { get; set; }

        public virtual ICollection<BinhluanResponse> Binhluans { get; set; } = new List<BinhluanResponse>();

    }
}
