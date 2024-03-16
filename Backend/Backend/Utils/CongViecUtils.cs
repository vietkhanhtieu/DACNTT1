using Backend.Models;

namespace Backend.Utils
{
    public class CongViecUtils
    {
        public static Congviec UpdateCongViecUtil(Congviec newCv, Congviec oldCv)
        {
            if(newCv.TenCv != null)
            {
                oldCv.TenCv = newCv.TenCv;
            }
            if(newCv.SonguoithamgiaCv != null)
                oldCv.SonguoithamgiaCv = newCv.SonguoithamgiaCv;
            if (newCv.NgaybatdauCv != null && newCv.NgaybatdauCv != DateOnly.MinValue)
            {
                oldCv.NgaybatdauCv = newCv.NgaybatdauCv;
            }

            if (newCv.NgayketthucCv != null && newCv.NgayketthucCv != DateOnly.MinValue)
            {
                oldCv.NgayketthucCv = newCv.NgayketthucCv;
            }

            if (newCv.TinhtrangCv != null)
                oldCv.TinhtrangCv = newCv.TinhtrangCv;
            if (newCv.MotaCv != null)
                oldCv.MotaCv = newCv.MotaCv;
            if (newCv.Filename != null)
                oldCv.Filename = newCv.Filename;
            if (newCv.Douutien != null)
                oldCv.Douutien = newCv.Douutien;
            if(newCv.Maduan != null)
            {
                oldCv.Maduan = newCv.Maduan;
            }
            return oldCv;
        }
    }
}
