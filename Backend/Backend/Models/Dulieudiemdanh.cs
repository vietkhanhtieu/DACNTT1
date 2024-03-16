using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Dulieudiemdanh : BaseModel
{
    public int Madiemdanh { get; set; }

    public int Manguoidung { get; set; }

    public DateTime Giocheckin { get; set; }

    public DateTime Giocheckout { get; set; }

    public string Diachi { get; set; } = null!;

    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
