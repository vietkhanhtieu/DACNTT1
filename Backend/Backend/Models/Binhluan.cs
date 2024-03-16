using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Binhluan : BaseModel
{
    public int Mabinhluan { get; set; }

    public int Macongviec { get; set; }

    public int Manguoidung { get; set; }

    public string Noidung { get; set; } = null!;

    public DateTime Thoigian { get; set; }

    public virtual Congviec MacongviecNavigation { get; set; } = null!;

    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
