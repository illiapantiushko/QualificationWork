using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL;
using QualificationWork.Middleware;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using QualificationWork.DAL.Command;
using Hangfire;
using HangfireBasicAuthenticationFilter;
using Hangfire.SqlServer;
using QualificationWork.DAL.HelperServise;
using QualificationWork.BL.Services;
using Microsoft.AspNetCore.Identity;
using QualificationWork.DAL.Models;
using QualificationWork.DAL.Query;
using QualificationWork.DTO.Dtos;
using FluentValidation;

namespace QualificationWork.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.IgnoreNullValues = true);


            services.AddControllersWithViews().AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConStr")));
            services.AddIdentity<ApplicationUser, ApplicationRole>(opt =>
            {
                opt.SignIn.RequireConfirmedEmail = true;
            })
               .AddEntityFrameworkStores<ApplicationContext>()
               .AddDefaultTokenProviders();

            // налаштування схеми
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.RequireHttpsMetadata = false;
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = false,
                         ValidIssuer = Configuration["JWT:ValidIssuer"],

                         ValidateAudience = false,
                         ValidAudience = Configuration["JWT:ValidAudience"],

                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JWT:Secret"])),
                         ValidateIssuerSigningKey = true,
                         ClockSkew = TimeSpan.Zero
                     };
                 });

            services.AddTransient<IValidator<UserDto>, UserValidator>();

            // підключення сервісів
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddTransient<AuthenticationCommand>();
            services.AddTransient<GroupCommand>();
            services.AddTransient<SubjectCommand>();
            services.AddTransient<UserCommand>();

            services.AddTransient<GroupQuery>();
            services.AddTransient<SubjectQuery>();
            services.AddTransient<UserQuery>();

            services.AddTransient<AuthenticationService>();
            services.AddTransient<UserService>();
            services.AddTransient<SubjectService>();
            services.AddTransient<GroupService>();
            services.AddTransient<CsvService>();

            services.AddTransient<DBInitializer>();

            // configure DI for application services
            services.AddScoped<JwtUtils>();


            // підключення Swagger
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QualificationWork.Api", Version = "v1" });
            });


            //  підключення Hangfire 
            services.AddHangfireServer();
            services.AddHangfire(configuration => configuration
                    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                    .UseSimpleAssemblyNameTypeSerializer()
                    .UseRecommendedSerializerSettings()
                    .UseSqlServerStorage(Configuration.GetConnectionString("ConStr"), new SqlServerStorageOptions
                    {
                        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                        QueuePollInterval = TimeSpan.Zero,
                        UseRecommendedIsolationLevel = true,
                        DisableGlobalLocks = true
                    }));

        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            var options = new DashboardOptions
            {
                AppPath = "http://localhost:3000",
                Authorization = new[] {
                    new HangfireCustomBasicAuthenticationFilter
                    {
                        User="admin",
                        Pass="admin"
                    }
                    }
            };

            app.UseHangfireDashboard("/hangfire", options);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "QualificationWork.Api v1"));
            }

            app.UseMiddleware<ErrorMiddleware>();

            app.UseHttpsRedirection();

            app.UseCors(opt => opt.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
