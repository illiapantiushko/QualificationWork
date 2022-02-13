using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Core.Objects;
using ObjectResult = Microsoft.AspNetCore.Mvc.ObjectResult;

public static class ApiResponseExtension
{
    public static ActionResult ToResult(this IApiResponse response) => new ObjectResult(response)
    {
        StatusCode = (int)response.StatusCode
    };

    public static ActionResult<T> ToResult<T>(this IApiResponse response) => new ObjectResult(response)
    {
        StatusCode = (int)response.StatusCode
    };
}