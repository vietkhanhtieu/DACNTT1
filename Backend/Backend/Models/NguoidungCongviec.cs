using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class NguoidungCongviec : BaseModel
{
    public int Id { get; set; }

    public int Manguoidung { get; set; }

    public int Macongviec { get; set; }

    public virtual Congviec MacongviecNavigation { get; set; } = null!;

    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
