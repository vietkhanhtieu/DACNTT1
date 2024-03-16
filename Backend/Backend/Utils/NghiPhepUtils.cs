using Backend.Models;

namespace Backend.Utils
{
    public class NghiPhepUtils
    {
        public static Nghiphep UpdateDangNghiPhep(Nghiphep oldNghiPhep, Nghiphep newNghiPhep)
        {
            if (newNghiPhep.NgaydangKi != null && newNghiPhep.NgaydangKi != DateOnly.MinValue)
            {
                oldNghiPhep.NgaydangKi = newNghiPhep.NgaydangKi;
            }

            if (newNghiPhep.Ngaybatdau != null && newNghiPhep.Ngaybatdau != DateOnly.MinValue)
            {
                oldNghiPhep.Ngaybatdau = newNghiPhep.Ngaybatdau;
            }
            if (newNghiPhep.Lydo != null)
                oldNghiPhep.Lydo = newNghiPhep.Lydo;
            if (newNghiPhep.Trangthai != null)
                oldNghiPhep.Trangthai = newNghiPhep.Trangthai;
            if(newNghiPhep.Loainghiphep != null)
                oldNghiPhep.Loainghiphep = newNghiPhep.Loainghiphep;
            if (newNghiPhep.Manguoidung != null && newNghiPhep.Manguoidung != 0)
                oldNghiPhep.Manguoidung = newNghiPhep.Manguoidung;
            if (newNghiPhep.Lydotuchoi != null)
                oldNghiPhep.Lydotuchoi = newNghiPhep.Lydotuchoi;
            if (newNghiPhep.Ngayketthuc != null && newNghiPhep.Ngayketthuc != DateOnly.MinValue)
            {
                oldNghiPhep.Ngayketthuc = newNghiPhep.Ngayketthuc;
            }


            return oldNghiPhep;


        }
    }
}
