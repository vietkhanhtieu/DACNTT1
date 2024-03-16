namespace Backend.Request
{
    public class BinhluanRequest
    {
        public int Macongviec { get; set; }

        public int Manguoidung { get; set; }

        public string Noidung { get; set; } = null!;

        public DateTime Thoigian { get; set; }
    }
}
