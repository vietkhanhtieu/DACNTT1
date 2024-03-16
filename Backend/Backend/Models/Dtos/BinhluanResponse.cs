namespace Backend.Models.Dtos
{
    public class BinhluanResponse
    {
        public int MaBinhLuan { get; set; }
        public string Macongviec { get; set; }

        public string Manguoidung { get; set; }

        public string Noidung { get; set; } = null!;

        public DateTime Thoigian { get; set; }
    }
}
