namespace Backend.Request
{
    public class CongViecRequest
    {
        public int MaCongViec { get; set; }
        public string? TenCv { get; set; } 

        public int SonguoithamgiaCv { get; set; }

        public DateOnly NgaybatdauCv { get; set; }

        public DateOnly NgayketthucCv { get; set; }

        public int TinhtrangCv { get; set; }

        public string? MotaCv { get; set; } 

        public int Maduan { get; set; }

        public string? Filename { get; set; }

        public string? Douutien { get; set; }
    }
}
