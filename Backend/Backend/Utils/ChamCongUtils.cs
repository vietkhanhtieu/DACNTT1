using Backend.Models;

namespace Backend.Utils
{
    public class ChamCongUtils
    {
        public static Dulieudiemdanh UpdateDuLieuDiemDanh(Dulieudiemdanh oldDuLieuDiemDanh, Dulieudiemdanh newDuLieuDiemDanh)
        {
            oldDuLieuDiemDanh.Diachi = newDuLieuDiemDanh.Diachi;
            oldDuLieuDiemDanh.Giocheckout = newDuLieuDiemDanh.Giocheckout;
            return oldDuLieuDiemDanh;
        }
    }
}
