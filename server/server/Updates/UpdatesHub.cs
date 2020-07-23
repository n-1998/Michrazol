using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Updates
{
    public class UpdatesHub : Hub
    {
        public static List<UserConnection> userList = new List<UserConnection>();
        public override Task OnConnected()
        {
            UserConnection userConnection = new UserConnection()
            {
                UserId =Int16.Parse( Context.QueryString["userId"]),
                ConnectionID = Context.ConnectionId
            };
            userList.Add(userConnection);
            return base.OnConnected();
        }
        
        public override Task OnDisconnected(bool stopCalled)
        {
            UserConnection userConnection = userList.FirstOrDefault(u => u.ConnectionID == Context.ConnectionId);
            userList.Remove(userConnection);
            return base.OnDisconnected(stopCalled);
        }
    }

}
