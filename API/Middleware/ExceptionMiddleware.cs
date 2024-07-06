using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
     IHostEnvironment env)
    {
        public async Task InvokeAsync(HttpContext request)
        {
            try
            {
                await next(request);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                request.Response.ContentType = "application/json";
                request.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = env.IsDevelopment() ? new ApiException(request.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new ApiException(request.Response.StatusCode, ex.Message, "internal server error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = JsonSerializer.Serialize(response, options);

                await request.Response.WriteAsync(json);
            }
        }
    }
}