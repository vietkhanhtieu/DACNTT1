using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Nghiphep : BaseModel
{
    public int Manghiphep { get; set; }

    public DateOnly Ngaybatdau { get; set; }

    public DateOnly Ngayketthuc { get; set; }

    public string Loainghiphep { get; set; } = null!;

    public string Lydo { get; set; } = null!;

    public string Trangthai { get; set; } = null!;

    public int Manguoidung { get; set; }

    public string? Lydotuchoi { get; set; }

    public DateOnly NgaydangKi { get; set; }


    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
