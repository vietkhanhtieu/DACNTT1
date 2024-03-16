using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Nguoidung : BaseModel
{
    public int Manguoidung { get; set; }

    public string Hoten { get; set; } = null!;

    public DateOnly Ngaysinh { get; set; }

    public int Gioitinh { get; set; }

    public string Cangcuoccongdan { get; set; } = null!;

    public DateOnly Ngaycap { get; set; }

    public string Noicap { get; set; } = null!;

    public string Quoctich { get; set; } = null!;

    public string Dantoc { get; set; } = null!;

    public string Tongiao { get; set; } = null!;

    public string Avatar { get; set; } = null!;

    public string Chucvu { get; set; } = null!;

    public string Hocvan { get; set; } = null!;

    public string Emailcongty { get; set; } = null!;

    public string Matkhau { get; set; } = null!;

    public string Emailcanhan { get; set; } = null!;

    public string Sodienthoai { get; set; } = null!;

    public string Diachi { get; set; } = null!;

    public virtual ICollection<Binhluan> Binhluans { get; set; } = new List<Binhluan>();


    public virtual ICollection<Dangkiot> Dangkiots { get; set; } = new List<Dangkiot>();

    public virtual ICollection<Dulieudiemdanh> Dulieudiemdanhs { get; set; } = new List<Dulieudiemdanh>();

    public virtual ICollection<Luong> Luongs { get; set; } = new List<Luong>();

    public virtual ICollection<Nghiphep> Nghipheps { get; set; } = new List<Nghiphep>();

    public virtual ICollection<NguoidungCongviec> NguoidungCongviecs { get; set; } = new List<NguoidungCongviec>();

    public virtual ICollection<NguoidungDuan> NguoidungDuans { get; set; } = new List<NguoidungDuan>();
}
