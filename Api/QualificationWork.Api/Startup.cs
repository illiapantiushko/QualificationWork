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
            // ������������ CORS
            services.AddCors(opts =>
            {
                opts.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                });
            });

            services.AddIdentity<User, IdentityRole>(opt => {

                opt.SignIn.RequireConfirmedEmail = true;
            })
               .AddEntityFrameworkStores<ApplicationContext>()
               .AddDefaultTokenProviders();

            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConStr")));

            // ������������ �����
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

            // ���������� ������
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddTransient<AuthenticationCommand>();
             services.AddTransient<AuthenticationService>();

            // configure DI for application services
            services.AddScoped<JwtUtils>();

            // ���������� Swagger
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QualificationWork.Api", Version = "v1" });
            });


            //  ���������� Hangfire 
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

            app.UseCors("AllowAll");

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
