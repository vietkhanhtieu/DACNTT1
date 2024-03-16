namespace Backend.Models.Dtos
{
    public class NguoiDungResponse
    {
        public int Manguoidung { get; set; }

        public string Hoten { get; set; } = null!;

        public DateOnly Ngaysinh { get; set; }

        public int Gioitinh { get; set; }

        public string Cangcuoccongdan { get; set; } = null!;

        public DateOnly Ngaycap { get; set; }

        public string Noicap { get; set; } = null!;

        public string Quoctich { get; set; } = null!;

        public string Dantoc { get; set; } = null!;

        public string Tongiao { get; set; } = null!;

        public string Avatar { get; set; } = null!;

        public string Chucvu { get; set; } = null!;

        public string Hocvan { get; set; } = null!;

        public string Emailcongty { get; set; } = null!;

        public string Matkhau { get; set; } = null!;

        public string Emailcanhan { get; set; } = null!;

        public string Sodienthoai { get; set; } = null!;

        public string Diachi { get; set; } = null!;
    }
}
