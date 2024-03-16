using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Luong : BaseModel
{
    public int Maluong { get; set; }

    public int Thang { get; set; }

    public int Ngaycong { get; set; }

    public int Luongchinh { get; set; }

    public int Luonghieuqua { get; set; }

    public int Luongngoaigio { get; set; }

    public int Luongboiduong { get; set; }

    public int Phiguixe { get; set; }

    public int Luongthuong { get; set; }

    public int Phucapcom { get; set; }

    public int Thuongsinhnhat { get; set; }

    public int Tongthu { get; set; }

    public int Bhxh { get; set; }

    public int Tamung { get; set; }

    public int Thuetncn { get; set; }

    public int Tongchi { get; set; }

    public int Manguoidung { get; set; }

    public int? Nam { get; set; }


    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
