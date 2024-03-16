using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CongViecController : Controller
    {
        private readonly CongViecServices _congViecServices;

        public CongViecController(CongViecServices CongViecServices)
        {
            _congViecServices = CongViecServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetCongViec(int maCongViec)
        {
            CongViecResponse? CongViec = await _congViecServices.FindByIdAsync(maCongViec);
            if (CongViec == null)
            {
                return NotFound();
            }
            return Ok(CongViec);
        }

        [HttpPost]
        public async Task<IActionResult> AddCongViec([FromBody] CongViecRequest CongViecRequest)
        {
            PostDto result = await _congViecServices.AddCongviec(CongViecRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost("Update")]
        public async Task<IActionResult> UpdateCongViec([FromBody] CongViecRequest CongViecRequest)
        {
            PostDto result = await _congViecServices.UpdateCongviec(CongViecRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
