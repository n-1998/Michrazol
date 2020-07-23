using Microsoft.AspNet.SignalR;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Updates;

namespace BL
{
    public class SendEmail
    {
        /// <summary>
        /// gets object of emailMessage and sends email
        /// </summary>
        /// <param name="email"></param>
        public static void Send(EmailMessage email)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("michrazolsale@gmail.com");
                mail.To.Add(email.To);
                mail.Subject = email.Subject;
                mail.Body = email.Message;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("michrazolsale@gmail.com", "nechamikremer");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public static void SendProductForSaleUpdates(ProductForSale productForSale)
        {
            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<UpdatesHub>();
            List<string> connections = new List<string>();
            UpdatesHub.userList.ForEach(u =>
            {
                connections.Add(u.ConnectionID);
            });
            hubContext.Clients.Clients(connections).OnReseiveProductForSaleMessage(productForSale);
        }

        public static void SendLowestPriceUpdates(SuggestedPrices LowestPrice)
        {
            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<UpdatesHub>();
            List<string> connections = new List<string>();
            UpdatesHub.userList.ForEach(u =>
            {
                connections.Add(u.ConnectionID);
            });
            hubContext.Clients.Clients(connections).OnReseiveLowestPriceeMessage(LowestPrice);
        }

        public static void SendChoosedProductUpdate(ProductForSale product)
        {
            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<UpdatesHub>();
            List<string> connections = new List<string>();
            UpdatesHub.userList.ForEach(u =>
            {
                connections.Add(u.ConnectionID);
            });
            hubContext.Clients.Clients(connections).OnReseiveChoosedProductUpdate(product);
        }

    }
}
