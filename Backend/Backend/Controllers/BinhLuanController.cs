using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BinhLuanController : Controller
    {
        private readonly BinhLuanServices _binhLuanServices;

        public BinhLuanController(BinhLuanServices binhLuanServices)
        {
            _binhLuanServices = binhLuanServices;
        }

        [HttpGet("{mabinhLuan}")]
        public async Task<IActionResult> Get(int mabinhLuan)
        {
            Binhluan? binhLuan = await _binhLuanServices.FindByIdAsync(mabinhLuan);
            if (binhLuan == null)
            {
                return NotFound();
            }
            return Ok(binhLuan);
        }

        [HttpGet("CongViec")]
        public async Task<ActionResult<IEnumerable<BinhluanResponse>>> GetByMaNguoiDung(int maCongViec)
        {
            try
            {
                return Ok(await _binhLuanServices.FindByMaCongViecAsync(maCongViec));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBinhLuan([FromBody] BinhluanRequest binhLuanRequest)
        {
            PostDto result = await _binhLuanServices.AddBinhluan(binhLuanRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Binhluan>>> Get(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _binhLuanServices.FindAllAsync(top, skip, filter));
            }
            catch
            {
                return Problem();
            }
        }
    }
}
