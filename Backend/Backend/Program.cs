using Backend.Middleware;
using Backend.Models;
using Backend.Services.BussinessServices;
using Backend.Services.RepositoryServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text.Json.Serialization;

const string CORS_POLICY = "CorsPolicy";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddEntityFrameworkNpgsql()
                .AddDbContext<CnttContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("Context")));

builder.Services
    .AddControllers(options => options.UseDateOnlyTimeOnlyStringConverters())
    .AddJsonOptions(options => options.UseDateOnlyTimeOnlyStringConverters());

builder.Services.AddScoped<ChamCongRepositoryServices>();
builder.Services.AddScoped<ChamCongServices>();
builder.Services.AddScoped<NguoiDungRepositoryServices>();
builder.Services.AddScoped<NguoiDungServices>();
builder.Services.AddScoped<LuongRepositoryServices>();
builder.Services.AddScoped<LuongServices>();
builder.Services.AddScoped<OTRepositoryServices>();
builder.Services.AddScoped<OTServices>();
builder.Services.AddScoped<NghiPhepRepositoryServices>();
builder.Services.AddScoped<NghiPhepServices>();
builder.Services.AddScoped<DuAnRepositoryServices>();
builder.Services.AddScoped<DuAnServices>();
builder.Services.AddScoped<NguoiDungDuAnServices>();
builder.Services.AddScoped<NguoiDungDuAnRepository>();
builder.Services.AddScoped<NguoidungCongviecRepositoryServices>();
builder.Services.AddScoped<NguoiDungCongViecServices>();
builder.Services.AddScoped<CongViecRepositoryServices>();
builder.Services.AddScoped<CongViecServices>();
builder.Services.AddScoped<BinhLuanRepositoryServices>();
builder.Services.AddScoped<BinhLuanServices>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(CORS_POLICY, builder =>
    {
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowAnyOrigin();
    });
});

builder.Services.AddSwaggerGen(options =>
{
    options.UseDateOnlyTimeOnlyStringConverters();
    options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "Provide your API key in the API-KEY header.",
        Name = "ApiKey",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme, Id = "ApiKey"
                }
            },
            new string[] { }
        }
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CORS_POLICY);

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<ApiKeyMiddleware>();

app.MapControllers();

app.Run();
