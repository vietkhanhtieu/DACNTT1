using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Congviec : BaseModel
{
    public int Macongviec { get; set; }

    public string TenCv { get; set; } = null!;

    public int SonguoithamgiaCv { get; set; }

    public DateOnly NgaybatdauCv { get; set; }

    public DateOnly NgayketthucCv { get; set; }

    public int TinhtrangCv { get; set; }

    public string MotaCv { get; set; } = null!;

    public int Maduan { get; set; }

    public string? Filename { get; set; }

    public string? Douutien { get; set; }

    public virtual Duan MaduanNavigation { get; set; } = null!;

    public virtual ICollection<Binhluan> Binhluans { get; set; } = new List<Binhluan>();


    public virtual ICollection<NguoidungCongviec> NguoidungCongviecs { get; set; } = new List<NguoidungCongviec>();
}
