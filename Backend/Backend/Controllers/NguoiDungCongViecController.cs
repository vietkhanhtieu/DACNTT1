using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NguoiDungCongViecController : Controller
    {
        private readonly NguoiDungCongViecServices _nguoiDungCongViecServices;

        public NguoiDungCongViecController(NguoiDungCongViecServices nguoiDungDuAnServices)
        {
            _nguoiDungCongViecServices = nguoiDungDuAnServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int mCongViec)
        {
            NguoidungCongviec? duan = await _nguoiDungCongViecServices.FindByIdAsync(mCongViec);
            if (duan == null)
            {
                return NotFound();
            }
            return Ok(duan);
        }

        [HttpGet("NguoiDung")]
        public async Task<ActionResult<IEnumerable<NguoiDungCongViecResponse>>> GetByMaNguoiDung(int maNguoiDung)
        {
            try
            {
                List<NguoiDungCongViecResponse> nguoiDungCongViecResponses = await _nguoiDungCongViecServices.FindByMaNguoiDungAsync(maNguoiDung);
                return Ok(nguoiDungCongViecResponses);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddNguoidungCongviec([FromBody] NguoiDungCongViecRequest duAnRequest)
        {
            PostDto result = await _nguoiDungCongViecServices.AddNguoiDungCongViec(duAnRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
