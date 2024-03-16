using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LuongController : Controller
    {
        private readonly LuongServices _luongServices;

        public LuongController(LuongServices luongServices)
        {
            _luongServices = luongServices;
        }

        [HttpGet("getByMonth")]
        public async Task<IActionResult> GetLuong(int maNguoiDung, int thang, int nam)
        {
            Luong? luong = await _luongServices.FindByMonth(maNguoiDung, thang, nam);
            if (luong == null)
            {
                return NotFound();
            }
            return Ok(luong);
        }

        [HttpPost]
        public async Task<IActionResult> AddLuong([FromBody] LuongRequest luongRequest)
        {
            PostDto result = await _luongServices.AddLuong(luongRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetLuongs(int top, int skip, string? filter)
        {
            List<Luong> list = await _luongServices.FindAllAsync(top, skip, filter);
            return Ok(list);
        }
    }
}
