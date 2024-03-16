using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NguoidungController : Controller
    {
        private readonly NguoiDungServices _nguoiDungServices;
        public NguoidungController(NguoiDungServices nguoiDungServices)
        {
            _nguoiDungServices = nguoiDungServices;
        }

        [HttpGet("{maNguoiDung}")]
        public async Task<ActionResult<Nguoidung>> GetById(int maNguoiDung)
        {
            try
            {
                Nguoidung nguoiDung = await _nguoiDungServices.FindByIdAsync(maNguoiDung);
                if (nguoiDung == null)
                {
                    return NotFound();
                }
                return Ok(nguoiDung);
            }
            catch(Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Nguoidung>> GetByEmail([FromQuery] string email)
        {
            try
            {
                Nguoidung nguoiDung = await _nguoiDungServices.FindByEmailAsync(email);
                if (nguoiDung == null)
                {
                    return NotFound();
                }
                return Ok(nguoiDung);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<NguoiDungResponse>>> Get(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _nguoiDungServices.FindAllAsync(top, skip, filter));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NguoiDungRequest nguoidungRequest)
        {
            try
            {
                return Ok(await _nguoiDungServices.AddNguoiDung(nguoidungRequest));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> Put([FromBody] NguoiDungRequest nguoidungRequest)
        {
            try
            {
                return Ok(await _nguoiDungServices.UpdateNguoiDung(nguoidungRequest));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                return Ok(await _nguoiDungServices.Login(loginRequest));
            }
            catch
            {
                return Problem();
            }
        }
    }
}
