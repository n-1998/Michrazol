using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using System.Data.Entity;
using Models;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class EnterController : ApiController
    {
        [HttpGet]
        [Route("api/login/{email}/{password}")]
        public HttpResponseMessage UserLogin([FromUri] string email, [FromUri]string password)
        {
            try
            {
                //Enter.forggotPassword("7627652@gmail.com");
                Users user = Enter.login(password, email);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("api/register")]
        public HttpResponseMessage AddUser([FromBody] Users user)
        {
            int newUserId = Enter.register(user);
            if (newUserId != 0)
                return Request.CreateResponse(HttpStatusCode.Created, newUserId);
            return null;
        }

        [HttpPost]
        [Route("api/forggotPassword")]
        public HttpResponseMessage ForggotPassword([FromBody]Users user)
        {

            try
            {
                Enter.forggotPassword(user.Mail);
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/checkExistEmail")]
        public HttpResponseMessage CheckExistEmail([FromBody]Users user)
        {

            try
            {
                return Request.CreateResponse(Enter.checkExistEmail(user.Mail));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/checkEffectiveResetPassword/{resetId}")]
        public HttpResponseMessage resetPassword([FromUri]string resetId)
        {

            try
            {
                return Request.CreateResponse(Enter.isEffectiveResetPassword(int.Parse(resetId)));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/resetPassword")]
        public HttpResponseMessage resetPassword([FromBody]Users user)
        {

            try
            {
                return Request.CreateResponse(Enter.resetPassword(user));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/getUserById")]
        public HttpResponseMessage getUserById([FromBody]Users user)
        {

            try
            {
                return Request.CreateResponse(Enter.getUserById(user));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/updateUserDetails")]
        public HttpResponseMessage updateUserDetails([FromBody]Users user)
        {

            try
            {
                return Request.CreateResponse(Enter.updateUserDetails(user));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
