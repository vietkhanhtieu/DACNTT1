using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class NguoidungDuan : BaseModel
{
    public int Id { get; set; }

    public int Manguoidung { get; set; }

    public int Maduan { get; set; }

    public virtual Duan MaduanNavigation { get; set; } = null!;

    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
