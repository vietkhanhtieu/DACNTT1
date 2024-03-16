using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OTController : Controller
    {
        private readonly OTServices _oTServices;
        public OTController(OTServices oTServices)
        {
            _oTServices = oTServices;
        }

        [HttpGet("{maDangKiOT}")]
        public async Task<ActionResult<Dangkiot>> Get(int maDangKiOT)
        {
            try
            {
                Dangkiot dangkiot = await _oTServices.FindByIdAsync(maDangKiOT);
                if (dangkiot == null)
                {
                    return NotFound();
                }
                return Ok(dangkiot);
            }
            catch(Exception ex)
            {
                return Problem(detail: ex.Message);
            }
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DangKiOTResponse>>> Get(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _oTServices.FindAllAsync(top, skip, filter));
            }
            catch(Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }


        [HttpGet("user/{maNguoiDung}")]
        public async Task<ActionResult<IEnumerable<Dangkiot>>> GetOTUser(int maNguoiDung)
        {
            try
            {
                return Ok(await _oTServices.FindAllOTUserAsync(maNguoiDung));
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpGet("GetByDate")]
        public async Task<ActionResult<IEnumerable<Dangkiot>>> GetByDate(int maNguoiDung, string startRequest)
        {
            try
            {
                return Ok(await _oTServices.FindByDateAsync(maNguoiDung, startRequest));
            }
            catch
            {
                return Problem();
            }
        }

        [HttpPost]
        public async Task<ActionResult<PostDto>> Post(OTRequest oTRequest)
        {
            try
            {
                return Ok(await _oTServices.AddOT(oTRequest));
            }
            catch(Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateOTStatus([FromBody] UpdateStatusOTRequest updateStatusOTRequest)
        {
            PostDto result = await _oTServices.UpdateStatusOT(updateStatusOTRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
