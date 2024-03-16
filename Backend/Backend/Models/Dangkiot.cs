using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Dangkiot : BaseModel
{
    public int Maot { get; set; }

    public DateTime Giobatdau { get; set; }

    public DateTime Gioketthuc { get; set; }

    public string Lydo { get; set; } = null!;

    public string Trangthai { get; set; } = null!;

    public int Manguoidung { get; set; }

    public string? Lydotuchoi { get; set; }

    public DateOnly NgaydangKi { get; set; }
    [JsonIgnore]
    public virtual Nguoidung ManguoidungNavigation { get; set; } = null!;
}
