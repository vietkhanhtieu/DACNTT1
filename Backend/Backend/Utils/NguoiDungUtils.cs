using Backend.Models;

namespace Backend.Utils
{
    public class NguoiDungUtils
    {
        public static Nguoidung UpdateNguoiDung(Nguoidung oldNguoiDung, Nguoidung newNguoi)
        {
            if(newNguoi.Ngaysinh != null)
            {
                oldNguoiDung.Ngaysinh = newNguoi.Ngaysinh;
            }
            if (newNguoi.Gioitinh != null)
            {
                oldNguoiDung.Gioitinh = newNguoi.Gioitinh;
            }
            if (newNguoi.Cangcuoccongdan != null)
            {
                oldNguoiDung.Cangcuoccongdan = newNguoi.Cangcuoccongdan;
            }
            if (newNguoi.Ngaycap != null)
            {
                oldNguoiDung.Ngaycap = newNguoi.Ngaycap;
            }
            if (newNguoi.Noicap != null)
            {
                oldNguoiDung.Noicap = newNguoi.Noicap;
            }
            if (newNguoi.Dantoc != null)
            {
                oldNguoiDung.Dantoc = newNguoi.Dantoc;
            }
            if (newNguoi.Tongiao != null)
            {
                oldNguoiDung.Tongiao = newNguoi.Tongiao;
            }
            if (newNguoi.Hocvan != null)
            {
                oldNguoiDung.Hocvan = newNguoi.Hocvan;
            }
            if (newNguoi.Sodienthoai != null)
            {
                oldNguoiDung.Sodienthoai = newNguoi.Sodienthoai;
            }
            if (newNguoi.Emailcanhan != null)
            {
                oldNguoiDung.Emailcanhan = newNguoi.Emailcanhan;
            }
            if (newNguoi.Emailcongty != null)
            {
                oldNguoiDung.Emailcongty = newNguoi.Emailcongty;
            }
            if (newNguoi.Diachi != null)
            {
                oldNguoiDung.Diachi = newNguoi.Diachi;
            }
            if (newNguoi.Chucvu != null)
            {
                oldNguoiDung.Chucvu = newNguoi.Chucvu;
            }


            return oldNguoiDung;
        }
    }
}
