namespace Backend.Request
{
    public class ChamCongRequest
    {
        public int Manguoidung { get; set; }

        public DateTime Giocheckin { get; set; }

        public DateTime Giocheckout { get; set; }

        public string Diachi { get; set; } = null!;
    }
}
