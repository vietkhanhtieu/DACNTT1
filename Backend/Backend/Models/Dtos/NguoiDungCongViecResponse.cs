﻿namespace Backend.Models.Dtos
{
    public class NguoiDungCongViecResponse
    {
        public string maCongViec { get; set; }

        public string tenCongViec { get; set; }

        public string tenDuAn { get; set; }

        public string nguoiDungs { get; set; }

        public int tinhTrang {  get; set; }
        public DateOnly ngayKetThucCv { get; set; }

    }
}
