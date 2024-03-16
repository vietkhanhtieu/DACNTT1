using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Duan : BaseModel
{
    public int Maduan { get; set; }

    public string TenDa { get; set; } = null!;

    public int? SonguoithamgiaDa { get; set; }

    public DateOnly? NgaybatdauDa { get; set; }

    public DateOnly? Ngayketthuc { get; set; }

    public int TrangthaiDa { get; set; }

    public string? Mota { get; set; }

    public virtual ICollection<Congviec> Congviecs { get; set; } = new List<Congviec>();

    public virtual ICollection<NguoidungDuan> NguoidungDuans { get; set; } = new List<NguoidungDuan>();
}
