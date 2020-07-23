using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            //var startTimeSpan = TimeSpan.Zero;
            //var periodTimeSpan = TimeSpan.FromSeconds(15);

            //var timer = new System.Threading.Timer((e) =>
            //{
            //    Buy.checkEndDateOfTender();

            //}, null, startTimeSpan, periodTimeSpan);

            var task = Task.Run(async () =>
            {
                for (; ; )
                {
                    await Task.Delay(86400000);
                    Buy.checkEndDateOfTender();
                }
            });
            //var timer = new System.Threading.Timer((e) =>
            //{
            //    Buy.checkEndDateOfTender();

            //}, null, startTimeSpan, periodTimeSpan);
        }
    }
}
