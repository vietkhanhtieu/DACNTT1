using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.BussinessServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NghiPhepController : Controller
    {
        private readonly NghiPhepServices _nghiPhepServices;

        public NghiPhepController(NghiPhepServices nghiPhepServices)
        {
            _nghiPhepServices = nghiPhepServices;
        }

        [HttpGet("{maNghiPhep}")]
        public async Task<ActionResult> FindByIdAsync(int maNghiPhep)
        {
            try
            {
                Nghiphep nghiphep = await _nghiPhepServices.FindByIdAsync(maNghiPhep);
                if (nghiphep == null)
                {
                    return NotFound();
                }
                return Ok(nghiphep);
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> FindAllAsync(int top, int skip, string? filter)
        {
            try
            {
                return Ok(await _nghiPhepServices.FindAllAsync(top, skip, filter));
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }


        [HttpGet("user/{maNguoiDung}")]
        public async Task<ActionResult<IEnumerable<Dangkiot>>> GetLeaveUser(int maNguoiDung)
        {
            try
            {
                return Ok(await _nghiPhepServices.FindAllLeaveUserAsync(maNguoiDung));
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddNghiPhep(NghiPhepRequest nghiPhepRequest)
        {
            try
            {
                return Ok(await _nghiPhepServices.AddNghiPhep(nghiPhepRequest));
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message);
            }
        }

        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateOTStatus([FromBody] UpdateStatusNghiPhepRequest updateStatusNghiPhepRequest)
        {
            PostDto result = await _nghiPhepServices.UpdateStatusNghiPhep(updateStatusNghiPhepRequest);
            if (result.Success == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
