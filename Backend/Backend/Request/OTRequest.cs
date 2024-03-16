namespace Backend.Request
{
    public class OTRequest
    {
        public DateTime GioBatDau { get; set; }

        public DateTime GioKetThuc { get; set; }

        public string LyDo { get; set; } = null!;

        public string TrangThai { get; set; } = null!;

        public int MaNguoiDung { get; set; }

        public string? LyDoTuChoi { get; set; }

        public DateOnly NgaydangKi { get; set; }

    }
}
