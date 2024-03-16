using Backend.Models;
using Backend.Request;

namespace Backend.Utils
{
    public class OTUtils
    {
        public static Dangkiot UpdateDangKiOT(Dangkiot oldOt, Dangkiot newOt)
        {
            if (newOt.NgaydangKi != null && newOt.NgaydangKi != DateOnly.MinValue)
            {
                oldOt.NgaydangKi = newOt.NgaydangKi;
            }

            if (newOt.Giobatdau != null && newOt.Giobatdau != DateTime.MinValue)
            {
                oldOt.Giobatdau = newOt.Giobatdau;
            }
            if (newOt.Lydo != null)
                oldOt.Lydo = newOt.Lydo;
            if (newOt.Trangthai != null)
                oldOt.Trangthai = newOt.Trangthai;
            if (newOt.Manguoidung != null && newOt.Manguoidung != 0)
                oldOt.Manguoidung = newOt.Manguoidung;
            if (newOt.Lydotuchoi != null)
                oldOt.Lydotuchoi = newOt.Lydotuchoi;
            if (newOt.Gioketthuc != null && newOt.Gioketthuc != DateTime.MinValue)
            {
                oldOt.Gioketthuc = newOt.Gioketthuc;
            }

            
            return oldOt;


        }
    }
}
