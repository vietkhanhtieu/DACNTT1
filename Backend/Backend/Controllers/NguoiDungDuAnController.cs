using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NguoiDungDuAnController : Controller
    {
        private readonly NguoiDungDuAnServices _duAnServices;

        public NguoiDungDuAnController(NguoiDungDuAnServices duAnServices)
        {
            _duAnServices = duAnServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int maDuAn)
        {
            NguoidungDuan? duan = await _duAnServices.FindByIdAsync(maDuAn);
            if (duan == null)
            {
                return NotFound();
            }
            return Ok(duan);
        }

        [HttpGet("NguoiDung")]
        public async Task<ActionResult<IEnumerable<NguoidungDuan>>> GetByMaNguoiDung(int maNguoiDung)
        {
            try
            {
                return Ok(await _duAnServices.FindByMaNguoiDungAsync(maNguoiDung));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddNguoiDungDuAn([FromBody] NguoidungDuanRequest duAnRequest)
        {
            PostDto result = await _duAnServices.AddNguoiDungDuAn(duAnRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
