using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DuAnController : Controller
    {
        private readonly DuAnServices _duAnServices;

        public DuAnController(DuAnServices DuAnServices)
        {
            _duAnServices = DuAnServices;
        }

        [HttpGet]
        public async Task<ActionResult> FindAllAsync(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _duAnServices.FindAllAsync(top, skip, filter));
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpGet("maduan")]
        public async Task<IActionResult> GetDuAn(int maDuAn)
        {
            Duan? duan = await _duAnServices.FindByIdAsync(maDuAn);
            if (duan == null)
            {
                return NotFound();
            }
            return Ok(duan);
        }

        [HttpPost]
        public async Task<IActionResult> AddDuAn([FromBody] DuAnRequest duAnRequest)
        {
            PostDto result = await _duAnServices.AddDuAn(duAnRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("CongViec")]
        public async Task<ActionResult<IEnumerable<DuAnResponse>>> GetCongViec(int maDuAn)
        {
            try
            {
                List<DuAnResponse> duAnResponses = await _duAnServices.GetCongViec(maDuAn);
                return Ok(duAnResponses);
            }
            catch
            {
                return Problem();
            }
        }
    }
}
