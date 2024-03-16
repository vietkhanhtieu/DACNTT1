using Backend.Models;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamCongController : Controller
    {
        private readonly ChamCongServices _chamCongServices;
        public ChamCongController(ChamCongServices chamCongServices)
        {
            _chamCongServices = chamCongServices;
        }

        [HttpGet("{maDiemDanh}")]
        public async Task<ActionResult<Dulieudiemdanh>> Get(int maDiemDanh)
        {
            try
            {
                Dulieudiemdanh dulieudiemdanh = await _chamCongServices.FindByIdAsync(maDiemDanh);
                if (dulieudiemdanh == null)
                {
                    return NotFound();
                }
                return Ok(dulieudiemdanh);
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dulieudiemdanh>>> Get(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _chamCongServices.FindAllAsync(top, skip, filter));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet("getChamCong")]
        public async Task<ActionResult<IEnumerable<Dulieudiemdanh>>> GetByMonth(int maNguoiDung, string startRequest, string endRequest)
        {
            try
            {
                return Ok(await _chamCongServices.FindByDateRange(maNguoiDung, startRequest, endRequest));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpGet("GetByDate")]
        public async Task<ActionResult<IEnumerable<Dulieudiemdanh>>> GetByDate(int maNguoiDung, string startRequest)
        {
            try
            {
                return Ok(await _chamCongServices.FindByDateAsync(maNguoiDung, startRequest));
            }
            catch
            {
                return Problem();
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChamCongRequest chamCongRequest)
        {
            try
            {
                return Ok(await _chamCongServices.AddChamCong(chamCongRequest));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ChamCongRequest chamCongRequest)
        {
            try
            {
                return Ok(await _chamCongServices.UpdateChamCong(chamCongRequest));
            }
            catch
            {
                return Problem();
            }
        }

    }
}
