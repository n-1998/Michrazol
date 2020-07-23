using System;
using System.Collections.Generic;
using Dal.Queries;
using FluentScheduler;
using Models;

namespace BL
{
    public static partial class Buy
    {
        public class DailyTask : IJob
        {
            public void Execute()
            {
                checkEndDateOfTender();
            }
        }


    }
}
